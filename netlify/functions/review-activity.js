const { connectLambda, getStore } = require("@netlify/blobs");

const STORE_NAME = "amli-review-activity";
const COUNTER_KEY = "private-site-reviews-2026-06-15-2342-kst";

const jsonHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store"
};

const botPattern =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|linkedinbot|twitterbot|whatsapp|telegrambot|discordbot|embedly|quora link preview|pinterest/i;

function createResponse(statusCode, body) {
  return {
    statusCode,
    headers: jsonHeaders,
    body: JSON.stringify(body)
  };
}

function normalizeCount(value) {
  const count = Number(value);
  return Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;
}

async function readCounter(store) {
  const entry = await store.getWithMetadata(COUNTER_KEY, { type: "json" });

  return {
    count: normalizeCount(entry?.data?.count),
    etag: entry?.etag
  };
}

async function incrementCounter(store) {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const current = await readCounter(store);
    const nextCount = current.count + 1;
    const result = await store.setJSON(
      COUNTER_KEY,
      {
        count: nextCount,
        updatedAt: new Date().toISOString()
      },
      current.etag ? { onlyIfMatch: current.etag } : { onlyIfNew: true }
    );

    if (result.modified) {
      return nextCount;
    }
  }

  return (await readCounter(store)).count;
}

exports.handler = async (event) => {
  try {
    if (event.blobs) {
      connectLambda(event);
    }

    const store = getStore(STORE_NAME);
    const method = event.httpMethod || "GET";
    const userAgent = event.headers["user-agent"] || event.headers["User-Agent"] || "";
    const isBot = botPattern.test(userAgent);

    if (method === "POST" && !isBot) {
      const count = await incrementCounter(store);
      return createResponse(200, { count, counted: true });
    }

    const { count } = await readCounter(store);
    return createResponse(200, { count, counted: false });
  } catch (error) {
    return createResponse(200, {
      count: 0,
      counted: false,
      unavailable: true
    });
  }
};

"use client";

import Image from "next/image";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import Logo from "./Logo";

const fundFacts = [
  ["Issuer", "AMLI Asia Capital Sdn Bhd, subsidiary of AMLI Mountains Berhad"],
  ["Instrument", "Class B Redeemable Preference Shares"],
  ["Programme status", "Indicative overview, subject to final documentation"],
  ["Eligibility", "Materials provided only after jurisdiction, suitability and KYC review"],
  ["Tenor framework", "Five-year programme framework"],
  ["Reference themes", "Property pipeline | Micro digital banking | Local finance"],
  ["Listing optionality", "Potential conversion pathway, subject to final terms and approvals"]
];

const verticals = [
  {
    name: "Property Pipeline",
    value: 50,
    colour: "var(--burgundy)",
    summary:
      "A Malaysian residential property pipeline forms the largest reference theme, with progress reviewed against feasibility, tender and delivery milestones."
  },
  {
    name: "Uzbek Micro Digital Bank",
    value: 40,
    colour: "var(--gold)",
    summary:
      "A micro digital banking vertical is included as a non-property reference theme within the broader framework."
  },
  {
    name: "Local Finance",
    value: 10,
    colour: "var(--navy)",
    summary:
      "A Malaysian finance allocation is intended to support liquidity discipline, local covenant monitoring and diversified cash generation."
  }
];

const projects = [
  {
    name: "The Tecoma",
    location: "Jenjarom, Selangor",
    image: "/images/property-tecoma.jpg",
    status: "Brief feasibility",
    focus: "Residential",
    review: "Feasibility",
    note: "Subject to final review"
  },
  {
    name: "Jalan Bidara",
    location: "Selayang, Selangor",
    image: "/images/property-bidara.jpg",
    status: "Planning",
    focus: "Residential",
    review: "Planning",
    note: "Subject to final review"
  },
  {
    name: "Tampin",
    location: "Negeri Sembilan",
    image: "/images/property-tampin.jpg",
    status: "Tendering",
    focus: "Residential",
    review: "Tendering",
    note: "Subject to final review"
  },
  {
    name: "Willow Residence",
    location: "Mentakab, Pahang",
    image: "/images/property-willow.jpg",
    status: "Planning",
    focus: "Residential",
    review: "Planning",
    note: "Subject to final review"
  },
  {
    name: "Taman Bukit Templer",
    location: "Selayang, Selangor",
    image: "/images/property-templer.jpg",
    status: "Brief feasibility",
    focus: "Residential",
    review: "Feasibility",
    note: "Subject to final review"
  }
];

const leaders = [
  {
    name: "Jamil Khir",
    role: "Chief Executive Officer",
    initials: "JK",
    image: "/images/leader-jamil-khir.jpg",
    bio:
      "Leads AMLI Asia Capital with oversight across investor communication, fund governance and execution discipline for the Fund 2 programme."
  },
  {
    name: "Jayasimman",
    role: "Group Chief Executive Officer",
    initials: "J",
    image: "/images/leader-jayasimman.jpg",
    bio:
      "Guides the broader AMLI Mountains Berhad platform, aligning subsidiary strategy with group-level capital formation and listing optionality."
  },
  {
    name: "Mahamad Zubir",
    role: "Director",
    initials: "MZ",
    image: "/images/leader-mahamad-zubir.jpg",
    bio:
      "Supports board-level stewardship, reference pool review and governance build-out as the investment platform scales."
  }
];

const faqs = [
  {
    question: "When are final economic terms available?",
    answer:
      "Final economic terms are provided only in the applicable transaction documents after eligibility, suitability and jurisdiction review."
  },
  {
    question: "Who can request further information?",
    answer:
      "Requests are reviewed case by case. AMLI Asia Capital may ask for jurisdiction, suitability and KYC information before sharing materials."
  },
  {
    question: "What does the IPO conversion right mean?",
    answer:
      "Fund 2 may include a conversion pathway linked to a future parent listing of AMLI Mountains Berhad. Any conversion remains subject to final terms, timing and approvals."
  },
  {
    question: "Is this available outside Malaysia?",
    answer:
      "No offer is made in jurisdictions outside Malaysia unless permitted under applicable law and distribution rules."
  }
];

const riskItems = [
  {
    title: "Reference pool risk",
    mitigant:
      "The programme is linked to a diversified reference framework rather than a single project, with review points across property, overseas finance and local finance."
  },
  {
    title: "Development and construction risk",
    mitigant:
      "Project feasibility, tender status, margins and delivery dependencies should be reviewed before any participation decision."
  },
  {
    title: "Liquidity and redemption risk",
    mitigant:
      "The five-year framework requires participants to consider liquidity needs carefully. Redemption is governed by final RPS terms and the issuer's available cash resources."
  },
  {
    title: "Regulatory and jurisdiction risk",
    mitigant:
      "Investor onboarding includes jurisdiction checks and Malaysian regulatory notices, with legal counsel identified in the transaction materials."
  }
];

const processSteps = [
  "Submit information request",
  "Complete eligibility and suitability review",
  "Receive applicable materials if eligible",
  "Proceed only through final transaction documents"
];

const expectationMetrics = [
  {
    value: 5,
    suffix: "yr",
    label: "Framework horizon",
    detail: "Five-year programme framework, subject to final transaction documents.",
    bar: 100
  },
  {
    value: 3,
    suffix: "",
    label: "Reference verticals",
    detail: "Property pipeline, micro digital banking and local finance.",
    bar: 60
  },
  {
    value: 50,
    suffix: "%",
    label: "Property reference",
    detail: "Largest indicative theme inside the 50 / 40 / 10 reference framework.",
    bar: 50
  },
  {
    value: 4,
    suffix: "steps",
    label: "Review pathway",
    detail: "Request, eligibility review, applicable materials and final documents.",
    bar: 80
  }
];

const appealPoints = [
  {
    label: "Diversified reference mix",
    value: "50 / 40 / 10",
    text:
      "A defined framework across property pipeline, micro digital banking and local finance reduces reliance on a single project narrative."
  },
  {
    label: "Structured RPS instrument",
    value: "Class B",
    text:
      "Redeemable Preference Shares create a document-led participation framework for eligible recipients to review."
  },
  {
    label: "Visible pipeline themes",
    value: "5",
    text:
      "Selected Malaysian residential themes provide tangible feasibility, planning and tender review points."
  },
  {
    label: "Listing optionality",
    value: "IPO",
    text:
      "A potential parent IPO conversion pathway may be available, subject to final terms, approvals and timing."
  }
];

const returnDrivers = [
  {
    label: "Income orientation",
    value: "01",
    text:
      "Class B RPS economics may provide an income-oriented framework, governed by final documents and available distributable cash."
  },
  {
    label: "Cash generation review",
    value: "02",
    text:
      "Property, micro digital banking and local finance references give recipients practical cash generation themes to evaluate."
  },
  {
    label: "Defined programme horizon",
    value: "03",
    text:
      "The five-year programme framework gives recipients a defined horizon for reviewing redemption mechanics under final RPS terms."
  },
  {
    label: "Potential equity-linked upside",
    value: "04",
    text:
      "Potential IPO conversion optionality may add equity-linked upside if final conditions, approvals and timing are satisfied."
  }
];

const returnLenses = [
  {
    value: "Income",
    label: "RPS economics",
    detail: "Document-led Class B terms and distributable cash review."
  },
  {
    value: "5 yr",
    label: "redemption framework",
    detail: "A defined programme horizon for reviewing exit mechanics."
  },
  {
    value: "IPO",
    label: "equity optionality",
    detail: "Potential conversion pathway if final conditions are satisfied."
  }
];

const confidenceSignals = [
  {
    value: "50 / 40 / 10",
    label: "Diversified reference mix",
    text:
      "The reference framework spans property pipeline, micro digital banking and local finance rather than relying on a single project story."
  },
  {
    value: "5",
    label: "Named property themes",
    text:
      "Selected Malaysian residential themes give recipients visible locations, stages and review milestones to evaluate."
  },
  {
    value: "Class B RPS",
    label: "Document-led participation",
    text:
      "Economics, rights and redemption mechanics are reviewed through final RPS documentation, not marketing shorthand."
  },
  {
    value: "Gates",
    label: "Eligibility controls",
    text:
      "Further materials are shared only after jurisdiction, suitability and KYC review, with advisers disclosed where relevant."
  }
];

const reviewActivitySignals = [
  {
    value: "Open",
    label: "Review window",
    text: "Information requests are open."
  },
  {
    value: "Queue",
    label: "Sequential review",
    text: "Requests are handled in order."
  },
  {
    value: "Qualified",
    label: "Materials access",
    text: "Detailed materials follow eligibility checks."
  }
];

const reviewActivityEndpoint = "/api/review-activity";

const heroReturnPoints = [
  ["01", "Income", "RPS economics reviewed through final terms"],
  ["02", "Redemption", "Five-year framework subject to available cash"],
  ["03", "Optionality", "Potential conversion on qualifying parent IPO"]
];

const contactEmail = "asiacapital@amli.group";
const informationRequestHref = "#im-request";
const informationEmailHref = `mailto:${contactEmail}?subject=AMLI%20Asia%20Capital%20information%20request`;

function encodeField(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function buildInformationEmailHref(form: HTMLFormElement) {
  const data = new FormData(form);
  const requestType = encodeField(data.get("requestType")) || "Information request";
  const body = [
    "AMLI Asia Capital information request",
    "",
    `Request type: ${requestType}`,
    `Name: ${encodeField(data.get("fullName"))}`,
    `Email: ${encodeField(data.get("email"))}`,
    `Organisation: ${encodeField(data.get("organisation")) || "Not provided"}`,
    `Jurisdiction: ${encodeField(data.get("jurisdiction"))}`,
    `Recipient profile: ${encodeField(data.get("recipientProfile"))}`,
    "",
    "Message:",
    encodeField(data.get("message")) || "Not provided",
    "",
    "Acknowledgement: Materials may be shared only after eligibility, suitability and jurisdiction review."
  ].join("\n");

  return `mailto:${contactEmail}?subject=${encodeURIComponent(
    `AMLI Asia Capital - ${requestType}`
  )}&body=${encodeURIComponent(body)}`;
}

function LineIcon({ type }: { type: "diversify" | "shield" | "upside" }) {
  if (type === "shield") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 6l15 6v10c0 10-5.8 16.8-15 20-9.2-3.2-15-10-15-20V12l15-6z" />
        <path d="M17 24l5 5 10-12" />
      </svg>
    );
  }
  if (type === "upside") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M9 36h30" />
        <path d="M13 32l10-10 7 7 9-15" />
        <path d="M32 14h7v7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="14" cy="16" r="6" />
      <circle cx="34" cy="16" r="6" />
      <circle cx="24" cy="34" r="6" />
      <path d="M20 18h8M17 22l4 7M31 22l-4 7" />
    </svg>
  );
}

function KTable({ rows }: { rows: string[][] }) {
  return (
    <table className="kv-table">
      <tbody>
        {rows.map(([key, value]) => (
          <tr key={key}>
            <th>{key}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Accordion({
  items,
  variant = "default"
}: {
  items: { question?: string; title?: string; answer?: string; mitigant?: string }[];
  variant?: "default" | "risk";
}) {
  const [open, setOpen] = useState(0);

  return (
    <div className={`accordion accordion--${variant}`}>
      {items.map((item, index) => {
        const label = item.question ?? item.title ?? "";
        const body = item.answer ?? item.mitigant ?? "";
        const isOpen = open === index;
        return (
          <div className="accordion__item" key={label}>
            <button
              className="accordion__button"
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : index)}
            >
              <span>{label}</span>
              <span className="accordion__mark">{isOpen ? "-" : "+"}</span>
            </button>
            <div className="accordion__panel" hidden={!isOpen}>
              <p>{body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DonutPanel() {
  const [active, setActive] = useState(0);
  const current = verticals[active];

  return (
    <div className="donut-panel">
      <div className="donut-panel__visual" aria-label="Indicative reference framework allocation chart">
        <div className="donut">
          <span>{current.value}%</span>
        </div>
      </div>
      <div className="donut-panel__content">
        <p className="eyebrow">Indicative Reference Framework</p>
        <h3>{current.name}</h3>
        <p>{current.summary}</p>
        <div className="segment-list" role="tablist" aria-label="Reference Pool verticals">
          {verticals.map((vertical, index) => (
            <button
              key={vertical.name}
              type="button"
              role="tab"
              aria-selected={active === index}
              className={active === index ? "is-active" : ""}
              onClick={() => setActive(index)}
            >
              <span style={{ background: vertical.colour }} />
              {vertical.name}
              <strong>{vertical.value}%</strong>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StructureDiagram() {
  const details = [
    {
      key: "investors",
      title: "Eligible participants",
      label: ["Eligible", "participants"],
      text: "Potential participants may be invited to review Class B Redeemable Preference Shares after jurisdiction, suitability and document review."
    },
    {
      key: "issuer",
      title: "AMLI Asia Capital",
      label: ["AMLI Asia", "Capital"],
      text: "The issuer administers Fund 2 and references the diversified pool while remaining a subsidiary of AMLI Mountains Berhad."
    },
    {
      key: "pool",
      title: "Reference Pool",
      label: ["Reference", "Pool"],
      text: "Allocations are guided by a diversified reference framework across property, micro digital banking and local finance."
    },
    {
      key: "ipo",
      title: "IPO Optionality",
      label: ["IPO", "Optionality"],
      text: "Any conversion pathway linked to a potential future parent IPO remains subject to final terms, timing and approvals."
    }
  ];
  const [active, setActive] = useState(details[0]);

  function handleKey(event: KeyboardEvent<SVGGElement>, item: (typeof details)[number]) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActive(item);
    }
  }

  return (
    <div className="structure">
      <svg viewBox="0 0 820 360" role="img" aria-label="Fund 2 transaction structure diagram">
        <defs>
          <marker id="arrow" markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
            <path d="M0,0 L8,4 L0,8 Z" />
          </marker>
        </defs>
        <path className="diagram-line" d="M180 92H330" markerEnd="url(#arrow)" />
        <path className="diagram-line" d="M490 92H640" markerEnd="url(#arrow)" />
        <path className="diagram-line" d="M410 138v68" markerEnd="url(#arrow)" />
        <path className="diagram-line" d="M490 255h150" markerEnd="url(#arrow)" />
        {[
          { item: details[0], x: 40, y: 44, w: 140, h: 96 },
          { item: details[1], x: 330, y: 44, w: 160, h: 96 },
          { item: details[2], x: 330, y: 208, w: 160, h: 108 },
          { item: details[3], x: 640, y: 210, w: 150, h: 104 }
        ].map(({ item, x, y, w, h }) => (
          <g
            key={item.key}
            className={`diagram-node ${active.key === item.key ? "is-active" : ""}`}
            role="button"
            tabIndex={0}
            onClick={() => setActive(item)}
            onKeyDown={(event) => handleKey(event, item)}
          >
            <rect x={x} y={y} width={w} height={h} rx="2" />
            <text x={x + w / 2} y={y + 34} textAnchor="middle">
              {item.label.map((line, lineIndex) => (
                <tspan key={line} x={x + w / 2} dy={lineIndex === 0 ? 0 : 17}>
                  {line}
                </tspan>
              ))}
            </text>
            <text className="diagram-caption" x={x + w / 2} y={y + 75} textAnchor="middle">
              {item.key === "investors"
                ? "Review process"
                : item.key === "issuer"
                  ? "Issuer"
                  : item.key === "pool"
                    ? "Framework"
                    : "Conversion right"}
            </text>
          </g>
        ))}
        <g className="diagram-node diagram-node--muted">
          <rect x="640" y="44" width="150" height="96" rx="2" />
          <text x="715" y="76" textAnchor="middle">
            <tspan x="715">AMLI</tspan>
            <tspan x="715" dy="17">Mountains</tspan>
          </text>
          <text className="diagram-caption" x="715" y="111" textAnchor="middle">
            Parent
          </text>
        </g>
      </svg>
      <div className="structure__detail">
        <p className="eyebrow">Selected Node</p>
        <h3>{active.title}</h3>
        <p>{active.text}</p>
      </div>
    </div>
  );
}

function CashChart() {
  const bars = [
    { height: 82, label: "Screen" },
    { height: 112, label: "Review" },
    { height: 144, label: "Docs" },
    { height: 166, label: "Report" },
    { height: 186, label: "Assess" }
  ];
  return (
    <div className="chart-card" aria-label="Illustrative review and reporting profile">
      <div className="chart-card__head">
        <p className="eyebrow">Review Profile</p>
        <h3>Illustrative eligibility, documentation and reporting pathway</h3>
      </div>
      <svg viewBox="0 0 620 280" role="img">
        <path d="M58 58H590" className="chart-line chart-line--target" />
        <text x="60" y="28" className="chart-label">
          Materials subject to review
        </text>
        <path d="M58 238H590" className="chart-line" />
        {bars.map((bar, index) => {
          const height = bar.height;
          const x = 95 + index * 96;
          const y = 238 - height;
          return (
            <g key={index}>
              <rect x={x} y={y} width="46" height={height} />
              <text x={x + 23} y={y - 10} textAnchor="middle" className="chart-label">
                {bar.label}
              </text>
              <text x={x + 23} y="264" textAnchor="middle" className="chart-label">
                Y{index + 1}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function CookieNotice() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    setAccepted(window.localStorage.getItem("amli-cookie-consent") === "accepted");
  }, []);

  if (accepted) return null;

  return (
    <div className="cookie" role="dialog" aria-label="Cookie notice">
      <p>
        This site uses essential cookies for form handling and analytics preferences. Materials
        are shared only after an eligibility review.
      </p>
      <button
        type="button"
        onClick={() => {
          window.localStorage.setItem("amli-cookie-consent", "accepted");
          setAccepted(true);
        }}
      >
        Accept
      </button>
    </div>
  );
}

function AnimatedMetric({
  value,
  suffix,
  label,
  detail,
  bar
}: {
  value: number;
  suffix: string;
  label: string;
  detail: string;
  bar: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    const duration = 900;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    }

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active, value]);

  return (
    <article className={`metric-card ${active ? "is-active" : ""}`} ref={ref}>
      <div className="metric-card__number">
        <span>{displayValue}</span>
        <small>{suffix}</small>
      </div>
      <h3>{label}</h3>
      <p>{detail}</p>
      <div className="metric-card__bar" aria-hidden="true">
        <span style={{ width: active ? `${bar}%` : "0%" }} />
      </div>
    </article>
  );
}

function ProgrammeSnapshot() {
  return (
    <section className="section section--snapshot" data-reveal>
      <div className="section__inner snapshot">
        <div className="snapshot__copy">
          <p className="eyebrow">Programme Snapshot</p>
          <h2>A clear framework for evaluating Fund 2.</h2>
          <p>
            Fund 2 gives eligible participants a structured way to review AMLI Asia
            Capital's diversified reference themes, programme horizon, documentation
            pathway and eligibility gates.
          </p>
          <p className="small-note">
            Indicative only. No return, redemption, liquidity event or listing is guaranteed.
          </p>
        </div>
        <div className="metric-card-grid" aria-label="Programme review metrics">
          {expectationMetrics.map((metric) => (
            <AnimatedMetric key={metric.label} {...metric} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InvestmentCase() {
  return (
    <section className="section section--appeal" data-reveal>
      <div className="section__inner appeal">
        <div className="appeal__intro">
          <p className="eyebrow">Investment Case</p>
          <h2>A concrete route into diversified regional growth themes.</h2>
          <p>
            Fund 2 combines an RPS framework, diversified reference themes, visible
            pipeline review points and potential parent-listing optionality. The result is
            a structured opportunity eligible recipients can diligence before reviewing
            final documents.
          </p>
          <div className="button-row">
            <a className="button button--primary" href={informationRequestHref}>
              Request information
            </a>
            <a className="text-link" href="#pipeline">
              View pipeline themes
            </a>
          </div>
        </div>
        <div className="appeal-grid" aria-label="Investment case highlights">
          {appealPoints.map((point) => (
            <article className="appeal-card" key={point.label}>
              <span>{point.value}</span>
              <h3>{point.label}</h3>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReturnDrivers() {
  return (
    <section className="section section--return" id="returns" data-reveal>
      <div className="section__inner return-drivers">
        <div className="section-heading section-heading--wide">
          <p className="eyebrow">Potential Return Drivers</p>
          <h2>Income, redemption and IPO optionality, clearly framed.</h2>
          <p>
            The appeal is straightforward: evaluate an income-oriented RPS structure, a
            defined five-year redemption framework and potential parent-listing optionality
            alongside tangible reference themes and final documents.
          </p>
        </div>
        <div className="return-lenses" aria-label="Return discussion summary">
          {returnLenses.map((item) => (
            <div className="return-lens" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              <p>{item.detail}</p>
            </div>
          ))}
        </div>
        <p className="return-note">
          No fixed return, redemption event or listing outcome is promised. Potential
          outcomes remain subject to eligibility, final documentation, available cash
          resources, approvals and market conditions.
        </p>
      </div>
    </section>
  );
}

function CentralAsiaMou() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !("IntersectionObserver" in window)) {
      return;
    }

    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
          return;
        }

        video.pause();
      },
      { threshold: 0.45 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section section--central-asia" id="central-asia" data-reveal>
      <video
        ref={videoRef}
        className="central-asia__background"
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/syrdarya-mou-poster.png"
      >
        <source
          src="/videos/syrdarya-mou-signing-ceremony.mp4"
          type="video/mp4"
        />
      </video>
      <div className="central-asia__gradient" aria-hidden="true" />

      <div className="section__inner central-asia">
        <div className="central-asia__content">
          <p className="eyebrow">Central Asia Reference Theme</p>
          <h2>Central Asia, now in view.</h2>
          <div className="central-asia__meta" aria-label="MOU details">
            <span>January 2026</span>
            <span>Syrdarya MOU</span>
            <span>Digital finance</span>
          </div>
          <p>
            A documented entry point for the Group's micro digital finance theme,
            anchored by the January 2026 MOU with the Syrdarya Regional
            Administration of Uzbekistan.
          </p>
          <p className="central-asia__note">
            Subject to licensing, final approvals, funding, local law and execution
            risk.
          </p>
        </div>
      </div>
    </section>
  );
}

function formatReviewCount(count: number) {
  return new Intl.NumberFormat("en-US").format(count);
}

function ReviewActivityBand() {
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    async function countPageVisit() {
      try {
        const response = await fetch(reviewActivityEndpoint, {
          method: navigator.webdriver ? "GET" : "POST",
          headers: {
            Accept: "application/json"
          }
        });
        const data = (await response.json()) as {
          count?: number;
        };

        if (!isCancelled && typeof data.count === "number") {
          setReviewCount(Math.max(0, Math.floor(data.count)));
        }
      } catch {
        if (!isCancelled) {
          setReviewCount(0);
        }
      }
    }

    void countPageVisit();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <section className="review-band" data-reveal>
      <div className="section__inner">
        <div className="review-activity" aria-label="Private review activity">
          <article className="review-activity__item review-activity__item--count">
            <span>{formatReviewCount(reviewCount)}</span>
            <div>
              <h3>Private visits</h3>
              <p>Live count from the current private campaign.</p>
            </div>
          </article>
          {reviewActivitySignals.map((signal) => (
            <article className="review-activity__item" key={signal.label}>
              <span>{signal.value}</span>
              <div>
                <h3>{signal.label}</h3>
                <p>{signal.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConfidenceSignals() {
  return (
    <section className="section section--confidence" id="opportunity" data-reveal>
      <div className="section__inner confidence">
        <div className="confidence__intro">
          <p className="eyebrow">Opportunity Snapshot</p>
          <h2>The case in one screen.</h2>
          <p>
            Fund 2 is built around a structured RPS framework, tangible reference themes,
            governance gates and a potential upside path that can be reviewed through final
            materials.
          </p>
          <a className="button button--primary" href={informationRequestHref}>
            Request information
          </a>
        </div>
        <div className="confidence-grid" aria-label="Investor confidence signals">
          {confidenceSignals.map((signal) => (
            <article className="confidence-card" key={signal.label}>
              <span>{signal.value}</span>
              <h3>{signal.label}</h3>
              <p>{signal.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function InformationRequestForm() {
  const [formMessage, setFormMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const href = buildInformationEmailHref(event.currentTarget);
    setFormMessage("Your email app will open with the enquiry details ready to send.");
    window.location.href = href;
  }

  return (
    <form className="contact-form" id="im-request" onSubmit={handleSubmit}>
      <p className="eyebrow">Request information</p>
      <h2>Eligibility pre-screen.</h2>
      <p>
        Send your details to AMLI Asia Capital for an initial eligibility and suitability
        review. Further materials are shared only where applicable.
      </p>

      <label>
        Full name
        <input name="fullName" type="text" autoComplete="name" required />
      </label>

      <label>
        Email address
        <input name="email" type="email" autoComplete="email" required />
      </label>

      <label>
        Organisation
        <input name="organisation" type="text" autoComplete="organization" />
      </label>

      <label>
        Jurisdiction
        <input name="jurisdiction" type="text" autoComplete="country-name" required />
      </label>

      <label>
        Recipient profile
        <select name="recipientProfile" required defaultValue="">
          <option value="" disabled>
            Select profile
          </option>
          <option>Individual investor</option>
          <option>Corporate or family office</option>
          <option>Professional adviser</option>
          <option>Transaction counterparty</option>
        </select>
      </label>

      <label>
        Request type
        <select name="requestType" required defaultValue="Eligibility pre-screen">
          <option>Eligibility pre-screen</option>
          <option>Request information</option>
          <option>Speak with the team</option>
        </select>
      </label>

      <label>
        Message
        <textarea
          name="message"
          rows={4}
          placeholder="Please include any relevant context for the review."
        />
      </label>

      <label className="checkbox">
        <input name="acknowledgement" type="checkbox" required />
        <span>
          I understand that any materials are provided only after eligibility, suitability
          and jurisdiction review.
        </span>
      </label>

      <button className="button button--primary" type="submit">
        Submit enquiry
      </button>
      <p className="small-note">
        Submitting opens an email addressed to {contactEmail} with your enquiry details.
      </p>
      {formMessage ? (
        <p className="form-message" role="status">
          {formMessage}
        </p>
      ) : null}
    </form>
  );
}

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="site-header">
        <nav className="nav" aria-label="Primary navigation">
          <a href="#home" className="nav__brand" aria-label="AMLI Asia Capital home">
            <Logo reversed />
          </a>
          <div className="nav__links">
            <a href="#opportunity">Opportunity</a>
            <a href="#returns">Returns</a>
            <a href="#pipeline">Pipeline</a>
            <a href="#leadership">Leadership</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="nav__cta" href={informationRequestHref}>
            Request information
          </a>
        </nav>
      </header>

      <main id="home">
        <section className="hero hero--capital">
          <video
            className="hero__video"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/capital-hero-poster.jpg"
            aria-hidden="true"
          >
            <source src="/videos/capital-hero.mp4" type="video/mp4" />
          </video>
          <div className="hero__overlay" />
          <div className="hero__content">
            <div className="hero__copy">
              <Logo reversed stacked />
              <p className="eyebrow eyebrow--hero">Fund 2 | 2026</p>
              <h1>
                <span>Structured yield.</span>
                {" "}
                <span>Diversified upside.</span>
              </h1>
              <span className="short-rule" />
              <p className="hero__subtitle">A five-year Class B RPS framework for eligible investors reviewing income, redemption mechanics and potential IPO-linked optionality.</p>
              <div className="metric-strip" aria-label="Fund headline metrics">
                <span>Income orientation</span>
                <span>Redemption framework</span>
                <span>IPO optionality</span>
              </div>
              <div className="button-row">
                <a className="button button--primary" href={informationRequestHref}>
                  Request information
                </a>
                <a className="button button--secondary button--on-dark" href="#contact">
                  Speak with our team
                </a>
              </div>
            </div>
            <aside className="hero__return-card" aria-label="Fund 2 return lens">
              <p className="eyebrow eyebrow--light">Return Lens</p>
              <h2>Three ways to evaluate the upside case.</h2>
              <div className="hero-return-list">
                {heroReturnPoints.map(([number, label, text]) => (
                  <div className="hero-return-list__item" key={label}>
                    <span>{number}</span>
                    <div>
                      <strong>{label}</strong>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="hero__card-note">Subject to final documents, eligibility, approvals and market conditions.</p>
            </aside>
          </div>
        </section>

        <ReviewActivityBand />

        <ConfidenceSignals />

        <ReturnDrivers />

        <CentralAsiaMou />

        <section className="section" id="pipeline" data-reveal>
          <div className="section__inner">
            <div className="section-heading section-heading--wide">
              <p className="eyebrow">Property Pipeline</p>
              <h2>Selected property pipeline themes are reviewed against delivery milestones.</h2>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.name}>
                  <div className="project-card__image">
                    <Image src={project.image} alt={`${project.name} architectural visualisation`} fill sizes="(max-width: 760px) 100vw, 33vw" />
                  </div>
                  <div className="project-card__body">
                    <span className="status-pill">{project.status}</span>
                    <h3>{project.name}</h3>
                    <p>{project.location}</p>
                    <dl>
                      <div>
                        <dt>Focus</dt>
                        <dd>{project.focus}</dd>
                      </div>
                      <div>
                        <dt>Stage</dt>
                        <dd>{project.review}</dd>
                      </div>
                      <div>
                        <dt>Review</dt>
                        <dd>{project.note}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--mist" id="leadership" data-reveal>
          <div className="section__inner">
            <div className="section-heading section-heading--wide">
              <p className="eyebrow">Leadership</p>
              <h2>Governance-led capital formation.</h2>
              <p>
                AMLI Asia Capital is led by senior executives focused on investor
                communication, fund governance and disciplined execution across the Fund 2
                programme.
              </p>
            </div>
            <div className="leader-row" aria-label="Leadership profiles">
              {leaders.map((leader) => (
                <article className="leader-card" key={leader.name}>
                  <div className="leader-card__portrait">
                    <Image
                      src={leader.image}
                      alt={`${leader.name} portrait`}
                      fill
                      sizes="(max-width: 760px) 100vw, 33vw"
                    />
                  </div>
                  <p className="eyebrow">{leader.role}</p>
                  <h3>{leader.name}</h3>
                  <p>{leader.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--process" data-reveal>
          <div className="section__inner">
            <div className="section-heading section-heading--wide">
              <p className="eyebrow">Information Request Process</p>
              <h2>A measured four-step review process.</h2>
            </div>
            <ol className="timeline">
              {processSteps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="final-cta" data-reveal>
          <div className="final-cta__inner">
            <div>
              <p className="eyebrow eyebrow--light">Fund 2 | 2026</p>
              <h2>Ready to discuss AMLI Asia Capital?</h2>
            </div>
            <div className="button-row">
              <a className="button button--primary" href={informationRequestHref}>
                Request information
              </a>
              <a className="button button--secondary button--on-dark" href="#contact">
                Speak with our team
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="contact" data-reveal>
          <div className="section__inner section__inner--contact">
            <div className="contact-details">
              <p className="eyebrow">Contact</p>
              <h2>Investor and general enquiries.</h2>
              <address>
                Wisma AMLI, 14, 14A, 14B, 14C, Jalan 20/38A, Off Jalan Segambut<br />
                Taman Sri Sinar, 51200 Kuala Lumpur, Malaysia
              </address>
              <p><strong>General:</strong> +60 3-6263 6464</p>
              <p>
                <strong>Email:</strong>{" "}
                <a className="text-link" href={informationEmailHref}>
                  {contactEmail}
                </a>
              </p>
              <p className="small-note">Professional advisers and transaction counterparties are disclosed in applicable materials where relevant.</p>
              <iframe
                title="AMLI Asia Capital office map"
                src="https://www.google.com/maps?q=14%20Jalan%2020%2F38A%20Taman%20Sri%20Sinar%2051200%20Kuala%20Lumpur%20Malaysia&output=embed"
                loading="lazy"
              />
            </div>

            <InformationRequestForm />
          </div>
        </section>

        <section className="section section--stone" id="disclosures" data-reveal>
          <div className="section__inner section__inner--split">
            <div className="callout">
              <p className="eyebrow">Important Notice</p>
              <h2>Review the risks before any decision.</h2>
              <p>
                This website is provided for information only. It is not an offer,
                solicitation or recommendation in any jurisdiction and is not a substitute
                for independent advice.
              </p>
              <p className="small-note">
                Economic terms, redemption mechanics and listing optionality are subject
                to final documentation, risk factors, approvals and change.
              </p>
            </div>
            <Accordion items={riskItems} variant="risk" />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <div>
            <Logo reversed />
            <p>Anchored &middot; Merit &middot; Legacy &middot; Intent</p>
          </div>
          <div className="footer__columns">
            <div>
              <h3>AMLI Companies</h3>
              <a href="https://amli.group">AMLI Group</a>
              <a href="https://mountains.amli.group">AMLI Mountains</a>
              <a href="https://property.amli.group">AMLI Property</a>
              <a href="https://kredit.amli.group">AMLI Kredit</a>
              <a href="https://capital.amli.group">AMLI Asia Capital</a>
              <a href="https://greens.amli.group">AMLI Greens</a>
            </div>
            <div>
              <h3>Funds</h3>
              <a href="#opportunity">Opportunity</a>
              <a href="#returns">Return drivers</a>
              <a href="#pipeline">Property pipeline</a>
            </div>
            <div>
              <h3>About</h3>
              <a href="#leadership">Leadership</a>
              <a href="#disclosures">Disclosures</a>
            </div>
            <div>
              <h3>Disclosures</h3>
              <a href="#disclosures">Risk factors</a>
              <a href="#contact">Contact details</a>
            </div>
            <div>
              <h3>Contact</h3>
              <a href={informationRequestHref}>Request information</a>
              <a href="#contact">Investor enquiries</a>
            </div>
          </div>
          <p className="footer__legal">
            Copyright 2026 AMLI Asia Capital Sdn Bhd (Company No. 202401033015).
            This website is provided for information only and is not an offer,
            solicitation or recommendation in any jurisdiction. Any economic terms,
            project information or listing optionality are subject to final documentation,
            risk factors, approvals and change. No return, redemption, liquidity event or
            listing is guaranteed. Independent legal, financial and tax advice should be
            obtained before any decision.
          </p>
        </div>
      </footer>
      <CookieNotice />
    </>
  );
}

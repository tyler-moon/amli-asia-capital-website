"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Logo from "./Logo";

const FORM_ENDPOINT = "https://formsubmit.co/ajax/capital.contact@amli.group";

const structure: [string, string][] = [
  ["Entity", "AMLI Asia Capital Sdn Bhd"],
  ["Registration", "202401033015"],
  ["Parent", "AMLI Mountains Berhad"],
  ["Registered office", "Wisma AMLI, Kuala Lumpur"]
];

const fundFacts: [string, string][] = [
  ["Issuer", "AMLI Asia Capital Sdn Bhd — a subsidiary of AMLI Mountains Berhad"],
  ["Instrument", "Class B Redeemable Preference Shares (RPS)"],
  ["Programme status", "Indicative overview, subject to final documentation"],
  ["Tenor framework", "Five-year programme framework"],
  ["Reference themes", "Property pipeline · Micro digital banking · Local finance"],
  ["Listing optionality", "Potential conversion pathway on a future parent listing, subject to final terms and approvals"],
  ["Eligibility", "Materials provided only after jurisdiction, suitability and KYC review"]
];

const metrics = [
  { value: "5", suffix: "yr", label: "Framework horizon", detail: "Five-year programme framework, subject to final transaction documents." },
  { value: "3", suffix: "", label: "Reference verticals", detail: "Property pipeline, micro digital banking and local finance." },
  { value: "50", suffix: "%", label: "Property reference", detail: "Largest indicative theme within the 50 / 40 / 10 framework." },
  { value: "4", suffix: "step", label: "Review pathway", detail: "Request · eligibility review · applicable materials · final documents." }
];

const drivers = [
  { value: "01", label: "Income orientation", text: "Class B RPS economics may provide an income-oriented framework, governed by final documents and available distributable cash." },
  { value: "02", label: "Cash generation review", text: "Property, micro digital banking and local finance references give recipients practical cash-generation themes to evaluate." },
  { value: "03", label: "Defined programme horizon", text: "The five-year framework gives a defined horizon for reviewing redemption mechanics under final RPS terms." },
  { value: "04", label: "Potential equity-linked upside", text: "Potential IPO-conversion optionality may add equity-linked upside if final conditions, approvals and timing are satisfied." }
];

const verticals = [
  { name: "Property Pipeline", value: 50, accent: "#831c36", tag: "", summary: "A Malaysian residential property pipeline forms the largest reference theme, reviewed against feasibility, tender and delivery milestones." },
  { name: "Micro Digital Banking", value: 40, accent: "#9a6b12", tag: "In progress", summary: "A micro digital banking vertical in Uzbekistan is included as a non-property reference theme, anchored by the Syrdarya engagement below." },
  { name: "Local Finance", value: 10, accent: "#1f2a38", tag: "", summary: "A Malaysian finance allocation supports liquidity discipline, local covenant monitoring and diversified cash generation." }
];

const projects = [
  { name: "The Tecoma", location: "Jenjarom, Selangor", image: "/images/property-tecoma.jpg", status: "Feasibility" },
  { name: "Jalan Bidara", location: "Selayang, Selangor", image: "/images/property-bidara.jpg", status: "Planning" },
  { name: "Tampin", location: "Negeri Sembilan", image: "/images/property-tampin.jpg", status: "Tendering" },
  { name: "Willow Residence", location: "Mentakab, Pahang", image: "/images/property-willow.jpg", status: "Planning" },
  { name: "Taman Bukit Templer", location: "Selayang, Selangor", image: "/images/property-templer.jpg", status: "Feasibility" }
];

const platform = [
  { name: "A real operating group", text: "AMLI Asia Capital is the capital-markets arm of AMLI Group — a diversified group operating across real estate, licensed finance and renewable energy, not a stand-alone vehicle." },
  { name: "A prior programme", text: "Fund 1 (2024) was a Class A, credit-exposure-based offering issued by the same platform — Fund 2 extends that track record into a diversified reference framework." },
  { name: "A structured pathway", text: "The parent has completed procedural prerequisites for public-market activity (Berhad conversion and an intermediate holding company), underpinning the potential conversion optionality." }
];

const fund1Photos = [
  "/images/fund1-ceremony-1.jpg",
  "/images/fund1-ceremony-2.jpg",
  "/images/fund1-ceremony-3.jpg"
];

const fund1Chips = ["RM 100M programme", "Five-year term", "Class A RPS", "Deployed into licensed lending"];

const leaders = [
  { name: "Dato’ Seri Jamil Khir bin Hj Baharom", role: "Chief Executive Officer", image: "/images/leader-jamil-khir.jpg", bio: "Chief Executive Officer of AMLI Asia Capital. A retired Major General, and former Minister in the Prime Minister’s Department and Member of Parliament for Jerai. MA, Islamic Economic Management." },
  { name: "Dato’ Jayasimman A/L Jayasingham", role: "Group Chief Executive Officer", image: "/images/leader-jayasimman.jpg", bio: "Founder of the AMLI group (2016) and Group Chief Executive Officer of AMLI Mountains (M) Berhad, with more than two decades in Malaysian property development." },
  { name: "Datuk Dr. Haji Mahamad Zubir bin Seeht Saad", role: "Director", image: "/images/leader-mahamad-zubir.jpg", bio: "Director. Executive Chairman of Zuffa Pharmacy and former Vice-Chancellor and CEO of PICOMS International University College. PhD in Business Administration." }
];

const steps = [
  { n: "01", label: "Request information", text: "Tell us who you are and your jurisdiction through the eligibility pre-screen." },
  { n: "02", label: "Eligibility & KYC", text: "We assess jurisdiction, suitability and complete KYC before anything is shared." },
  { n: "03", label: "Applicable materials", text: "Eligible recipients receive the materials relevant to their category." },
  { n: "04", label: "Final documentation", text: "Any participation is governed solely by the final transaction documents." }
];

const eligibilityOptions = [
  "Individual investor",
  "Corporate or family office",
  "Professional adviser",
  "Transaction counterparty"
];

const pillars = ["Income orientation", "Redemption framework", "IPO optionality"];

export default function Page() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const get = (n: string) =>
      ((f.elements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null)?.value || "").trim();
    if (get("_honey")) { setStatus("sent"); f.reset(); return; }
    const name = get("fullName");
    const payload = {
      requestType: get("requestType"),
      name,
      organisation: get("organisation"),
      jurisdiction: get("jurisdiction"),
      email: get("email"),
      message: get("message"),
      _subject: `Fund 2 information request — ${name || "AMLI Asia Capital"}`,
      _template: "table",
      _captcha: "false"
    };
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("sent");
      f.reset();
    } catch {
      setStatus("error");
    }
  }

  const mouVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((item) => observer.observe(item));

    const header = document.querySelector(".site-header");
    const onScroll = () => {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // hero video cross-fade loop (family standard)
    const _hv = document.querySelector(".hero__video") as HTMLVideoElement | null;
    if (_hv && _hv.tagName === "VIDEO") {
      const _hb = _hv.cloneNode(true) as HTMLVideoElement;
      _hb.classList.add("hero__video--b");
      _hb.muted = true; _hb.loop = false; _hb.style.opacity = "0";
      _hv.loop = false;
      _hv.parentElement?.insertBefore(_hb, _hv.nextSibling);
      let _front = _hv, _back = _hb, _swap = false;
      const _FADE = 0.9;
      void _hv.play().catch(() => undefined);
      const _cf = () => {
        const d = _front.duration;
        if (d && !_swap && _front.currentTime >= d - _FADE) {
          _swap = true; _back.currentTime = 0; void _back.play().catch(() => undefined);
          _back.style.opacity = "1"; _front.style.opacity = "0";
          const _t = _front; _front = _back; _back = _t;
          window.setTimeout(() => { _swap = false; }, _FADE * 1000);
        }
        requestAnimationFrame(_cf);
      };
      requestAnimationFrame(_cf);
    }

    // count-up for stat numbers
    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const countObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          countObs.unobserve(el);
          const target = parseFloat(el.dataset.count || "0");
          if (reduce || !Number.isFinite(target)) { el.textContent = String(target); return; }
          const dur = 1100;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = String(target);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => countObs.observe(c));

    const video = mouVideo.current;
    let vObserver: IntersectionObserver | undefined;
    if (video && "IntersectionObserver" in window) {
      video.muted = true;
      vObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) void video.play().catch(() => undefined);
          else video.pause();
        },
        { threshold: 0.4 }
      );
      vObserver.observe(video);
    }

    return () => {
      observer.disconnect();
      countObs.disconnect();
      vObserver?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <header className="site-header">
        <nav className="nav" aria-label="Primary navigation">
          <a href="#home" className="nav__brand" aria-label="AMLI Asia Capital home">
            <Logo reversed />
          </a>
          <div className="nav__links">
            <a href="#overview">Overview</a>
            <a href="#programme">Fund 2</a>
            <a href="#framework">Framework</a>
            <a href="#platform">Platform</a>
            <a href="#leadership">Leadership</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="nav__cta" href="#contact">
            Request information
          </a>
        </nav>
      </header>

      <main id="home">
        {/* HERO */}
        <section className="hero">
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
            <div className="hero__copy hero__copy--animate">
              <p className="eyebrow eyebrow--hero">AMLI Asia Capital · Fund 2 | 2026</p>
              <h1>
                Structured yield.
                <br /> Diversified upside.
              </h1>
              <p className="hero__subtitle">
                A five-year Class B RPS framework for eligible investors reviewing income,
                redemption mechanics and potential IPO-linked optionality — across a diversified
                pool of regional real-economy themes.
              </p>
              <div className="button-row">
                <a className="button button--primary" href="#contact">
                  Request information
                </a>
                <a className="button button--secondary button--on-dark" href="#programme">
                  Explore Fund 2
                </a>
              </div>
              <p className="hero__legal">
                Indicative only — not an offer or solicitation. Eligibility, suitability and KYC apply.
              </p>
              <ul className="hero__pillars" aria-label="Fund headline framework">
                {pillars.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="section section--mist" id="overview" data-reveal>
          <div className="section__inner section__inner--split">
            <div className="section-heading section-heading--flush">
              <p className="eyebrow">The capital-markets arm</p>
              <h2>A disciplined route into the AMLI real economy.</h2>
              <p>
                AMLI Asia Capital is the investment and capital-formation arm of AMLI Group. Fund 2
                gives eligible participants a structured way to review a diversified
                pool of reference themes — property development, micro digital banking and local
                finance — under one governed programme framework, with a defined horizon and a
                clear documentation pathway.
              </p>
              <dl className="structure-strip" aria-label="Corporate details">
                {structure.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="sc-badge">
                <span className="sc-badge__mark" aria-hidden="true" />
                Recognised by the Securities Commission Malaysia
              </p>
            </div>
            <figure className="media-frame" data-reveal>
              <img src="/images/fund2-cover.jpg" alt="AMLI Asia Capital — Fund 2" loading="lazy" />
            </figure>
          </div>
        </section>

        {/* FUND 2 PROGRAMME */}
        <section className="section" id="programme" data-reveal>
          <div className="section__inner">
            <div className="section-heading section-heading--wide">
              <p className="eyebrow">Programme Snapshot</p>
              <h2>Fund 2, framed on one screen.</h2>
              <p>
                A clear framework for evaluating the programme — instrument, horizon, reference
                themes and the review pathway — before any materials are shared.
              </p>
            </div>

            <dl className="fund-facts" aria-label="Fund 2 programme facts">
              {fundFacts.map(([term, def]) => (
                <div className="fund-facts__row" key={term} data-reveal>
                  <dt>{term}</dt>
                  <dd>{def}</dd>
                </div>
              ))}
            </dl>

            <div className="metric-grid" aria-label="Programme metrics">
              {metrics.map((m, i) => (
                <article className="metric-tile" key={m.label} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                  <p className="metric-tile__value">
                    <span className="count" data-count={m.value}>0</span>
                    <span>{m.suffix}</span>
                  </p>
                  <h3>{m.label}</h3>
                  <p className="metric-tile__detail">{m.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* INVESTMENT CASE */}
        <section className="section section--stone" id="case" data-reveal>
          <div className="section__inner">
            <div className="section-heading section-heading--wide">
              <p className="eyebrow">Investment Case</p>
              <h2>Four lenses on the potential return.</h2>
              <p>
                Income, redemption and IPO optionality — each framed against the final documents
                that will ultimately govern them.
              </p>
            </div>
            <ol className="principles" aria-label="Potential return drivers">
              {drivers.map((d, i) => (
                <li className="principle" key={d.label} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="principle__letter" aria-hidden="true">{d.value}</span>
                  <div className="principle__body">
                    <p className="principle__index" aria-hidden="true">{`0${i + 1}`}</p>
                    <h3>{d.label}</h3>
                    <p className="principle__text">{d.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* REFERENCE FRAMEWORK */}
        <section className="section" id="framework" data-reveal>
          <div className="section__inner">
            <div className="section-heading section-heading--wide">
              <p className="eyebrow">Reference Framework</p>
              <h2>A diversified 50 / 40 / 10 reference pool.</h2>
              <p>
                A defined framework across three reference themes reduces reliance on any single
                project narrative. Indicative weightings, subject to final documentation.
              </p>
            </div>
            <div className="alloc" aria-label="Indicative reference framework">
              {verticals.map((v, i) => (
                <article className="alloc__row" key={v.name} data-reveal style={{ ["--accent" as string]: v.accent, ["--w" as string]: `${v.value}%`, transitionDelay: `${i * 80}ms` }}>
                  <div className="alloc__head">
                    <h3>
                      {v.name}
                      {v.tag ? <span className="alloc__tag">{v.tag}</span> : null}
                    </h3>
                    <span className="alloc__value"><span className="count" data-count={v.value}>0</span>%</span>
                  </div>
                  <div className="alloc__bar" aria-hidden="true">
                    <span />
                  </div>
                  <p>{v.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PIPELINE */}
        <section className="section section--mist" id="pipeline" data-reveal>
          <div className="section__inner">
            <div className="section-heading section-heading--wide">
              <p className="eyebrow">Property Pipeline</p>
              <h2>The largest reference theme, project by project.</h2>
              <p>
                A Malaysian residential pipeline reviewed against feasibility, tender and delivery
                milestones. Project imagery is indicative; each project remains subject to final review.
              </p>
            </div>
            <div className="company-grid company-grid--pipeline" aria-label="Property pipeline projects">
              {projects.map((p, i) => (
                <article className="company-card company-card--static" key={p.name} data-reveal style={{ ["--accent" as string]: "#831c36", transitionDelay: `${i * 60}ms` }}>
                  <span className="company-card__media" aria-hidden="true">
                    <img src={p.image} alt="" loading="lazy" />
                  </span>
                  <span className="company-card__body">
                    <span className="eyebrow">{p.location}</span>
                    <h3>{p.name}</h3>
                    <span className="status-pill status-pill--quiet">{p.status}</span>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CENTRAL ASIA / SYRDARYA MOU */}
        <section className="section section--central-asia" id="central-asia" data-reveal>
          <video
            ref={mouVideo}
            className="central-asia__background"
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/syrdarya-mou-poster.png"
            aria-hidden="true"
          >
            <source src="/videos/syrdarya-mou-signing-ceremony.mp4" type="video/mp4" />
          </video>
          <div className="central-asia__gradient" aria-hidden="true" />
          <div className="section__inner central-asia__content">
            <p className="eyebrow eyebrow--light">Central Asia Reference Theme</p>
            <h2>Central Asia, now in view.</h2>
            <p>
              A documented entry point for the group’s micro digital-finance theme, anchored by the
              January 2026 Memorandum of Understanding with the Syrdarya Regional Administration of
              Uzbekistan.
            </p>
            <p className="central-asia__note">
              The micro digital-banking vertical is in progress and included as a non-property
              reference theme within the broader framework — subject to partner, licence and final
              documentation.
            </p>
          </div>
        </section>

        {/* PLATFORM / WHY AMLI */}
        <section className="section" id="platform" data-reveal>
          <div className="section__inner">
            <div className="section-heading section-heading--wide">
              <p className="eyebrow">The platform behind Fund 2</p>
              <h2>An operating group, not a vehicle.</h2>
              <p>
                Fund 2 sits on top of a real, diversified group with an operating history — the
                foundation for its governance, cash-generation themes and listing pathway.
              </p>
            </div>
            <div className="platform-grid" aria-label="Platform credibility">
              {platform.map((p, i) => (
                <article className="platform-card" key={p.name} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                  <h3>{p.name}</h3>
                  <p>{p.text}</p>
                </article>
              ))}
            </div>
            <p className="platform-note">
              Explore the wider group at{" "}
              <a className="text-link" href="https://amli.group">amli.group</a> — real estate
              (<a className="text-link" href="https://mountains.amli.group">Mountains</a>,{" "}
              <a className="text-link" href="https://property.amli.group">Property</a>), licensed
              finance (<a className="text-link" href="https://kredit.amli.group">Kredit</a>) and
              renewable energy (<a className="text-link" href="https://greens.amli.group">Greens</a>).
            </p>
          </div>
        </section>

        {/* FUND 1 TRACK RECORD */}
        <section className="section section--stone" id="track-record" data-reveal>
          <div className="section__inner">
            <div className="section-heading section-heading--wide">
              <p className="eyebrow">Track record</p>
              <h2>Fund 1 — raised and deployed.</h2>
              <p>
                Fund 1 (2024) was AMLI Asia Capital’s first programme: a five-year Class A
                Redeemable Preference Share issue of up to RM 100 million, subscribed through
                bank-channelled placements and deployed into AMLI Kredit’s licensed lending business
                under the Moneylenders Act 1951. It established the platform’s ability to raise
                capital and put it to work — the precedent Fund 2 builds on.
              </p>
            </div>
            <ul className="chips" aria-label="Fund 1 highlights">
              {fund1Chips.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <div className="gallery" aria-label="Fund 1 subscription ceremonies">
              {fund1Photos.map((p, i) => (
                <figure className="gallery__item" key={p} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                  <img src={p} alt="AMLI Asia Capital Fund 1 subscription ceremony, 2024" loading="lazy" />
                </figure>
              ))}
            </div>
            <p className="gallery__caption">A Night at KLGCC · Fund 1 subscription ceremony, 2024</p>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="section section--mist" id="leadership" data-reveal>
          <div className="section__inner">
            <div className="section-heading section-heading--wide">
              <p className="eyebrow">Leadership</p>
              <h2>Governance-led capital formation.</h2>
              <p>
                Fund 2 is overseen by senior executives focused on disciplined execution, fund
                governance and long-term stewardship across the AMLI platform.
              </p>
            </div>
            <div className="leader-grid" aria-label="Leadership profiles">
              {leaders.map((l) => (
                <article className="leader-tile" key={l.name} data-reveal>
                  <div className="leader-tile__portrait">
                    <img src={l.image} alt={`${l.name} portrait`} loading="lazy" />
                  </div>
                  <p className="eyebrow">{l.role}</p>
                  <h3>{l.name}</h3>
                  <p>{l.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section" id="process" data-reveal>
          <div className="section__inner">
            <div className="section-heading section-heading--wide">
              <p className="eyebrow">How the review works</p>
              <h2>A disciplined, gated process.</h2>
              <p>
                No materials are shared before eligibility is confirmed. Each step is deliberate —
                for your protection and ours.
              </p>
            </div>
            <ol className="steps" aria-label="Review process">
              {steps.map((s, i) => (
                <li className="step" key={s.n} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="step__n" aria-hidden="true">{s.n}</span>
                  <h3>{s.label}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="final-cta" data-reveal>
          <div className="final-cta__inner">
            <div>
              <p className="eyebrow eyebrow--light">AMLI Asia Capital</p>
              <h2>Review Fund 2 with our team.</h2>
            </div>
            <div className="button-row">
              <a className="button button--primary" href="#contact">
                Request information
              </a>
              <a className="button button--secondary button--on-dark" href="#platform">
                About the platform
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section" id="contact" data-reveal>
          <div className="section__inner section__inner--contact">
            <div className="contact-details">
              <p className="eyebrow">Contact</p>
              <h2>Request information.</h2>
              <p>
                Materials are shared only after an eligibility pre-screen — jurisdiction, suitability
                and KYC review. Tell us who you are and we will route your request appropriately.
              </p>
              <address>
                Wisma AMLI, 14, 14A, 14B, 14C, Jalan 20/38A, Off Jalan Segambut
                <br />
                Taman Sri Sinar, 51200 Kuala Lumpur, Malaysia
              </address>
              <p>
                <strong>Email:</strong>{" "}
                <a className="text-link" href="mailto:capital.contact@amli.group">
                  capital.contact@amli.group
                </a>
              </p>
              <iframe
                title="AMLI Asia Capital office map"
                src="https://www.google.com/maps?q=14%20Jalan%2020%2F38A%20Taman%20Sri%20Sinar%2051200%20Kuala%20Lumpur%20Malaysia&output=embed"
                loading="lazy"
              />
            </div>
            <div className="callout callout--gold" id="im-request">
              <p className="eyebrow">Eligibility pre-screen</p>
              <h2>Speak with the team.</h2>
              {status === "sent" ? (
                <div className="contact-form__success" role="status">
                  <p className="contact-form__success-title">Thank you — your request is on its way.</p>
                  <p>Our team will review eligibility and be in touch.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleRequest}>
                  <select className="contact-form__input contact-form__select" name="requestType" defaultValue="" required aria-label="Request type">
                    <option value="" disabled>I am a…</option>
                    {eligibilityOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  <div className="contact-form__row">
                    <input className="contact-form__input" type="text" name="fullName" placeholder="Full name" autoComplete="name" required />
                    <input className="contact-form__input" type="text" name="organisation" placeholder="Organisation" autoComplete="organization" />
                  </div>
                  <div className="contact-form__row">
                    <input className="contact-form__input" type="text" name="jurisdiction" placeholder="Jurisdiction" autoComplete="country-name" required />
                    <input className="contact-form__input" type="email" name="email" placeholder="Email" autoComplete="email" required />
                  </div>
                  <textarea className="contact-form__input contact-form__textarea" name="message" placeholder="What would you like to review?" rows={3} />
                  <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="contact-form__honey" />
                  <button className="button button--primary" type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending…" : "Request information"}
                  </button>
                  {status === "error" ? (
                    <p className="contact-form__note contact-form__note--error">
                      Something went wrong. Please email{" "}
                      <a className="text-link" href="mailto:capital.contact@amli.group">capital.contact@amli.group</a>.
                    </p>
                  ) : (
                    <p className="contact-form__note">Indicative only — this is not an offer, and no materials are shared before eligibility review.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      <footer className="footer">
        <div className="footer__inner">
          <div>
            <Logo reversed />
            <p>The capital-markets arm of AMLI Group</p>
          </div>
          <div className="footer__columns">
            <div>
              <h3>AMLI Companies</h3>
              <a href="https://mountains.amli.group">AMLI Mountains</a>
              <a href="https://property.amli.group">AMLI Property</a>
              <a href="https://kredit.amli.group">AMLI Kredit</a>
              <a href="https://greens.amli.group">AMLI Greens</a>
              <a href="https://amli.group">AMLI Group</a>
            </div>
            <div>
              <h3>Fund 2</h3>
              <a href="#overview">Overview</a>
              <a href="#programme">Programme</a>
              <a href="#platform">Platform</a>
              <a href="#leadership">Leadership</a>
            </div>
            <div>
              <h3>Contact</h3>
              <a href="mailto:capital.contact@amli.group">capital.contact@amli.group</a>
              <a href="tel:+60362636464">+60 3-6263 6464</a>
            </div>
          </div>
        </div>
        <p className="footer__disclaimer">
          This website is a general, indicative overview published for information only — not an
          offer, invitation, recommendation or solicitation to buy, subscribe for or deal in any
          security, and not a prospectus. Class B RPS terms, weightings, horizon and any listing or
          conversion pathway are indicative and subject to final documentation, conditions, timing
          and approvals. Materials are provided only to eligible recipients following jurisdiction,
          suitability and KYC review, and only where lawful. Any participation is governed solely by
          the final transaction documents.
        </p>
        <div className="footer__legal">
          <p>
            &copy; 2026 AMLI Asia Capital Sdn Bhd (Reg. No. 202401033015), a subsidiary of AMLI
            Mountains Berhad. Information only — not an offer, solicitation or prospectus.
          </p>
          <p>Kuala Lumpur, Malaysia</p>
        </div>
      </footer>
    </>
  );
}

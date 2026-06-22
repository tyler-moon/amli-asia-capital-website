import Logo from "../Logo";

export const dynamic = "force-static";

export default function SuccessPage() {
  return (
    <main className="success-page">
      <section className="success-hero">
        <div className="success-hero__inner">
          <a href="/" className="success-logo" aria-label="AMLI Asia Capital home">
            <Logo reversed />
          </a>
          <p className="eyebrow">Request received</p>
          <h1>Thank you. Your information request has been received.</h1>
          <p>
            AMLI Asia Capital will review the submitted details for eligibility,
            suitability and follow-up before sharing any applicable materials.
          </p>
          <div className="button-row">
            <a className="button button--primary" href="/">
              Back to overview
            </a>
            <a className="button button--secondary button--on-dark" href="mailto:asiacapital@amli.group">
              Email the team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://capital.amli.group"),
  applicationName: "AMLI Asia Capital",
  title: "AMLI Asia Capital — Fund 2 | Structured yield, diversified upside",
  description:
    "AMLI Asia Capital is the capital-markets arm of AMLI Group. Fund 2 is an indicative five-year Class B RPS framework for eligible investors — property pipeline, micro digital banking and local finance. Indicative only; not an offer.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "AMLI Asia Capital — Fund 2",
    description:
      "An indicative five-year Class B RPS framework across a diversified pool of regional real-economy themes. Materials shared only after eligibility review. Indicative only; not an offer.",
    images: [
      {
        url: "/images/fund2-cover.jpg",
        width: 1600,
        height: 900,
        alt: "AMLI Asia Capital — Fund 2"
      }
    ],
    type: "website"
  },
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml"
      }
    ],
    apple: "/apple-icon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-MY">
      <body>{children}</body>
    </html>
  );
}

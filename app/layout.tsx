import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://capital.amli.group"),
  applicationName: "AMLI Asia Capital",
  title: "AMLI Asia Capital | Fund 2",
  description:
    "AMLI Asia Capital Fund 2 presents a concise review path for eligible investors to assess RPS participation, return drivers, reference themes and information requests.",
  openGraph: {
    title: "AMLI Asia Capital | Fund 2",
    description:
      "A concise Fund 2 review path for eligible investors to assess RPS participation, return drivers, reference themes and information requests.",
    images: [
      {
        url: "/images/kl-skyline-hero.jpg",
        width: 1600,
        height: 900,
        alt: "Golden-hour Kuala Lumpur skyline"
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

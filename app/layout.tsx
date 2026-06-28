import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://capital.amli.group"),
  applicationName: "AMLI Asia Capital",
  title: "AMLI Asia Capital",
  description:
    "AMLI Asia Capital is the investment and capital-markets arm of the AMLI group. Our new website is being prepared.",
  openGraph: {
    title: "AMLI Asia Capital",
    description:
      "The investment and capital-markets arm of the AMLI group. Our new website is being prepared.",
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

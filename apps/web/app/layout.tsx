import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import "./globals.css";

const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-googleSansFlex",
});


export const metadata: Metadata = {
  title: "Nirmech Industries — Under Construction",
  description:
    "Nirmech Industries, based in Jamnagar, Gujarat, India. Our new website is under construction. Contact us at +91 95106 26066.",
  keywords: ["Nirmech Industries", "Jamnagar", "GIDC", "Gujarat", "manufacturing"],
  openGraph: {
    title: "Nirmech Industries",
    description: "Our new website is under construction. Contact us for more information.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.jpeg" />
      </head>
      <body className={`${googleSansFlex.variable} `}>
        {children}
      </body>
    </html>
  );
}

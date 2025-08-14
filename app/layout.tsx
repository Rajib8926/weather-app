import type { Metadata } from "next";

import "./globals.css";

import { Roboto } from "next/font/google";
import ThemeRegistry from "./theme-provider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // choose the weights you need
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Weather app",
  icons: {
    icon: "/logo.png",
  },
  description: "Show current weather and forecast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.className}`}>
      <body
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}

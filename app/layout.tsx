import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "hajde.bg - Безплатни обяви в България",
  description: "Безплатни обяви за работа, имоти, коли, електроника и услуги в България.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <body>
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Fraunces, Literata, Oswald, Noto_Serif_Tamil } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const tamil = Noto_Serif_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hameediyah · Nasi Kandar since 1907 · Lebuh Campbell, Penang",
    template: "%s · Hameediyah, since 1907",
  },
  description:
    "Malaysia's oldest nasi kandar restaurant. From a bamboo shoulder pole under a tree on Lebuh Campbell to the shophouse at 164A, one family has served George Town since 1907.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F5ECD9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${literata.variable} ${oswald.variable} ${tamil.variable} antialiased`}
    >
      <head>
        {/* Hide reveal blocks only while JS is alive; if the app has not hydrated within 3s, show everything. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!window.__hydrated)d.classList.remove('js')},3000)",
          }}
        />
      </head>
      <body className="paper min-h-full">{children}</body>
    </html>
  );
}

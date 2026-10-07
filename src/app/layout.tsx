import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Literata, Roboto_Condensed } from "next/font/google";
import "./globals.css";

// Condensed, straight-sided caps that echo the HAMEEDIYAH wordmark on the logo and signboard.
const shoulders = Big_Shoulders({
  variable: "--font-shoulders",
  subsets: ["latin"],
  display: "swap",
  // next/font has no metrics for this face; Arial Narrow is the closest system width.
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "sans-serif"],
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// The logo's own supporting type ("EST 1907", "Oldest Nasi Kandar in Malaysia") is a condensed grotesque.
const condensed = Roboto_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false, // small signage labels only; not worth competing with the headline font
});


export const metadata: Metadata = {
  title: {
    default: "Hameediyah · Nasi Kandar since 1907 · Lebuh Campbell, Penang",
    template: "%s · Hameediyah, since 1907",
  },
  description:
    "Malaysia's oldest Nasi Kandar restaurant. Since 1907, one family from Kerala has served Penang, first on foot with a kandar pole, then from the shophouse at 164-A Campbell Street.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#FFDE16",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${shoulders.variable} ${literata.variable} ${condensed.variable} antialiased`}
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

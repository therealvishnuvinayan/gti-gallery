import "./globals.css";
import type { Metadata } from "next";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

export const metadata: Metadata = {
  title: "GTI Gallery",
  description: "A premium digital showcase for GTI cigarette brands and packaging, designed for elegant product presentation and seamless visual exploration.",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const s=localStorage.getItem('theme');const d=matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',s|| (d?'dark':'light'));}catch{}`
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
      const saved = localStorage.getItem("theme") || "light";
      document.documentElement.setAttribute("data-theme", saved);
    `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

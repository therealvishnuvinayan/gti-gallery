import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GTI Gallery",
  description: "Google-like elegant product explorer",
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
      </head>
      <body>{children}</body>
    </html>
  );
}

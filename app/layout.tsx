import type { Metadata } from "next";
import { Martian_Mono, Schibsted_Grotesk } from "next/font/google";
import ClickSpark from "@/_components/click-spark";
import GooeyNav from "@/_components/gooey-nav/gooey-nav";
import "./globals.css";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js 16 App",
  description: "Welcome to the Next.js 16 App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen font-sans antialiased`}
      >
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
          className="flex min-h-screen flex-col"
        >
          <GooeyNav
            items={[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/auth" },
            ]}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </ClickSpark>
      </body>
    </html>
  );
}

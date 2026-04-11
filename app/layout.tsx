import ClickSpark from "@/components/click-spark";
import type { Metadata } from "next";
import { Martian_Mono, Schibsted_Grotesk } from "next/font/google";
import LightRays from "./components/LighRays";
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
  title: "Dev Events",
  description: "Next Gen Developers Event Hub",
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
        <div className="absolute top-0 left-0 w-full h-full min-h-screen">
          <LightRays
            raysOrigin="top-center"
            raysColor="#5dfec8"
            raysSpeed={0.5}
            lightSpread={2}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.01}
            noiseAmount={0}
            distortion={0.01}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>
        <main>
          <ClickSpark
            sparkColor="#fff"
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
            className="flex min-h-screen flex-col"
          >
            {children}
          </ClickSpark>
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import "./overrides.css";
export const metadata: Metadata = { title: "Faultline — physics reasoning", description: "Inspect and repair causal physics reasoning." };
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-plex-sans", display: "swap", weight: ["400", "500", "600"] });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-plex-mono", display: "swap", weight: ["400", "500"] });
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body className={`${plexSans.variable} ${plexMono.variable}`}>{children}</body></html>; }

import type { Metadata } from "next";
import "./globals.css";
import "./overrides.css";
export const metadata: Metadata = { title: "Faultline — physics reasoning", description: "Inspect and repair causal physics reasoning." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }

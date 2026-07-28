import "./globals.css";
import localFont from "next/font/local";

const faultlineFont = localFont({
  src: "../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2",
  variable: "--font-faultline",
  display: "swap",
});

export const metadata = {
  title: "FAULTLINE — Break the model",
  description: "A hands-on instrument for inspecting and repairing causal physics reasoning.",
};
export default function RootLayout({ children }) { return <html lang="en" className={faultlineFont.variable}><body>{children}</body></html>; }

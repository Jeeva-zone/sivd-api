import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "SIVD — AI Workspace", description: "A clean multi-tool AI workspace powered by the SIVD API gateway.", themeColor: "#0b0d12" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
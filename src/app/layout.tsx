import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Football Tracker",
}

type TRootLayout = {
  children: React.ReactNode
}

const RootLayout = ({ children }: TRootLayout) => {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen antialiased`}>
        <Navbar />
        <main className="max-w-5xl mx-auto p-4 pt-24">
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout

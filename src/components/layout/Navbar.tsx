"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Calendar } from "lucide-react"
import { cn, getDateFromPath, getTodayISO } from "@/lib/utils"

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const today = getTodayISO()
  const pathDate = getDateFromPath(pathname)
  const activeDate = pathDate ?? today

  const navItems = [
    { name: "Matches", href: "/" },
    { name: "Live", href: "/live" },
  ] as const

  const isCalendarActive = pathname.startsWith("/fixtures/")

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300",
                isActive
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <span className="text-sm tracking-wide">{item.name}</span>
            </Link>
          )
        })}

        <div className="w-px h-4 bg-white/10 mx-2" />

        <div className="overflow-hidden rounded-full">
          <label
            className={cn(
              "relative flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 cursor-pointer select-none",
              "active:scale-[0.98]",
              isCalendarActive
                ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            <Calendar size={18} />
            <span className="text-sm tracking-wide">
              {activeDate === today ? "Today" : activeDate}
            </span>

            <input
              type="date"
              value={activeDate}
              onChange={(e) => router.push(`/fixtures/${e.target.value}`)}
              onClick={(e) => {
                try {
                  e.currentTarget.showPicker()
                } catch {
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              aria-label="Pick date"
            />
          </label>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

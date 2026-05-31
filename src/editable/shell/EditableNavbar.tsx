// Editable redesign refreshed.
'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, UserPlus, LogIn, X, MapPin, Megaphone } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import siteLogo from '@/editable/assets/site-logo.png'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header className="sticky top-0 z-50 border-b border-[rgb(98,43,20,0.15)] bg-[color:rgb(255,248,231,0.93)] text-black backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[92px] w-full max-w-[1450px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="flex h-16 w-16 items-center justify-center rounded-[1.2rem] border border-[rgb(98,43,20,0.2)] bg-white shadow-[0_8px_25px_rgba(98,43,20,0.15)] transition group-hover:-rotate-2">
            <img src={siteLogo.src} alt={SITE_CONFIG.name} className="h-14 w-14 scale-110 object-contain" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block max-w-[210px] truncate text-sm font-black tracking-[-0.02em]">{SITE_CONFIG.name}</span>
          </span>
        </Link>

        <form action="/search" className="mx-auto hidden min-w-0 flex-1 justify-center md:flex">
          <label className="relative flex w-full max-w-[520px] items-center rounded-full border border-[rgb(98,43,20,0.2)] bg-white px-4 py-3 shadow-sm">
            <Search className="h-4 w-4 text-black" />
            <input name="q" type="search" placeholder="Search jobs, rentals, services, products" className="min-w-0 flex-1 bg-transparent px-3 text-sm font-black text-black outline-none placeholder:text-black/70" />
          </label>
        </form>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/classified" className="inline-flex items-center gap-2 rounded-full bg-[rgb(13, 83, 14)] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-black">
            <Megaphone className="h-3.5 w-3.5" /> Post ad
          </Link>
          {navItems.slice(0, 4).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link key={item.href} href={item.href} className={`rounded-full px-4 py-2 text-sm font-black text-black transition ${active ? 'bg-[rgb(231, 225, 177)] text-black' : 'hover:bg-[rgb(228,214,169,0.45)]'}`}>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link href="/login" className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-black text-black hover:bg-[rgb(228,214,169,0.4)] sm:inline-flex"><LogIn className="h-4 w-4" /> Login</Link>
          <Link href="/signup" className="hidden items-center gap-2 rounded-full bg-[rgb(13, 83, 14)] px-4 py-2.5 text-sm font-black text-black shadow-sm sm:inline-flex"><UserPlus className="h-4 w-4" /> Register</Link>
          <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-full border border-[rgb(98,43,20,0.2)] bg-white p-2 lg:hidden" aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[rgb(98,43,20,0.15)] bg-[rgb(255,248,231)] px-4 py-4 lg:hidden">
          <form action="/search" className="mb-4 flex rounded-2xl border border-[rgb(98,43,20,0.2)] bg-white px-3 py-2">
            <Search className="mt-1 h-4 w-4 text-black" />
            <input name="q" type="search" placeholder="Search listings" className="min-w-0 flex-1 bg-transparent px-3 text-sm font-black text-black outline-none placeholder:text-black/70" />
          </form>
          <div className="mb-4 flex items-center gap-2 rounded-2xl bg-[rgb(231, 225, 177)] px-4 py-3 text-xs font-black uppercase tracking-[0.15em] text-black"><MapPin className="h-4 w-4" /> All regions</div>
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Contact', href: '/contact' }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl border border-[rgb(98,43,20,0.2)] bg-white px-4 py-3 text-sm font-black text-black">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}

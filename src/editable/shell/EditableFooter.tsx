// Editable redesign refreshed.
import Link from 'next/link'
import { MapPin, PhoneCall } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import siteLogo from '@/editable/assets/site-logo.png'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)

  return (
    <footer className="border-t border-[rgb(98,43,20,0.15)] bg-[linear-gradient(180deg,#f1e6c4_0%,#e7d9ae_100%)] text-[rgb(231, 225, 177)]">
      <div className="mx-auto grid max-w-[1450px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgb(98,43,20,0.2)] bg-white">
              <img src={siteLogo.src} alt={SITE_CONFIG.name} className="h-12 w-12 scale-110 object-contain" />
            </span>
            <span className="text-lg font-black tracking-[-0.03em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-[rgb(13, 83, 14)]">A local-first classified platform for jobs, real estate, services, second-hand items, and everyday opportunities.</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[rgb(13, 83, 14)]"><MapPin className="h-3.5 w-3.5" /> Community driven</div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-[rgb(13, 83, 14)]">Browse</h3>
          <div className="mt-4 grid gap-2">
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="text-sm font-bold text-[rgb(231, 225, 177)]/80 hover:text-[rgb(231, 225, 177)]">
                {task.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.22em] text-[rgb(13, 83, 14)]">Support</h3>
          <div className="mt-4 grid gap-2">
            <Link href="/about" className="text-sm font-bold text-[rgb(231, 225, 177)]/80 hover:text-[rgb(231, 225, 177)]">About</Link>
            <Link href="/contact" className="text-sm font-bold text-[rgb(231, 225, 177)]/80 hover:text-[rgb(231, 225, 177)]">Contact</Link>
            <Link href="/comments" className="text-sm font-bold text-[rgb(231, 225, 177)]/80 hover:text-[rgb(231, 225, 177)]">Comments</Link>
          </div>
          <p className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[rgb(13, 83, 14)]"><PhoneCall className="h-4 w-4" /> Fast replies for listing help</p>
        </div>
      </div>
      <div className="border-t border-[rgb(98,43,20,0.15)] px-4 py-4 text-center text-xs font-bold text-[rgb(13, 83, 14)]">
        Copyright {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}

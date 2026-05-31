// Editable redesign refreshed.
import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: 'Local login page for this public site.' })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1450px] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[rgb(13, 83, 14)]">Member access</p>
            <h1 className="mt-5 max-w-xl text-5xl font-black leading-[0.98] tracking-[-0.07em] sm:text-6xl">Welcome back.</h1>
            <p className="mt-6 max-w-lg text-sm leading-8 text-[rgb(13, 83, 14)]">Login uses local browser storage for demo flows while keeping routes and page structure production-safe.</p>
          </div>
          <div className="rounded-[2rem] border border-[rgb(98,43,20,0.18)] bg-white/85 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-black tracking-[-0.04em]">Login</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 text-sm text-[rgb(13, 83, 14)]">New here? <Link href="/signup" className="font-black underline-offset-4 hover:underline">Create an account</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
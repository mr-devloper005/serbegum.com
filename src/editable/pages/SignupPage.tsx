// Editable redesign refreshed.
import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: 'Local signup page for this public site.' })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[rgb(13, 83, 14)] text-[rgb(255,248,231)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[1450px] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="rounded-[2rem] border border-[rgb(228,214,169,0.28)] bg-white/[0.08] p-6 shadow-lg sm:p-8">
            <h1 className="text-3xl font-black tracking-[-0.05em]">Create account</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-[rgb(231, 225, 177)]">Already have an account? <Link href="/login" className="font-black text-white underline-offset-4 hover:underline">Login</Link></p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[rgb(231, 225, 177)]">Start posting</p>
            <h2 className="mt-5 max-w-xl text-5xl font-black leading-[0.98] tracking-[-0.07em] sm:text-6xl">Create your local publishing profile.</h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-[rgb(231, 225, 177)]">Once signed in, you can manage your presence across classified, listing, and profile-ready experiences.</p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
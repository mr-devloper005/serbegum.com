import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, UserPlus } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="editable-auth-page">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-7xl items-stretch gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
          <div className="editable-auth-card order-2 flex flex-col justify-center rounded-[2rem] p-6 sm:p-10 lg:order-1">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[rgb(13,83,14)]">Join the community</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[rgb(13,83,14)]">{pagesContent.auth.signup.formTitle}</h1>
            <p className="mt-3 text-sm leading-6 text-[rgb(13,83,14)]/75">Create your local account in just a few steps.</p>
            <EditableLocalSignupForm />
            <Link href="/login" className="editable-auth-switch mt-6">
              <span>Already have an account? <strong>{pagesContent.auth.signup.loginCta}</strong></span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="editable-auth-feature relative order-1 flex min-h-[360px] overflow-hidden rounded-[2rem] bg-[rgb(13,83,14)] p-8 sm:p-12 lg:order-2">
            <div className="editable-auth-orb editable-auth-orb-one" />
            <div className="editable-auth-orb editable-auth-orb-two" />
            <div className="relative z-10 flex max-w-xl flex-col justify-between">
              <div>
                <span className="editable-auth-badge"><UserPlus className="h-4 w-4" /> {pagesContent.auth.signup.badge}</span>
                <h2 className="editable-auth-heading mt-7">{pagesContent.auth.signup.title}</h2>
                <p className="editable-auth-copy mt-6">{pagesContent.auth.signup.description}</p>
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <p className="editable-auth-point"><CheckCircle2 className="h-5 w-5" /> Publish local offers</p>
                <p className="editable-auth-point"><CheckCircle2 className="h-5 w-5" /> Connect with buyers</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

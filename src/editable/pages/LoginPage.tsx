import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, LogIn } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="editable-auth-page">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-7xl items-stretch gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <div className="editable-auth-feature relative flex min-h-[360px] overflow-hidden rounded-[2rem] bg-[rgb(13,83,14)] p-8 sm:p-12">
            <div className="editable-auth-orb editable-auth-orb-one" />
            <div className="editable-auth-orb editable-auth-orb-two" />
            <div className="relative z-10 flex max-w-xl flex-col justify-between">
              <div>
                <span className="editable-auth-badge"><LogIn className="h-4 w-4" /> {pagesContent.auth.login.badge}</span>
                <h1 className="editable-auth-heading mt-7">{pagesContent.auth.login.title}</h1>
                <p className="editable-auth-copy mt-6">{pagesContent.auth.login.description}</p>
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                <p className="editable-auth-point"><CheckCircle2 className="h-5 w-5" /> Browse local listings</p>
                <p className="editable-auth-point"><CheckCircle2 className="h-5 w-5" /> Manage your posts</p>
              </div>
            </div>
          </div>

          <div className="editable-auth-card flex flex-col justify-center rounded-[2rem] p-6 sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[rgb(13,83,14)]">Welcome back</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[rgb(13,83,14)]">{pagesContent.auth.login.formTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-[rgb(13,83,14)]/75">Enter your account details to continue.</p>
            <EditableLocalLoginForm />
            <Link href="/signup" className="editable-auth-switch mt-6">
              <span>New here? <strong>{pagesContent.auth.login.createCta}</strong></span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

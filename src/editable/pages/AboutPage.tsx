// Editable redesign refreshed.
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] px-4 py-14 text-[var(--slot4-page-text)] sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-[1450px] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2.2rem] border border-[rgb(98,43,20,0.18)] bg-white/85 p-8 shadow-sm lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[rgb(13, 83, 14)]">{pagesContent.about.badge}</p>
            <h1 className="mt-5 text-5xl font-black tracking-[-0.07em]">About {SITE_CONFIG.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[rgb(13, 83, 14)]">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-4 text-sm leading-8 text-[rgb(13, 83, 14)]">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="space-y-4">
            {pagesContent.about.values.map((value) => (
              <div key={value.title} className="rounded-[2rem] border border-[rgb(98,43,20,0.18)] bg-white/80 p-6 shadow-sm">
                <h2 className="text-xl font-black tracking-[-0.04em]">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[rgb(13, 83, 14)]">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
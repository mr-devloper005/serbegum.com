// Editable redesign refreshed.
import Link from 'next/link'
import { ArrowRight, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title = 'No posts available yet',
  description = 'This section is ready. New content will appear automatically when posts are published.',
  actionLabel = 'Go to homepage',
  actionHref = '/',
  className,
}: EmptyStateProps) {
  return (
    <section className={cn('rounded-[2rem] border border-[rgb(98,43,20,0.2)] bg-white/80 p-8 text-center', className)}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[rgb(231, 225, 177)] text-[rgb(13, 83, 14)]">
        <SearchX className="h-6 w-6" />
      </div>
      <h2 className="mt-5 text-2xl font-black tracking-[-0.03em] text-[rgb(231, 225, 177)]">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[rgb(13, 83, 14)]">{description}</p>
      <Link href={actionHref} className="mt-6 inline-flex items-center gap-2 rounded-full border border-[rgb(98,43,20,0.2)] bg-white px-5 py-3 text-sm font-black text-[rgb(13, 83, 14)] transition hover:bg-[rgb(13, 83, 14)] hover:text-white">
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}

export function TaskEmptyState({ taskLabel = 'posts', className }: { taskLabel?: string; className?: string }) {
  return (
    <EmptyState
      className={className}
      title={`No ${taskLabel} available yet`}
      description={`As soon as new ${taskLabel} are published, they will show here with full cards and navigation.`}
      actionLabel="Explore site"
      actionHref="/"
    />
  )
}

export function ContactSuccessState({ className }: { className?: string }) {
  return (
    <EmptyState
      className={className}
      title="Message received"
      description="Your message has been received. We will get back to you soon."
      actionLabel="Return home"
      actionHref="/"
    />
  )
}
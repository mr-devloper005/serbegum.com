import Link from 'next/link'
import { Eye, Star, Car, Building2, PawPrint, Briefcase, Tv, MonitorPlay, GraduationCap, Plane, Wrench } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const quickCategories = [
  'Online',
  'Local Services',
  'Cars & Bikes',
  'Properties',
  'Pet',
  'Jobs',
  'Electronics',
  'Website',
  'Education',
]

const cityTiles = ['Delhi', 'Chennai', 'Hyderabad']

const quickCategoryIcons = [
  MonitorPlay,
  Wrench,
  Car,
  Building2,
  PawPrint,
  Briefcase,
  Tv,
  MonitorPlay,
  GraduationCap,
  Plane,
]

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function SafeCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-2xl border border-[rgb(98,43,20,0.16)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/11] overflow-hidden bg-[rgb(231, 225, 177)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-[rgb(13, 83, 14)] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">{getEditableCategory(post)}</span>
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-2xl font-black leading-tight tracking-[-0.04em] text-[rgb(13, 83, 14)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[rgb(13, 83, 14)]">{getEditableExcerpt(post, 110)}</p>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const collage = posts.slice(0, 12)
  const sliderItems = collage.length ? [...collage, ...collage] : []
  return (
    <section className="overflow-hidden border-b border-[rgb(98,43,20,0.18)] bg-[rgb(251, 245, 221)]">
      <div className="relative mx-auto max-w-[1600px] min-h-[360px] sm:min-h-[420px]">
        <div className="editable-hero-slider-track absolute inset-0 opacity-45">
          {sliderItems.map((post, idx) => (
            <div key={`${post.id}-${idx}`} className="editable-hero-slide-item bg-[rgb(231, 225, 177)]">
              <img src={getEditablePostImage(post)} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,10,80,0.5),rgba(20,10,80,0.72))]" />

        <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
          <div className="max-w-4xl text-center text-white">
            <h1 className="text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">You can buy, rent, and book anything from here.</h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[rgb(231, 225, 177)]">Buy and sell everything from local products to services, or search for property, jobs, and more near your city.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href={primaryRoute} className="rounded-full border border-[rgb(228,214,169,0.45)] bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-[rgb(13, 83, 14)]">{taskLabel(primaryTask)}</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-5 sm:px-6 lg:px-8">
        <div className="-mt-10 flex snap-x gap-3 overflow-x-auto pb-2">
          {quickCategories.map((cat, idx) => (
            <div key={cat} className="w-[88px] shrink-0 snap-start rounded-xl border border-[rgb(13, 83, 14)] bg-[rgb(251, 245, 221)] px-3 py-3 text-center shadow-sm">
              {(() => {
                const Icon = quickCategoryIcons[idx] || Star
                return (
                  <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-[rgb(231, 225, 177)] text-[rgb(13, 83, 14)]">
                    <Icon className="h-5 w-5" />
                  </div>
                )
              })()}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[0]
  const visual = posts[1] || posts[0]
  if (!feature || !visual) return null

  return (
    <section className="bg-[rgb(251, 245, 221)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <h2 className="text-5xl font-black leading-[1.05] tracking-[-0.05em] text-[rgb(13, 83, 14)]">Find your needs in our best featured ads</h2>
          <p className="mt-6 text-[32px] font-black italic text-[rgb(13, 83, 14)]">Featured Ads</p>
          <p className="mt-5 text-[31px] leading-[1.6] text-[rgb(13, 83, 14)]">{getEditableExcerpt(feature, 340)}</p>
          <Link href={postHref(primaryTask, feature, primaryRoute)} className="mt-6 inline-flex items-center gap-2 rounded-md bg-[rgb(13, 83, 14)] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white"><Eye className="h-4 w-4" /> View all featured</Link>
        </div>
        <SafeCard post={visual} href={postHref(primaryTask, visual, primaryRoute)} />
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const cards = posts.slice(2, 8)
  if (!cards.length) return null

  return (
    <section className="bg-[rgb(251, 245, 221)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-center text-5xl font-black tracking-[-0.05em] text-[rgb(13, 83, 14)]">Popular Trending Ads</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-[31px] leading-8 text-[rgb(13, 83, 14)]">Find your related search ads according to your categories, state, city, and pin code area.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {cards.map((post) => <SafeCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
        </div>
        <div className="mt-8 text-center">
          <Link href={primaryRoute} className="inline-flex items-center gap-2 rounded-md bg-[rgb(13, 83, 14)] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white"><Eye className="h-4 w-4" /> View all trend</Link>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const stream = timeSections.flatMap((section) => section.posts)
  const cards = (stream.length ? stream : posts).slice(8, 12)
  if (!cards.length) return null

  return (
    <section className="bg-[rgb(251, 245, 221)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-center text-5xl font-black tracking-[-0.05em] text-[rgb(13, 83, 14)]">Browse Our Top Classified Ads</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-[31px] leading-8 text-[rgb(13, 83, 14)]">Find your related search ads according to your categories, state, city, pin code area.</p>

        <div className="mt-8 grid grid-cols-3 overflow-hidden rounded-t-2xl border border-[rgb(98,43,20,0.16)] bg-white">
          <button className="border-b-2 border-[rgb(13, 83, 14)] bg-[rgb(243,243,243)] px-4 py-4 text-sm font-black uppercase tracking-[0.12em] text-[rgb(13, 83, 14)]">Top ratings</button>
          <button className="border-b border-[rgb(98,43,20,0.16)] px-4 py-4 text-sm font-black uppercase tracking-[0.12em] text-[rgb(13, 83, 14)]">Top advertiser</button>
          <button className="border-b border-[rgb(98,43,20,0.16)] px-4 py-4 text-sm font-black uppercase tracking-[0.12em] text-[rgb(13, 83, 14)]">Top engaged</button>
        </div>

        <div className="grid gap-4 border border-t-0 border-[rgb(98,43,20,0.16)] bg-white p-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((post) => <SafeCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
        </div>

        <div className="mt-8 text-center">
          <Link href={primaryRoute} className="inline-flex items-center gap-2 rounded-md bg-[rgb(13, 83, 14)] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white"><Eye className="h-4 w-4" /> View all ads</Link>
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[rgb(251, 245, 221)] pb-14 pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-5xl font-black tracking-[-0.05em] text-[rgb(13, 83, 14)]">Top Cities by Ads</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-[31px] leading-8 text-[rgb(13, 83, 14)]">Find your related search ads according to your categories, state, city, and pin code area.</p>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {cityTiles.map((city, idx) => (
            <div key={city} className="group relative overflow-hidden rounded-xl border border-[rgb(98,43,20,0.18)]">
              <img src={`/placeholder.svg?height=420&width=680&text=${encodeURIComponent(city)}`} alt={city} className="h-52 w-full object-cover brightness-75 transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.55))]" />
              <p className="absolute bottom-4 left-4 text-3xl font-black text-white">{city}</p>
              <span className="absolute right-4 top-4 rounded-full bg-[rgb(13, 83, 14)] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white">{1200 + idx * 800} ads</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

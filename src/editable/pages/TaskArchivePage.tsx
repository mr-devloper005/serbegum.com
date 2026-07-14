// Editable redesign refreshed.
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)
const placeholder = '/placeholder.svg?height=900&width=1200'

const decodeHtmlEntities = (value: string) => value
  .replace(/&#(\d+);/g, (_match, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([\da-f]+);/gi, (_match, code) => String.fromCodePoint(Number.parseInt(code, 16)))
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&quot;/gi, '"')
  .replace(/&apos;|&#39;/gi, "'")

const plainText = (value: string) => {
  let decoded = value
  for (let pass = 0; pass < 2; pass += 1) decoded = decodeHtmlEntities(decoded)
  return decoded
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail)
  const logo = asText(content.logo)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])].filter(Boolean).slice(0, 8)
}

const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const getSummary = (post: SitePost) => plainText(post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body)) || 'Open this post for complete details.'
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; badge: string }> = {
  article: { icon: FileText, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', badge: 'Read' },
  listing: { icon: Building2, archiveClass: 'grid gap-5 xl:grid-cols-2', badge: 'Business' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', badge: 'Offer' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3', badge: 'Gallery' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', badge: 'Bookmark' },
  pdf: { icon: Download, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-4', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = { '--archive-bg': '#FBF5DD', '--archive-text': '#2f1a10', '--archive-surface': '#fffdf6', '--archive-accent': '#0D530E' } as CSSProperties
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="mx-auto grid max-w-[1450px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.14fr_0.86fr] lg:px-8 lg:py-16">
          <div className="relative overflow-hidden rounded-[2.3rem] border border-[rgb(27,60,83,0.2)] bg-[var(--archive-surface)] p-7 shadow-[0_24px_80px_rgba(27,60,83,0.16)] sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[rgb(231,225,177)]/75 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 left-8 h-52 w-52 rounded-full bg-[rgb(48,109,41)]/18 blur-2xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-[rgb(231,225,177)] px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[rgb(13,83,14)]"><Icon className="h-4 w-4" /> {label}</div>
              <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.07em] sm:text-6xl">{voice?.headline || `Browse ${label}`}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[rgb(13,83,14)]">{voice?.description || SITE_CONFIG.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {voice.chips.map((chip, chipIndex) => (
                  <span key={chip} className={`rounded-full border border-[rgb(27,60,83,0.22)] px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-[rgb(13,83,14)] ${chipIndex % 2 === 0 ? 'bg-white' : 'bg-[rgb(231,225,177)]'}`}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <form action={basePath} className="self-end rounded-[2rem] border border-[rgb(27,60,83,0.24)] bg-white p-5 shadow-[0_14px_42px_rgba(27,60,83,0.14)]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgb(231,225,177)] px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-[rgb(13,83,14)]"><Filter className="h-4 w-4" /> Filter</div>
            <div className="rounded-2xl border border-[rgb(27,60,83,0.2)] p-3">
              <select name="category" defaultValue={category} className="h-12 w-full rounded-xl border border-[rgb(27,60,83,0.2)] bg-[rgb(251,245,221)] px-4 text-sm font-black outline-none">
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <button className="mt-3 h-12 w-full rounded-xl bg-[rgb(13,83,14)] text-sm font-black uppercase tracking-[0.12em] text-white">Apply filter</button>
            </div>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-[rgb(13,83,14)]">Showing: {categoryLabel}</p>
          </form>
        </section>

        <section className="mx-auto max-w-[1450px] px-4 pb-16 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className={deck.archiveClass}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[rgb(98,43,20,0.25)] bg-white/70 p-10 text-center">
              <Search className="mx-auto h-8 w-8 text-[rgb(13, 83, 14)]" />
              <h2 className="mt-4 text-3xl font-black tracking-[-0.05em]">No posts found</h2>
              <p className="mt-2 text-sm text-[rgb(13, 83, 14)]">Try another category or refresh after publishing new content.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-full border border-[rgb(98,43,20,0.2)] bg-white px-5 py-3 text-sm font-black">Previous</Link> : null}
            <span className="rounded-full bg-[rgb(13, 83, 14)] px-5 py-3 text-sm font-black text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-full border border-[rgb(98,43,20,0.2)] bg-white px-5 py-3 text-sm font-black">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  const category = getCategory(post, 'Article')
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[rgb(98,43,20,0.18)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-[rgb(13, 83, 14)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">{category}</span>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[rgb(13, 83, 14)]">Story {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-2 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[rgb(13, 83, 14)]">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  return (
    <Link href={href} className="group grid gap-5 rounded-[2rem] border border-[rgb(98,43,20,0.18)] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[120px_1fr]">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.5rem] bg-[rgb(246,235,203)] ring-1 ring-[rgb(98,43,20,0.15)]">
        {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-10 w-10 opacity-45" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[rgb(13, 83, 14)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 rounded-full border border-[rgb(98,43,20,0.2)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em]"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-4 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[rgb(13, 83, 14)]">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const summary = getSummary(post)
  const style = ((post.slug || post.id || post.title).length % 3)

  if (style === 0) {
    return (
      <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[rgb(27,60,83,0.2)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
        <div className="relative aspect-[16/11] overflow-hidden bg-[rgb(231,225,177)]">
          {image ? <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : null}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(13,83,14,0.78))]" />
          <span className="absolute left-4 top-4 rounded-full bg-[rgb(13,83,14)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">Featured</span>
          <h2 className="absolute bottom-4 left-4 right-4 line-clamp-2 text-3xl font-black leading-tight tracking-[-0.05em] text-white">{post.title}</h2>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-lg font-black text-[rgb(13,83,14)]">{price || 'Open offer'}</p>
            <p className="rounded-full bg-[rgb(231,225,177)] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[rgb(13,83,14)]">{location || 'Local'}</p>
          </div>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-[rgb(13,83,14)]">{summary}</p>
        </div>
      </Link>
    )
  }

  if (style === 1) {
    return (
      <Link href={href} className="group grid overflow-hidden rounded-[2rem] border border-[rgb(27,60,83,0.2)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
        <div className="grid min-h-[300px] grid-cols-[0.88fr_1.12fr]">
          <div className="p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[rgb(13,83,14)]">Classified</p>
            <h2 className="mt-3 line-clamp-3 text-4xl font-black leading-[0.95] tracking-[-0.06em] text-[rgb(13,83,14)]">{price || 'Open offer'}</h2>
            <p className="mt-3 text-sm font-black text-[rgb(13,83,14)]">{location || 'Local listing'}</p>
            <div className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[rgb(13,83,14)]">
              View listing <ArrowRight className="h-4 w-4" />
            </div>
          </div>
          <div className="border-l border-[rgb(27,60,83,0.12)] p-5">
            <h3 className="line-clamp-3 text-3xl font-black leading-tight tracking-[-0.05em] text-[rgb(13,83,14)]">{post.title}</h3>
            <p className="mt-4 line-clamp-4 text-sm leading-6 text-[rgb(13,83,14)]">{summary}</p>
            {image ? <img src={image} alt="" className="mt-5 h-16 w-16 rounded-xl object-cover" /> : null}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[rgb(27,60,83,0.2)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[rgb(13,83,14)]">Classified</p>
          <span className="rounded-full bg-[rgb(231,225,177)] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[rgb(13,83,14)]">{location || 'Local'}</span>
        </div>
        <h2 className="line-clamp-2 text-4xl font-black leading-tight tracking-[-0.06em] text-[rgb(13,83,14)]">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[rgb(13,83,14)]">{summary}</p>
      </div>
      <div className="grid grid-cols-[1fr_auto] border-t border-[rgb(27,60,83,0.12)]">
        <div className="px-5 py-4">
          <p className="text-xl font-black text-[rgb(13,83,14)]">{price || 'Open offer'}</p>
          <p className="mt-2 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[rgb(13,83,14)]">View listing <ArrowRight className="h-4 w-4" /></p>
        </div>
        {image ? <img src={image} alt="" className="h-full w-24 object-cover" /> : <div className="w-24 bg-[rgb(231,225,177)]" />}
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getImage(post)
  return (
    <Link href={href} className="group mb-5 block break-inside-avoid overflow-hidden rounded-[2rem] border border-[rgb(98,43,20,0.18)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-[rgb(246,235,203)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-4 line-clamp-3 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block rounded-[1.7rem] border border-[rgb(98,43,20,0.18)] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:bg-[rgb(13, 83, 14)] hover:text-[rgb(255,248,231)]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-current/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5" />
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-70">{getSummary(post)}</p>
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const category = getCategory(post, 'PDF')
  return (
    <Link href={href} className="group rounded-[2rem] border border-[rgb(98,43,20,0.18)] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-[1.4rem] bg-[rgb(13, 83, 14)] p-5 text-[rgb(255,248,231)]"><FileText className="h-8 w-8" /></div>
        <span className="rounded-full bg-[rgb(246,235,203)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]">{category}</span>
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-[rgb(13, 83, 14)]">{getSummary(post)}</p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const avatar = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group rounded-[2rem] border border-[rgb(98,43,20,0.18)] bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[rgb(246,235,203)] ring-1 ring-[rgb(98,43,20,0.15)]">
        {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 opacity-45" />}
      </div>
      <h2 className="mt-5 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      {role ? <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-[rgb(13, 83, 14)]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-[rgb(13, 83, 14)]">{getSummary(post)}</p>
    </Link>
  )
}

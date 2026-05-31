// Editable redesign refreshed.
import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#FBF5DD',
  '--slot4-page-text': '#000000',
  '--slot4-panel-bg': '#E7E1B1',
  '--slot4-surface-bg': '#E7E1B1',
  '--slot4-muted-text': '#000000',
  '--slot4-soft-muted-text': '#000000',
  '--slot4-accent': '#0D530E',
  '--slot4-accent-fill': '#0D530E',
  '--slot4-accent-soft': '#E7E1B1',
  '--slot4-dark-bg': '#0D530E',
  '--slot4-dark-text': '#E7E1B1',
  '--slot4-media-bg': '#FBF5DD',
  '--slot4-cream': '#E7E1B1',
  '--slot4-warm': '#E7E1B1',
  '--slot4-lavender': '#E7E1B1',
  '--slot4-gray': '#FBF5DD',
  '--slot4-body-gradient': 'radial-gradient(circle at 12% 12%, rgba(254,253,153,0.5), transparent 45%), radial-gradient(circle at 90% 80%, rgba(202,97,128,0.2), transparent 45%), linear-gradient(180deg, #FBF5DD 0%, #306D29 60%, #FBF5DD 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[rgb(202,97,128,0.22)]',
  darkBorder: 'border-[rgb(254,253,153,0.32)]',
  shadow: 'shadow-[0_14px_44px_rgba(202,97,128,0.18)]',
  shadowStrong: 'shadow-[0_26px_84px_rgba(202,97,128,0.32)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(252,183,199,0.1),rgba(202,97,128,0.75))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[190px] shrink-0 snap-start sm:w-[220px]',
  },
  type: {
    eyebrow: 'text-xs font-extrabold uppercase tracking-[0.2em]',
    heroTitle: 'text-4xl font-black leading-[1.03] tracking-[-0.06em] sm:text-5xl lg:text-[3.4rem]',
    sectionTitle: 'text-3xl font-black tracking-[-0.05em] sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-3xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-3xl border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-3xl ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-full ${editablePalette.darkBg} px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90`,
    secondary: `inline-flex items-center justify-center rounded-full border ${editablePalette.border} ${editablePalette.surfaceBg} px-8 py-3.5 text-sm font-semibold ${editablePalette.surfaceText} transition hover:bg-black/[0.03]`,
    accent: `inline-flex items-center justify-center rounded-full ${editablePalette.accentBg} px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90`,
  },
  media: {
    frame: `relative overflow-hidden rounded-2xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(202,97,128,0.28)]',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'Keep all UI edits inside src/editable and preserve task routes and data wiring.',
  'Use multiple post card shapes on archive/home pages: featured, compact, horizontal, editorial, and image-first.',
  'Keep search-first hero sections for classified and local discovery intent.',
  'Always render with safe fallbacks when image, summary, category, or fields are missing.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const

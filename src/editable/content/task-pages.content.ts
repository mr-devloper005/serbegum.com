// Editable redesign refreshed.
import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Community stories',
    headline: 'Informative posts arranged for easy reading and quick context.',
    description: 'Use this section for explainers, updates, and practical long-form content relevant to local users.',
    filterLabel: 'Choose article topic',
    secondaryNote: 'Readable hierarchy helps visitors stay engaged longer.',
    chips: ['Editorial', 'Readable', 'Fresh updates'],
  },
  classified: {
    eyebrow: 'Classified board',
    headline: 'Quick-scan classifieds for buying, selling, and local opportunities.',
    description: 'Offers, notices, and practical listings are presented for speed, clarity, and immediate action.',
    filterLabel: 'Filter classified category',
    secondaryNote: 'Keep details concise and action-oriented.',
    chips: ['Fast scan', 'Offers', 'Location-aware'],
  },
  sbm: {
    eyebrow: 'Saved resources',
    headline: 'Useful links and references grouped into clean collections.',
    description: 'Bookmark pages stay text-led so users can compare resources without visual clutter.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Curated references should feel easy to trust and revisit.',
    chips: ['Collections', 'Resources', 'Reference flow'],
  },
  profile: {
    eyebrow: 'Profiles',
    headline: 'Identity-first profile pages for people, teams, and businesses.',
    description: 'Profile cards highlight names, summaries, and role context for better discovery.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Identity and credibility cues should appear early.',
    chips: ['Identity', 'Trust cues', 'Contact-ready'],
  },
  pdf: {
    eyebrow: 'Document zone',
    headline: 'Documents and downloadable posts organized like a useful library.',
    description: 'This section helps users find guides, forms, or reports with clear labels and context.',
    filterLabel: 'Filter document type',
    secondaryNote: 'File pages need strong metadata and simple actions.',
    chips: ['Documents', 'Guides', 'Download ready'],
  },
  listing: {
    eyebrow: 'Business listing',
    headline: 'Directory-style business posts with clear location and service context.',
    description: 'Ideal for local businesses, professionals, and service providers who need straightforward visibility.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Comparison and trust cues should stay obvious.',
    chips: ['Directory', 'Compare', 'Service discovery'],
  },
  image: {
    eyebrow: 'Visual feed',
    headline: 'Image-first posts with compact context and easy navigation.',
    description: 'Visual content is displayed in gallery-friendly layouts while preserving post details.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Let visuals lead while keeping text support concise.',
    chips: ['Gallery', 'Image-first', 'Mobile smooth'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
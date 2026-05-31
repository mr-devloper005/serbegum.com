// Editable redesign refreshed.
import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Classifieds and local discovery',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Classifieds and local discovery',
    primaryLinks: [
      { label: 'Classified', href: '/classified' },
      { label: 'Jobs', href: '/listing' },
      { label: 'Images', href: '/image' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Post ad', href: '/classified' },
      secondary: { label: 'Contact', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Local offers, services, jobs, and community updates',
    description: 'A local-first public platform where people post offers, discover services, browse jobs, and find practical opportunities nearby.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Classified', href: '/classified' },
          { label: 'Listings', href: '/listing' },
          { label: 'Images', href: '/image' },
          { label: 'PDF Library', href: '/pdf' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for easy local discovery and safer community browsing.',
  },
  commonLabels: {
    readMore: 'Open details',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
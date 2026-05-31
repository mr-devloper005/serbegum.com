// Editable redesign refreshed.
import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Local classifieds, jobs, services, and community listings',
      description: 'Browse local classified ads, job posts, services, rentals, and practical community offers in one place.',
      openGraphTitle: 'Local classifieds and opportunity hub',
      openGraphDescription: 'Discover local posts for buying, selling, hiring, renting, and everyday services.',
      keywords: ['classified ads', 'local jobs', 'real estate listing', 'community services'],
    },
    hero: {
      badge: 'Search local opportunities',
      title: ['Find local offers, jobs, rentals,', 'and services in one place.'],
      description: 'A practical classified-style experience for buyers, sellers, freelancers, students, and small business owners who need fast local discovery.',
      primaryCta: { label: 'Browse classifieds', href: '/classified' },
      secondaryCta: { label: 'See all categories', href: '/listing' },
      searchPlaceholder: 'Search jobs, products, services, rentals',
      focusLabel: 'Focus',
      featureCardBadge: 'featured listing',
      featureCardTitle: 'Find time-sensitive offers and practical updates quickly.',
      featureCardDescription: 'Posts are arranged to make scanning easy on both desktop and mobile.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for real local discovery, not just endless scrolling.',
      paragraphs: [
        'This site combines classified ads, business listings, profile pages, image posts, and documents into one consistent browsing experience.',
        'Whether you are hiring, selling, renting, promoting a service, or looking for nearby opportunities, navigation stays simple and familiar.',
        'Pages are organized to support quick decisions with clear summaries, category filters, and detail views.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Search-first homepage for faster discovery.',
        'Category-ready archives with pagination.',
        'Detail pages designed for practical actions.',
        'Responsive layout optimized for local users on mobile.',
      ],
      primaryLink: { label: 'Browse classified', href: '/classified' },
      secondaryLink: { label: 'See services', href: '/listing' },
    },
    cta: {
      badge: 'Get started',
      title: 'Post an offer and connect with local users faster.',
      description: 'Share your listing and reach the right audience for products, jobs, rentals, services, and community opportunities.',
      primaryCta: { label: 'Post in classified', href: '/classified' },
      secondaryCta: { label: 'Contact support', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About us',
    title: 'A local listing experience designed for clarity and speed.',
    description: `${slot4BrandConfig.siteName} helps people discover nearby opportunities through categorized posts and practical detail pages.`,
    paragraphs: [
      'The platform supports a wide range of local needs including jobs, small business visibility, second-hand products, services, and rentals.',
      'Each section shares a common layout language so users can browse confidently without relearning the interface on every page.',
    ],
    values: [
      {
        title: 'Useful structure',
        description: 'Posts are grouped with filters and clear metadata for faster browsing and better decision-making.',
      },
      {
        title: 'Community focus',
        description: 'Designed for local buyers, sellers, service providers, and everyday users who need practical outcomes.',
      },
      {
        title: 'Mobile-ready',
        description: 'Layouts and cards are optimized for smooth scanning and touch-friendly interactions.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Need help posting, updating, or finding the right category?',
    description: 'Send your query and we will help you publish or discover listings effectively across the platform.',
    formTitle: 'Send a support request',
  },
  detailPages: {
    article: {
      relatedTitle: 'Related posts',
      fallbackTitle: 'Post details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Related profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit website',
    },
  },
} as const
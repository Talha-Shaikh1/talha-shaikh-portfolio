import { ItemList, Person, WebSite, WebPage, WithContext } from 'schema-dts'

/**
 * Reusable SEO utilities and types for portfolio pages
 * Use this to create page-specific metadata with consistent branding
 */

export const siteConfig = {
  name: 'Talha Shaikh',
  title: 'Full Stack Developer | AI Automation Engineer',
  url: 'https://talhaweb.xyz',
  description:
    'Full Stack Web Developer and AI Automation Engineer specializing in Next.js, AI Agents, SaaS, and business automation solutions.',
  ogImage: 'https://talhaweb.xyz/ogImage.png',
  links: {
    github: 'https://github.com/Talha-Shaikh1', // Update with your actual username
    linkedin: 'https://www.linkedin.com/in/muhammad-talha-938b75377?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    twitter: 'https://x.com/Talha3690',
    email: 'mailto:talha369852@gmail.com',
  },
}

/**
 * Generate page-specific metadata with consistent branding
 * @param pageTitle - Specific page title (e.g., 'Projects', 'About')
 * @param pageDescription - Specific page description
 * @param canonicalPath - URL path for canonical (e.g., '/projects')
 */
export function generatePageMetadata(
  pageTitle: string,
  pageDescription: string,
  canonicalPath: string = '/'
) {
  const fullUrl = `${siteConfig.url}${canonicalPath}`
  
  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: `${pageTitle} | ${siteConfig.name}`,
      description: pageDescription,
      url: fullUrl,
      siteName: `${siteConfig.name} Portfolio`,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${pageTitle} - ${siteConfig.name}`,
          type: 'image/png',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageTitle} | ${siteConfig.name}`,
      description: pageDescription,
      images: [siteConfig.ogImage],
      creator: '@talhadev',
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}

/**
 * Structured data for the portfolio website
 */
export const websiteStructuredData: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${siteConfig.name} Portfolio`,
  description: siteConfig.description,
  url: siteConfig.url,
  image: siteConfig.ogImage,
  author: {
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
  },
  publisher: {
    '@type': 'Person',
    name: siteConfig.name,
  },
}

/**
 * Structured data for the homepage
 */
export const homePageStructuredData: WithContext<WebPage> = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `${siteConfig.name} - ${siteConfig.title}`,
  description: siteConfig.description,
  url: siteConfig.url,
  image: siteConfig.ogImage,
  isPartOf: {
    '@type': 'WebSite',
    name: `${siteConfig.name} Portfolio`,
    url: siteConfig.url,
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: siteConfig.ogImage,
    width: '1200',
    height: '630',
  },
}

/**
 * Structured data for Person (for about page or homepage)
 */
export const personStructuredData: WithContext<Person> = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: siteConfig.url,
  image: siteConfig.ogImage,
  jobTitle: siteConfig.title,
  sameAs: Object.values(siteConfig.links).filter((link) => !link.startsWith('mailto:')),
  description: siteConfig.description,
  knowsAbout: [
    'Next.js',
    'React',
    'TypeScript',
    'JavaScript',
    'Python',
    'AI Agents',
    'SaaS Development',
    'Business Automation',
    'Full Stack Development',
  ],
}

/**
 * Structured data for projects portfolio
 */
export const portfolioStructuredData: WithContext<ItemList> = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Portfolio Projects',
  description: 'Collection of web development and AI automation projects',
  url: `${siteConfig.url}/projects`,
  itemListElement: [], // Populate dynamically based on your projects
}

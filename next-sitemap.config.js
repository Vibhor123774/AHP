/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.assignmentshelpprovider.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  
  // Exclude admin, API routes, and unwanted pages
  exclude: [
    '/admin/*', 
    '/api/*', 
    '/landing',
    '/404',
    '/500'
  ],

  // Transform function to add proper SEO metadata to each URL
  transform: async (config, path) => {
    // Default values
    let priority = 0.7
    let changefreq = 'weekly'

    // Set priority and changefreq based on page type
    if (path === '/') {
      // Homepage - highest priority
      priority = 1.0
      changefreq = 'daily'
    } else if (path === '/blogs' || path.startsWith('/blogs/')) {
      // Blog pages - high priority, frequent updates
      priority = 0.8
      changefreq = 'daily'
    } else if (
      // Main service and subject pages
      path === '/samples' || 
      path === '/contact' || 
      path === '/careers' ||
      path.startsWith('/services/') ||
      path.startsWith('/subjects/')
    ) {
      priority = 0.8
      changefreq = 'weekly'
    } else if (path.startsWith('/samples/')) {
      // Sample pages - medium priority
      priority = 0.6
      changefreq = 'monthly'
    }

    return {
      loc: path,
      changefreq: changefreq,
      priority: priority,
      lastmod: new Date().toISOString(),
    }
  },

  // Additional paths that should be included in sitemap
  additionalPaths: async (config) => {
    const additionalPaths = []

    // Static service pages
    const servicePages = [
      '/services/dissertation-writing',
      '/services/programming-assignment-help',
      '/services/research-paper-writing',
      '/services/thesis-writing'
    ]

    servicePages.forEach(path => {
      additionalPaths.push({
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      })
    })

    // Static subject pages
    const subjectPages = [
      '/subjects/accounting-assignment-help',
      '/subjects/economics-assignment-help',
      '/subjects/engineering-assignment-help',
      '/subjects/finance-assignment-help',
      '/subjects/law-assignment-help',
      '/subjects/management-assignment-help',
      '/subjects/medical-assignment-help',
      '/subjects/nursing-assignment-help',
      '/subjects/psychology-assignment-help'
    ]

    subjectPages.forEach(path => {
      additionalPaths.push({
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      })
    })

    // Sample pages by category
    const sampleCategories = ['accounting', 'economics', 'finance', 'law', 'management', 'medical', 'nursing', 'psychology']
    
    sampleCategories.forEach(category => {
      // Category main page
      additionalPaths.push({
        loc: `/samples/${category}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })

      // Individual sample pages (1-4 for each category)
      for (let i = 1; i <= 4; i++) {
        additionalPaths.push({
          loc: `/samples/${category}-sample-${i}`,
          changefreq: 'monthly',
          priority: 0.6,
          lastmod: new Date().toISOString(),
        })
      }
    })

    // Special sample pages
    const specialSamples = [
      '/samples/dissertation',
      '/samples/business-plan',
      '/samples/management-capstone-project',
      '/samples/programming',
      '/samples/research',
      '/samples/prostate-cancer',
      '/samples/significance-of-two-way-communication',
      '/samples/supply-chain-management',
      '/samples/accounts'
    ]

    specialSamples.forEach(path => {
      additionalPaths.push({
        loc: path,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: new Date().toISOString(),
      })
    })

    // Try to fetch dynamic blog posts from your API
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${config.siteUrl}/api/get-blog-summaries`)
      
      if (response.ok) {
        const blogs = await response.json()
        
        blogs.forEach((blog) => {
          if (blog.slug && blog.slug.trim() !== '') {
            additionalPaths.push({
              loc: `/blogs/${blog.slug}`,
              changefreq: 'monthly',
              priority: 0.7,
              lastmod: blog.updated_at || blog.created_at || new Date().toISOString(),
            })
          }
        })
      }
    } catch (error) {
      console.warn('Could not fetch dynamic blog paths for sitemap:', error.message)
      // Continue without dynamic blog paths
    }

    return additionalPaths
  },

  // Generate robots.txt file
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/landing'],
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://www.assignmentshelpprovider.com'}/sitemap.xml`,
    ],
  },
}
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Optional: Redirect sitemap.xml to the generated file
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap.xml', // This will serve the generated file from public/
      },
    ]
  },

  // Optional: Add headers for better SEO
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate',
          },
        ],
      },
    ]
  },

  // Image optimization settings
  images: {
    domains: ['www.assignmentshelpprovider.com', 'assignmentshelpprovider.com'],
  },
}

module.exports = nextConfig
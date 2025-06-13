/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://assignmentshelpprovider.com',
  outDir: 'out',
  //   generateRobotsTxt: true // (optional)
  // ...other options
  transform: async (config, path) => {
    return {
      loc: path
    }
  },
  exclude: ['/admin/*','/landing']
}

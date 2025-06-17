// pages/sitemap.xml.js
import { supabase } from '../lib/supabase'

function generateSiteMap(blogs) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Static pages -->
     <url>
       <loc>https://www.assignmentshelpprovider.com/</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>daily</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>https://www.assignmentshelpprovider.com/blogs</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <changefreq>daily</changefreq>
       <priority>0.8</priority>
     </url>
     <!-- Blog posts -->
     ${blogs
       .map(({ slug, created_at, updated_at }) => {
         return `
       <url>
           <loc>https://www.assignmentshelpprovider.com//blogs/${slug}</loc>
           <lastmod>${updated_at || created_at}</lastmod>
           <changefreq>monthly</changefreq>
           <priority>0.7</priority>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  try {
    // Fetch all blog posts
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('slug, created_at, updated_at')
      .order('created_at', { ascending: false })

    if (error) throw error

    // Generate the XML sitemap
    const sitemap = generateSiteMap(blogs || [])

    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()

    return {
      props: {}
    }
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Return empty sitemap on error
    const emptySitemap = generateSiteMap([])
    res.setHeader('Content-Type', 'text/xml')
    res.write(emptySitemap)
    res.end()

    return {
      props: {}
    }
  }
}

export default SiteMap
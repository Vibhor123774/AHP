import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import ContactForm from '../../components/ContactForm'
import { Calendar } from 'lucide-react'

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [headings, setHeadings] = useState([])
  const [tocOpen, setTocOpen] = useState(true)
  const contentRef = useRef(null)

  // Fetch post by slug
  useEffect(() => {
    if (!slug) return
    const fetchPost = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/get-blog-by-slug?slug=${slug}`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setPost(data)
        if (data?.tags?.length) fetchRelatedPosts(data.tags, data.id)
      } catch (err) {
        console.error(err)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug])

  // Fetch related posts including image
  const fetchRelatedPosts = async (tags, currentId) => {
    try {
      const res = await fetch('/api/get-blog-summaries')
      if (!res.ok) throw new Error('Failed to fetch')
      const all = await res.json()
      const filtered = all
        .filter(
          (p) => p.id !== currentId && p.tags?.some((tag) => tags.includes(tag))
        )
        .slice(0, 4)
        .map((p) => ({
          ...p,
          date: new Date(p.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          readTime: p.reading_time
            ? `${p.reading_time} min read`
            : '7 min read',
          cover: p.cover_image_url || '/default-cover.jpg'
        }))
      setRelatedPosts(filtered)
    } catch (err) {
      console.error(err)
    }
  }

  // Build table of contents
  useEffect(() => {
    if (!post || !contentRef.current) return
    setTimeout(() => {
      const elems = contentRef.current.querySelectorAll(
        'h1, h2, h3, h4, h5, h6'
      )
      const toc = Array.from(elems).map((el, idx) => {
        if (!el.id) {
          el.id =
            el.textContent
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '') || `sec-${idx}`
        }
        const link = document.createElement('a')
        link.href = `#${el.id}`
        link.className = 'heading-link'
        link.onclick = (e) => {
          e.preventDefault()
          scrollTo(el.id)
        }
        while (el.firstChild) link.appendChild(el.firstChild)
        el.appendChild(link)
        return { id: el.id, text: link.textContent, level: +el.tagName[1] }
      })
      setHeadings(toc)
    }, 100)
  }, [post])

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const bar = document.getElementById('scroll-progress')
      if (!bar) return
      const pct =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100
      bar.style.width = `${pct}%`
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const offset = el.getBoundingClientRect().top + window.pageYOffset - 80
    window.scrollTo({ top: offset, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-violet-600 dark:text-violet-400">
            Loading...
          </p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Post not found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The blog post doesn’t exist.
          </p>
          <Link
            href="/blogs"
            className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Head>
        <title>{post.title} | Blog</title>
        <meta name="description" content={post.excerpt || 'Blog post'} />
        <style jsx global>{`
          /* Remove underline on heading links */
          .heading-link {
            text-decoration: none !important;
            color: inherit !important;
          }
          /* Remove underline on prose headings */
          .prose h1,
          .prose h2,
          .prose h3,
          .prose h4 {
            text-decoration: none !important;
          }
        `}</style>
      </Head>

      <Navbar />
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
        <div
          id="scroll-progress"
          className="h-full bg-violet-500 w-0 transition-width"
        />
      </div>

      <main className="max-w-screen-xl mx-auto px-4 mt-5">
        {/* Blog & Sticky Enquire Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <article className="lg:col-span-2">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.6 } }}
            >
              {post.title}
            </motion.h1>
            <motion.div
              className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-8 space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.8 } }}
            >
              <span className="font-medium text-violet-600 dark:text-violet-400">
                TEAM AHP
              </span>
              <span>•</span>
              <span>{new Date(post.created_at).toDateString()}</span>
              <span>•</span>
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {`${post.reading_time} MIN READ`}
              </span>
            </motion.div>
            <motion.div
              className="relative h-64 md:h-[400px] rounded-xl overflow-hidden mb-10 shadow-lg"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { duration: 0.8, delay: 0.4 }
              }}
            >
              <img
                src={post.cover_image_url || '/default-cover.jpg'}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
            {headings.length > 0 && (
              <motion.div
                className="mb-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-5 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.6 }
                }}
              >
                <button
                  onClick={() => setTocOpen(!tocOpen)}
                  className="w-full text-left text-lg font-medium mb-3 text-gray-900 dark:text-white flex items-center"
                >
                  Table of Contents
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ml-auto transition-transform ${
                      tocOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {tocOpen && (
                  <div className="space-y-1">
                    {headings.map((h) => (
                      <div
                        key={h.id}
                        className="border-l-2 border-gray-200 dark:border-gray-700 pl-3 py-1"
                        style={{ paddingLeft: `${(h.level - 1) * 1}rem` }}
                      >
                        <a
                          href={`#${h.id}`}
                          onClick={(e) => {
                            e.preventDefault()
                            scrollTo(h.id)
                          }}
                          className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 no-underline transition-colors block"
                        >
                          {h.text}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
            <motion.div
              ref={contentRef}
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-violet-600 dark:prose-a:text-violet-400 prose-img:rounded-xl"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.8, delay: 0.8 }
              }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="[&_h1>a]:no-underline [&_h2>a]:no-underline [&_h3>a]:no-underline [&_h4>a]:no-underline"
              />
            </motion.div>
          </article>
          {/* Fixed sticky container stays on screen */}
          <aside className="lg:col-span-1 flex flex-col">
            <div className="sticky top-24 self-start">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
                  Enquire Now
                </h3>
                <ContactForm />
              </div>
            </div>
          </aside>
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Related Posts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/blogs/${rp.slug}`}
                  className="block group"
                >
                  <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-50 dark:bg-gray-800">
                    <img
                      src={rp.cover}
                      alt={rp.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-violet-600 line-clamp-2">
                        {rp.title}
                      </h4>
                      <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {rp.date}
                        <span className="mx-1">•</span>
                        {rp.readTime}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

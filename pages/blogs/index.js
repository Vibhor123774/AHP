'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Calendar,
  ArrowRight,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Footer from '../../components/footer'
import Navbar from '../../components/navbar'
import Head from 'next/head'

// Loading Shimmer Components
const BlogCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
    <div className="h-56 bg-gray-200 dark:bg-gray-700"></div>
    <div className="p-5">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  </div>
)

const TagSkeleton = () => (
  <div className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse">
    <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
  </div>
)

const SearchSkeleton = () => (
  <div className="relative max-w-sm mx-auto animate-pulse">
    <div className="w-full h-9 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
  </div>
)

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [blogPosts, setBlogPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const postsPerPage = 9

  const blogListRef = useRef(null)
  const canonicalUrl = `https://www.assignmentshelpprovider.com/blogs/`
  
  // Calculate the current posts to display based on pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const res = await fetch('/api/get-blog-summaries')
        if (!res.ok) {
          throw new Error(`Failed to fetch blogs: ${res.status}`)
        }
        
        const data = await res.json()

        if (Array.isArray(data)) {
          const enriched = data.map((blog) => ({
            ...blog,
            date: new Date(blog.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            authorName: 'TEAM AHP',
            authorAvatar: blog.author_image || '/default-avatar.png',
            slug: blog.slug,
            readTime: blog.reading_time
              ? `${blog.reading_time} min read`
              : '7 min read'
          }))
          setBlogPosts(enriched)
        } else {
          throw new Error('Invalid data format received')
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchBlogs()
  }, [])

  // Filter posts whenever the search term, selected tag, or blog posts change
  useEffect(() => {
    if (loading) return // Don't filter while loading
    
    const filtered = blogPosts.filter((post) => {
      const matchesSearch =
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTag = selectedTag === '' || post.tags?.includes(selectedTag)
      return matchesSearch && matchesTag
    })

    setFilteredPosts(filtered)
    // Reset to first page when filters change
    setCurrentPage(1)
  }, [searchTerm, selectedTag, blogPosts, loading])

  const allTags = [...new Set(blogPosts.flatMap((post) => post.tags || []))]

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)

    // Scroll to top of the blog-list ref
    if (typeof window !== 'undefined' && blogListRef.current) {
      const topOffset = blogListRef.current.offsetTop - 100
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-gray-950 text-gray-900 dark:text-white flex flex-col">
      <Head>
        <link rel="canonical" href={canonicalUrl} />
        <title>AHP - Blog</title>
        <meta name="description" content="Read the latest blogs and insights from TEAM AHP on technology, assignments, and academic help." />
        <meta name="keywords" content="blogs, technology, assignments, academic help, education" />
      </Head>

      {/* Sticky wrapper for both Navbar + Header */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <Navbar />

        <header className="py-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-semibold mb-1 text-gray-900 dark:text-white"
          >
            Blogs
          </motion.h1>
          <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">
            Tech, code & insights from TEAM AHP
          </p>
          
          {loading ? (
            <SearchSkeleton />
          ) : (
            <div className="relative max-w-sm mx-auto">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full pl-10 pr-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-900 dark:text-white shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </header>
      </div>

      {/* Main scrollable content */}
      <main
        ref={blogListRef}
        id="blog-list"
        className="flex-1 overflow-y-auto max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {loading ? (
            // Loading skeleton for tags
            <>
              <div className="px-4 py-2 bg-indigo-200 dark:bg-indigo-700 rounded-full animate-pulse">
                <div className="h-4 w-20 bg-indigo-300 dark:bg-indigo-600 rounded"></div>
              </div>
              {[...Array(6)].map((_, i) => (
                <TagSkeleton key={i} />
              ))}
            </>
          ) : (
            <>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                  selectedTag === ''
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                onClick={() => setSelectedTag('')}
              >
                All Topics
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                    selectedTag === tag
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </>
          )}
        </div>

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
                Failed to Load Blogs
              </h3>
              <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Posts grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            // Loading skeleton for blog cards
            [...Array(9)].map((_, i) => <BlogCardSkeleton key={i} />)
          ) : (
            currentPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (currentPosts.indexOf(post) % 3) }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/blogs/${post.slug}`} className="group block h-full">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.cover_image_url || '/default-blog-cover.jpg'}
                      alt={post.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {post.tags?.[0] && (
                      <span className="absolute top-3 right-3 bg-indigo-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                        {post.tags[0]}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-500 transition line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm mb-4 line-clamp-3 text-gray-600 dark:text-gray-300">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <span className="flex items-center group-hover:text-indigo-500 transition">
                        Read more <ArrowRight className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>

        {/* No posts found */}
        {!loading && !error && filteredPosts.length === 0 && blogPosts.length > 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search terms or filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedTag('')
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex justify-center items-center space-x-3"
          >
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="p-2 disabled:text-gray-300 hover:text-indigo-500 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded transition ${
                  currentPage === i + 1
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="p-2 disabled:text-gray-300 hover:text-indigo-500 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}
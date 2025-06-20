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
export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [blogPosts, setBlogPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 9

  const blogListRef = useRef(null)
  const baseUrl = 'https://assignmentshelpprovider.com'
  const canonicalUrl = `${baseUrl}/blogs`
  // Calculate the current posts to display based on pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/get-blog-summaries')
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
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      }
    }
    fetchBlogs()
  }, [])

  // Filter posts whenever the search term, selected tag, or blog posts change
  useEffect(() => {
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
  }, [searchTerm, selectedTag, blogPosts])

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
        <meta name="blogs" content={'blogs'} />
      </Head>
      {/* Sticky wrapper for both Navbar + Header */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <Navbar />

        <header className="py-4 text-center">
          {' '}
          {/* reduced py from 8 to 4 */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-semibold mb-1 text-gray-900 dark:text-white" // smaller font size and margin
          >
            Blogs
          </motion.h1>
          <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">
            {' '}
            {/* smaller font and margin */}
            Tech, code & insights from TEAM AHP
          </p>
          <div className="relative max-w-sm mx-auto">
            {' '}
            {/* smaller max-width */}
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />{' '}
            {/* smaller icon */}
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-900 dark:text-white shadow-sm" // smaller padding and font
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
        </div>

        {/* Posts grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-100 dark:border-gray-700"
            >
              <Link href={`/blogs/${post.slug}`} className="group block h-full">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.cover_image_url || '/default-blog-cover.jpg'}
                    alt={post.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  {post.tags?.[0] && (
                    <span className="absolute top-3 right-3 bg-indigo-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      {post.tags[0]}
                    </span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-indigo-500 transition">
                    {post.title}
                  </h3>
                  {post.meta_description && (
                    <p className="text-sm mb-4 line-clamp-2 text-gray-600 dark:text-gray-300">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <span className="flex items-center">
                      Read more <ArrowRight className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* No posts */}
        {filteredPosts.length === 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow"
              >
                <div className="h-40 w-full rounded-md bg-gray-200 dark:bg-gray-700 mb-4"></div>
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center items-center space-x-3">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="p-2 disabled:text-gray-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${
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
              className="p-2 disabled:text-gray-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

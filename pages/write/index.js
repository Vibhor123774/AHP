'use client'

import React, { useState, useEffect } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Blockquote from '@tiptap/extension-blockquote'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Link from '@tiptap/extension-link'
import { common, createLowlight } from 'lowlight'
import { toast } from 'sonner'
import Head from 'next/head'
import {
  Loader2,
  Upload,
  Plus,
  X,
  Bold,
  Italic,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  MinusSquare,
  Image as ImageIcon,
  Table as TableIcon,
  Clock,
  Link as LinkIcon,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Tag,
  ChevronLeft,
  Save,
  FileText
} from 'lucide-react'

import { supabase } from '../../lib/supabase'
import { uploadImageToSupabase } from '../../lib/uploadImage'

export default function AdminPage() {
  // ── PASSCODE SETUP ───────────────────────────────────────────
  const PASSCODE = 'AHPX2025' // <-- Replace with your actual passcode
  const [authenticated, setAuthenticated] = useState(false)
  const [inputPasscode, setInputPasscode] = useState('')
  const [authenticating, setAuthenticating] = useState(false)

  const handlePasscodeSubmit = () => {
    if (!inputPasscode.trim()) {
      toast.error('Please enter the passcode')
      return
    }
    setAuthenticating(true)
    if (inputPasscode === PASSCODE) {
      setAuthenticated(true)
      toast.success('Access granted')
    } else {
      toast.error('Incorrect passcode')
    }
    setAuthenticating(false)
    setInputPasscode('')
  }

  // ── State for blog list ───────────────────────────────────
  const [blogs, setBlogs] = useState([])
  const [loadingBlogs, setLoadingBlogs] = useState(true)

  // ── State for current view ─────────────────────────────────
  // "list" = show all blogs; "add" = create new; "edit" = edit existing
  const [currentView, setCurrentView] = useState('list')
  const [editingBlog, setEditingBlog] = useState(null)

  // ── Form state ─────────────────────────────────────────────
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState('')
  const [coverImage, setCoverImage] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [readingTime, setReadingTime] = useState('7')

  // ── Initialize TipTap editor ───────────────────────────────
  const lowlight = createLowlight(common)
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false
        }
      }),
      Image,
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
        HTMLAttributes: {
          class:
            'blog-link text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline',
          rel: 'noopener noreferrer',
          target: '_blank'
        }
      }),
      Placeholder.configure({
        placeholder: 'Start writing your blog post here...'
      }),
      CodeBlockLowlight.configure({ lowlight }),
      Blockquote,
      BulletList.configure({
        HTMLAttributes: {
          class: 'blog-bullet-list'
        }
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'blog-ordered-list'
        }
      }),
      ListItem,
      HorizontalRule,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg prose-slate dark:prose-invert focus:outline-none'
      }
    }
  })

  // ── Load blogs on mount (only after authentication) ─────────────────────────────────────
  useEffect(() => {
    if (authenticated) {
      fetchBlogs()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated])

  const fetchBlogs = async () => {
    setLoadingBlogs(true)
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setBlogs(data || [])
    } catch (error) {
      toast.error('Failed to fetch blogs')
      console.error('Error fetching blogs:', error)
    } finally {
      setLoadingBlogs(false)
    }
  }

  // ── Reset form to “empty” ──────────────────────────────────
  const resetForm = () => {
    setTitle('')
    setExcerpt('')
    setMetaTitle('')
    setMetaDescription('')
    setTags([])
    setNewTag('')
    setCoverImage(null)
    setReadingTime('7')
    setEditingBlog(null)
    editor?.commands.clearContent()
  }

  // ── Switch to “Add New” view ───────────────────────────────
  const handleAddNew = () => {
    resetForm()
    setCurrentView('add')
  }

  // ── Switch back to “List” view ─────────────────────────────
  const handleBackToList = () => {
    resetForm()
    setCurrentView('list')
  }

  // ── When the user clicks “Edit” on a blog ─────────────────
  const handleEditBlog = (blog) => {
    setEditingBlog(blog)
    setTitle(blog.title || '')
    setExcerpt(blog.excerpt || '')
    setMetaTitle(blog.meta_title || '')
    setMetaDescription(blog.meta_description || '')
    setTags(Array.isArray(blog.tags) ? blog.tags : [])
    setCoverImage(blog.cover_image_url || null)
    setReadingTime(blog.reading_time?.toString() || '7')

    // Slight delay to ensure editor is ready
    setTimeout(() => {
      if (editor && blog.content) {
        editor.commands.setContent(blog.content)
      }
    }, 100)

    setCurrentView('edit')
  }

  // ── Delete a blog ──────────────────────────────────────────
  const handleDeleteBlog = async (blogId, blogTitle) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`
      )
    ) {
      return
    }

    try {
      const { error } = await supabase.from('blogs').delete().eq('id', blogId)

      if (error) throw error

      toast.success('Blog deleted successfully')
      fetchBlogs()
    } catch (error) {
      toast.error('Failed to delete blog')
      console.error('Error deleting blog:', error)
    }
  }

  // ── Tag management ─────────────────────────────────────────
  const handleTagAdd = () => {
    const t = newTag.trim()
    if (!t) return
    if (tags.includes(t)) {
      toast.error('Tag already exists')
    } else if (tags.length >= 5) {
      toast.error('Maximum 5 tags')
    } else {
      setTags([...tags, t])
    }
    setNewTag('')
  }

  const handleTagRemove = (t) => setTags(tags.filter((x) => x !== t))

  // ── Upload cover image to Supabase storage ─────────────────
  const handleCoverImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Select a valid image')
      return
    }
    const url = await uploadImageToSupabase(file, 'cover-images')
    if (url) {
      setCoverImage(url)
      toast.success('Cover image uploaded')
    }
  }

  // ── Insert image *inside* the Tiptap editor ───────────────
  const handleInsertImage = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (file) {
        const url = await uploadImageToSupabase(file, 'blog-images')
        if (url) {
          editor?.chain().focus().setImage({ src: url }).run()
          toast.success('Image inserted')
        }
      }
    }
    input.click()
  }

  // ── Add a link around selected text in the editor ──────────
  const handleAddLink = () => {
    if (!editor) return
    const { state } = editor
    const { from, to, empty } = state.selection

    if (empty || from === to) {
      toast.error('Please select the text you want to link.')
      return
    }

    const url = window.prompt('Enter URL:')
    if (!url) return

    const validatedUrl =
      url.startsWith('http://') || url.startsWith('https://')
        ? url
        : `https://${url}`

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: validatedUrl })
      .run()

    // Move cursor to end of link immediately after inserting
    setTimeout(() => {
      editor.chain().focus().setTextSelection(to).unsetMark('link').run()
    }, 0)

    toast.success('Link added')
  }

  // ── Create or Update blog on “Publish” / “Update” ──────────
  const handleSubmit = async () => {
    // Basic validation
    if (!title.trim()) {
      toast.error('Title is required')
      return
    }
    if (!metaTitle.trim()) {
      toast.error('Meta title is required')
      return
    }
    if (!metaDescription.trim()) {
      toast.error('Meta description is required')
      return
    }
    if (!editor || editor.isEmpty) {
      toast.error('Content cannot be empty')
      return
    }

    setIsSubmitting(true)
    const blogContent = editor.getHTML()

    try {
      if (editingBlog) {
        // ── Update existing blog ─────────────────────────────────
        const updateData = {
          title: title.trim(),
          excerpt: excerpt.trim(),
          tags: tags,
          content: blogContent,
          cover_image_url: coverImage,
          reading_time: parseInt(readingTime) || 7,
          meta_title: metaTitle.trim(),
          meta_description: metaDescription.trim()
        }

        const { data, error } = await supabase
          .from('blogs')
          .update(updateData)
          .eq('id', editingBlog.id)
          .select()

        if (error) {
          console.error('Supabase update error:', error)
          throw error
        }

        if (!data || data.length === 0) {
          // Double-check if the blog still exists
          const { data: checkData, error: checkError } = await supabase
            .from('blogs')
            .select('id')
            .eq('id', editingBlog.id)

          if (checkError) {
            console.error('Error checking blog existence:', checkError)
            throw new Error('Failed to verify blog update')
          }
          if (!checkData || checkData.length === 0) {
            throw new Error('Blog not found—it may have been deleted')
          }
        }

        toast.success('Blog updated successfully!')
      } else {
        // ── Create a brand-new blog ───────────────────────────────
        const baseSlug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')

        const slug = `${baseSlug}`

        const insertData = {
          title: title.trim(),
          slug,
          excerpt: excerpt.trim(),
          tags: tags,
          content: blogContent,
          cover_image_url: coverImage,
          reading_time: parseInt(readingTime) || 7,
          meta_title: metaTitle.trim(),
          meta_description: metaDescription.trim()
        }

        const { data, error } = await supabase
          .from('blogs')
          .insert(insertData)
          .select()

        if (error) {
          console.error('Supabase insert error:', error)
          throw error
        }

        toast.success('Blog published successfully!')
      }

      // Refresh list and go back to “list” view
      await fetchBlogs()
      handleBackToList()
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      if (error.message?.includes('duplicate key')) {
        toast.error('A blog with this title already exists')
      } else if (error.message?.includes('not found')) {
        toast.error('Blog not found—it may have been deleted')
      } else if (error.message?.includes('permission')) {
        toast.error("You don't have permission to perform this action")
      } else {
        toast.error(
          editingBlog ? 'Failed to update blog' : 'Failed to publish blog'
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Format created_at timestamp ────────────────────────────
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

  // ── Render passcode prompt if not authorized ─────────────────
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-blue-50 dark:bg-slate-800 flex items-center justify-center px-4">
        <Head>
        <title>Admin Dashboard</title>
        <meta name="adminDashboard" content={'Blog post'} />
      </Head>
        <div className="w-full max-w-md bg-white dark:bg-slate-700 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Enter Passcode
          </h2>
          <input
            type="password"
            value={inputPasscode}
            onChange={(e) => setInputPasscode(e.target.value)}
            placeholder="Passcode"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          />
          <button
            onClick={handlePasscodeSubmit}
            disabled={authenticating}
            className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium"
          >
            {authenticating ? 'Verifying...' : 'Submit'}
          </button>
        </div>
      </div>
    )
  }


  const renderBlogList = () => (
    <div className="space-y-6">
      <Head>
        <title>Admin Dashboard</title>
        <meta name="adminDashboard" content={'Blog post'} />
      </Head>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Blog Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your blog posts
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add New Blog
        </button>
      </div>

      {loadingBlogs ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No blogs yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Get started by creating your first blog post.
          </p>
          <button
            onClick={handleAddNew}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium"
          >
            Create First Blog
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                {blog.cover_image_url && (
                  <img
                    src={blog.cover_image_url}
                    alt={blog.title}
                    className="w-24 h-16 object-cover rounded-md flex-shrink-0"
                  />
                )}
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-grow min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 truncate">
                        {blog.title}
                      </h3>
                      {blog.excerpt && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                          {blog.excerpt}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(blog.created_at)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {blog.reading_time || 7} min read
                        </div>
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Tag className="h-4 w-4" />
                            {blog.tags.slice(0, 2).join(', ')}
                            {blog.tags.length > 2 &&
                              ` +${blog.tags.length - 2}`}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEditBlog(blog)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                        title="Edit blog"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id, blog.title)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-md transition-colors"
                        title="Delete blog"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  // ── Render the “Add/Edit Blog” form ────────────────────────
  const renderBlogForm = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToList}
            className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-600 rounded-md transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h1>
            {editingBlog && (
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Editing: {editingBlog.title}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div>
        {coverImage ? (
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={coverImage}
              className="w-full h-64 object-cover"
              alt="Cover"
            />
            <button
              onClick={() => setCoverImage(null)}
              className="absolute top-3 right-3 p-1.5 bg-black bg-opacity-70 rounded-full"
              aria-label="Remove cover image"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-lg cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Add a cover image
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                (Recommended: 1200 × 630px)
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverImageUpload}
            />
          </label>
        )}
      </div>

      {/* Title Input */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title your post..."
        className="w-full text-3xl font-bold bg-transparent border-none resize-none focus:outline-none text-gray-900 dark:text-white p-0"
      />

      {/* SEO Meta Fields */}
      <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Search className="h-5 w-5" />
          SEO Meta Information
        </h3>

        {/* Meta Title */}
        <div className="mb-4">
          <label
            htmlFor="metaTitle"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5 block"
          >
            Meta Title <span className="text-red-500">*</span>
          </label>
          <input
            id="metaTitle"
            type="text"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            placeholder="SEO optimized title for search engines (50-80 characters)"
            maxLength="80"
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-600 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {metaTitle.length}/80 characters
          </div>
        </div>

        {/* Meta Description */}
        <div>
          <label
            htmlFor="metaDescription"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5 block"
          >
            Meta Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="metaDescription"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            rows={3}
            placeholder="Brief description for search engines (140-200 characters)"
            maxLength="200"
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-600 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            required
          />
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {metaDescription.length}/200 characters
          </div>
        </div>
      </div>

      {/* Editor Toolbar */}
      {editor && (
        <div className="flex gap-1 flex-wrap p-1 bg-white dark:bg-slate-700 rounded-md border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 ${
              editor.isActive('bold') ? 'bg-gray-200 dark:bg-slate-600' : ''
            }`}
          >
            <Bold className="h-4 w-4 text-gray-800 dark:text-gray-100" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 ${
              editor.isActive('italic') ? 'bg-gray-200 dark:bg-slate-600' : ''
            }`}
          >
            <Italic className="h-4 w-4 text-gray-800 dark:text-gray-100" />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-gray-200 dark:bg-slate-600'
                : ''
            }`}
          >
            <Heading2 className="h-4 w-4 text-gray-800 dark:text-gray-100" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 ${
              editor.isActive('bulletList')
                ? 'bg-gray-200 dark:bg-slate-600'
                : ''
            }`}
          >
            <List className="h-4 w-4 text-gray-800 dark:text-gray-100" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 ${
              editor.isActive('orderedList')
                ? 'bg-gray-200 dark:bg-slate-600'
                : ''
            }`}
          >
            <ListOrdered className="h-4 w-4 text-gray-800 dark:text-gray-100" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 ${
              editor.isActive('blockquote')
                ? 'bg-gray-200 dark:bg-slate-600'
                : ''
            }`}
          >
            <Quote className="h-4 w-4 text-gray-800 dark:text-gray-100" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 ${
              editor.isActive('codeBlock')
                ? 'bg-gray-200 dark:bg-slate-600'
                : ''
            }`}
          >
            <Code className="h-4 w-4 text-gray-800 dark:text-gray-100" />
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600"
          >
            <MinusSquare className="h-4 w-4 text-gray-800 dark:text-gray-100" />
          </button>
          <button
            onClick={handleInsertImage}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600"
          >
            <ImageIcon className="h-4 w-4 text-gray-800 dark:text-gray-100" />
          </button>
          <button
            onClick={handleAddLink}
            className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600 ${
              editor.isActive('link') ? 'bg-gray-200 dark:bg-slate-600' : ''
            }`}
            title="Add link"
          >
            <LinkIcon className="h-4 w-4 text-gray-800 dark:text-gray-100" />
          </button>
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
                .run()
            }
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600"
          >
            <TableIcon className="h-4 w-4 text-gray-800 dark:text-gray-100" />
          </button>
        </div>
      )}

      {/* Editor Content */}
      <div className="bg-white dark:bg-slate-700 rounded-lg p-5 shadow-sm border border-gray-200 dark:border-gray-700">
        {editor && (
          <EditorContent
            editor={editor}
            className="min-h-[300px] prose prose-neutral dark:prose-invert max-w-none text-gray-900 dark:text-gray-50"
          />
        )}
      </div>

      {/* Reading Time Input */}
      <div>
        <label
          htmlFor="readingTime"
          className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5 flex items-center gap-1.5"
        >
          <Clock className="h-4 w-4" /> Reading Time (minutes)
        </label>
        <div className="relative">
          <input
            id="readingTime"
            type="number"
            min="1"
            max="60"
            value={readingTime}
            onChange={(e) => setReadingTime(e.target.value)}
            placeholder="7"
            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-600 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 text-sm">
            min
          </span>
        </div>
      </div>

      {/* Post Summary */}
      <div>
        <label
          htmlFor="excerpt"
          className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5 block"
        >
          Post Summary
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          placeholder="Write a brief summary of your post..."
          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-600 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
        />
      </div>

      {/* Tags Section */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1.5 block">
          Tags
        </label>

        <div className="flex flex-wrap gap-2 mb-3">
          {tags.length === 0 && (
            <span className="text-sm italic text-gray-600 dark:text-gray-300">
              Add up to 5 tags to help readers discover your post
            </span>
          )}

          {tags.map((t) => (
            <div
              key={t}
              className="flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 text-sm"
            >
              {t}
              <button
                onClick={() => handleTagRemove(t)}
                className="ml-2 text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100"
                aria-label={`Remove ${t} tag`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            placeholder="Enter a tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleTagAdd()
              }
            }}
            className="flex-grow px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-600 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleTagAdd}
            disabled={!newTag.trim() || tags.length >= 5}
            className={`px-4 py-2 rounded-md flex items-center border border-gray-300 dark:border-gray-600 shrink-0 ${
              !newTag.trim() || tags.length >= 5
                ? 'bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white hover:bg-gray-50 text-gray-700 dark:bg-slate-600 dark:hover:bg-slate-700 dark:text-gray-100'
            }`}
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
        <div className="flex gap-4">
          <button
            onClick={handleBackToList}
            className="px-6 py-3 rounded-md font-medium border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              !title.trim() ||
              !metaTitle.trim() ||
              !metaDescription.trim()
            }
            className={`flex-grow px-6 py-3 rounded-md font-medium ${
              isSubmitting ||
              !title.trim() ||
              !metaTitle.trim() ||
              !metaDescription.trim()
                ? 'bg-green-400 dark:bg-green-600/50 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600'
            } text-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {editingBlog ? 'Updating...' : 'Publishing...'}
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Save className="mr-2 h-4 w-4" />
                {editingBlog ? 'Update Blog' : 'Publish Blog'}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-slate-800 pt-16 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {currentView === 'list' && renderBlogList()}
        {(currentView === 'add' || currentView === 'edit') && renderBlogForm()}
      </div>
    </div>
  )
}

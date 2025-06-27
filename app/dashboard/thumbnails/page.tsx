'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Header } from '../../../components/layout/Header'
import { DashboardSidebar } from '../../../components/dashboard/DashboardSidebar'
import { Button } from '../../../components/ui/Button'
import { createClient } from '../../../lib/supabase'
import { 
  Image as ImageIcon, 
  Download, 
  Eye, 
  TrendingUp, 
  Calendar,
  Filter,
  Grid3X3,
  List,
  Plus
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Thumbnail {
  id: number
  title: string
  niche: string
  thumbnail_url: string
  ctr_score: number
  mobile_score: number
  emotion_used: string
  created_at: string
  optimization_suggestions: any
}

export default function ThumbnailsPage() {
  const { data: session, status } = useSession()
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filter, setFilter] = useState<string>('all')

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark-300">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  useEffect(() => {
    fetchThumbnails()
  }, [session])

  const fetchThumbnails = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('thumbnails')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching thumbnails:', error)
        toast.error('Failed to load thumbnails')
        return
      }

      setThumbnails(data || [])
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to load thumbnails')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (thumbnailUrl: string, title: string) => {
    try {
      const response = await fetch(thumbnailUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_thumbnail.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('Thumbnail downloaded!')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Failed to download thumbnail')
    }
  }

  const filteredThumbnails = thumbnails.filter(thumbnail => {
    if (filter === 'all') return true
    return thumbnail.niche.toLowerCase() === filter.toLowerCase()
  })

  const uniqueNiches = Array.from(new Set(thumbnails.map(t => t.niche)))

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950">
        <Header />
        <div className="flex pt-16">
          <DashboardSidebar />
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-dark-300">Loading your thumbnails...</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      
      <div className="flex pt-16">
        <DashboardSidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center">
                  <ImageIcon className="w-8 h-8 text-primary-500 mr-3" />
                  My Thumbnails
                </h1>
                <p className="text-dark-300">
                  Manage and analyze your AI-generated thumbnails
                </p>
              </div>
              
              <Link href="/dashboard/generate">
                <Button className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Generate New</span>
                </Button>
              </Link>
            </div>

            {thumbnails.length === 0 ? (
              // Empty State
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ImageIcon className="w-12 h-12 text-dark-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4">No thumbnails yet</h2>
                <p className="text-dark-400 mb-8 max-w-md mx-auto">
                  Start creating high-converting thumbnails with our AI-powered generator. 
                  Your generated thumbnails will appear here with performance insights.
                </p>
                <Link href="/dashboard/generate">
                  <Button size="lg">
                    Generate Your First Thumbnail
                    <Plus className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {/* Filters and View Controls */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Filter className="w-5 h-5 text-dark-400" />
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="all">All Niches</option>
                        {uniqueNiches.map(niche => (
                          <option key={niche} value={niche}>{niche}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="text-sm text-dark-400">
                      {filteredThumbnails.length} thumbnail{filteredThumbnails.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-primary-500 text-white' 
                          : 'bg-dark-800 text-dark-400 hover:text-white'
                      }`}
                    >
                      <Grid3X3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-primary-500 text-white' 
                          : 'bg-dark-800 text-dark-400 hover:text-white'
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Thumbnails Grid/List */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredThumbnails.map((thumbnail) => (
                      <div key={thumbnail.id} className="glass rounded-xl overflow-hidden group hover:scale-105 transition-transform">
                        {/* Thumbnail Image */}
                        <div className="aspect-video bg-dark-800 relative">
                          <img
                            src={thumbnail.thumbnail_url}
                            alt={thumbnail.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder-thumbnail.jpg'
                            }}
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDownload(thumbnail.thumbnail_url, thumbnail.title)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Thumbnail Info */}
                        <div className="p-4">
                          <h3 className="font-semibold mb-2 line-clamp-2">{thumbnail.title}</h3>
                          
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-1 rounded">
                              {thumbnail.niche}
                            </span>
                            <span className="text-xs text-dark-400">
                              {new Date(thumbnail.created_at).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-400">
                                {thumbnail.ctr_score.toFixed(1)}%
                              </div>
                              <div className="text-xs text-dark-400">CTR Score</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-400">
                                {thumbnail.mobile_score.toFixed(1)}%
                              </div>
                              <div className="text-xs text-dark-400">Mobile</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredThumbnails.map((thumbnail) => (
                      <div key={thumbnail.id} className="glass rounded-xl p-6 flex items-center space-x-6">
                        {/* Thumbnail */}
                        <div className="w-32 h-18 bg-dark-800 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={thumbnail.thumbnail_url}
                            alt={thumbnail.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder-thumbnail.jpg'
                            }}
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{thumbnail.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-dark-400 mb-2">
                            <span className="bg-primary-500/20 text-primary-400 px-2 py-1 rounded text-xs">
                              {thumbnail.niche}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(thumbnail.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-400">
                              {thumbnail.ctr_score.toFixed(1)}%
                            </div>
                            <div className="text-xs text-dark-400">CTR</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-400">
                              {thumbnail.mobile_score.toFixed(1)}%
                            </div>
                            <div className="text-xs text-dark-400">Mobile</div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownload(thumbnail.thumbnail_url, thumbnail.title)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
} 
'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Header } from '../../../components/layout/Header'
import { DashboardSidebar } from '../../../components/dashboard/DashboardSidebar'
import { Button } from '../../../components/ui/Button'
import { 
  Wand2, 
  Upload, 
  Palette, 
  Smile, 
  Target,
  ArrowRight,
  Loader2
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function GeneratePage() {
  const { data: session, status } = useSession()
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    videoTitle: '',
    niche: '',
    faceImage: null as File | null,
    emotion: 'excited',
    primaryColor: '#f59e0b',
    secondaryColor: '#3b82f6'
  })

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size must be less than 5MB')
        return
      }
      setFormData(prev => ({ ...prev, faceImage: file }))
    }
  }

  // Helper function to convert file to base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.videoTitle || !formData.niche) {
      toast.error('Please fill in all required fields')
      return
    }

    if (session.user.creditsRemaining <= 0) {
      toast.error('No credits remaining. Please upgrade your plan.')
      return
    }

    setIsGenerating(true)
    
    try {
      // Prepare data for n8n webhook (matching the workflow structure)
      const webhookPayload = {
        body: {
          title: formData.videoTitle,
          niche: formData.niche,
          emotion: formData.emotion,
          brandColor: formData.primaryColor,
          channelUrl: '', // Optional
          faceImage: formData.faceImage ? await convertFileToBase64(formData.faceImage) : null,
        }
      }

      // Call n8n webhook with JWT authentication
      const response = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL!, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      })

      if (!response.ok) {
        throw new Error('Failed to generate thumbnail')
      }

      const result = await response.json()
      
      toast.success('Thumbnail generated successfully!')
      
      // TODO: Redirect to results page or update UI with generated thumbnails
      console.log('Generation result:', result)
      
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Failed to generate thumbnail. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const emotions = [
    { value: 'excited', label: '😃 Excited', color: 'bg-yellow-500' },
    { value: 'surprised', label: '😲 Surprised', color: 'bg-blue-500' },
    { value: 'shocked', label: '😱 Shocked', color: 'bg-red-500' },
    { value: 'happy', label: '😊 Happy', color: 'bg-green-500' },
    { value: 'confident', label: '😎 Confident', color: 'bg-purple-500' },
  ]

  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      
      <div className="flex pt-16">
        <DashboardSidebar />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <Wand2 className="w-8 h-8 text-primary-500 mr-3" />
                Generate AI Thumbnail
              </h1>
              <p className="text-dark-300">
                Create high-converting thumbnails optimized for your niche with AI-powered analysis
              </p>
            </div>

            {/* Credits Info */}
            <div className="glass rounded-xl p-4 mb-8 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="font-semibold">Credits Remaining: {session.user.creditsRemaining}</p>
                  <p className="text-sm text-dark-400">
                    {session.user.planType === 'free' ? 'Free Plan' : 'Pro Plan'}
                  </p>
                </div>
              </div>
              {session.user.planType === 'free' && session.user.creditsRemaining <= 2 && (
                <Button size="sm" variant="outline">
                  Upgrade to Pro
                </Button>
              )}
            </div>

            {/* Generation Form */}
            <form onSubmit={handleGenerate} className="space-y-8">
              {/* Video Details */}
              <div className="glass rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    1
                  </div>
                  Video Details
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      Video Title *
                    </label>
                    <input
                      type="text"
                      value={formData.videoTitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, videoTitle: e.target.value }))}
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="e.g., How to Make $10,000 Per Month Online"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">
                      Niche/Category *
                    </label>
                    <input
                      type="text"
                      value={formData.niche}
                      onChange={(e) => setFormData(prev => ({ ...prev, niche: e.target.value }))}
                      className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="e.g., Business, Tech, Gaming, Lifestyle"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Face Image Upload */}
              <div className="glass rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    2
                  </div>
                  Face Image (Optional)
                </h2>
                
                <div className="border-2 border-dashed border-dark-600 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-dark-500 mx-auto mb-4" />
                  <p className="text-dark-300 mb-2">Upload your face image for personalized thumbnails</p>
                  <p className="text-sm text-dark-500 mb-4">PNG, JPG up to 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="face-upload"
                  />
                  <label htmlFor="face-upload">
                    <Button type="button" variant="outline" size="sm">
                      Choose File
                    </Button>
                  </label>
                  {formData.faceImage && (
                    <p className="text-primary-400 mt-2 text-sm">
                      ✓ {formData.faceImage.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Emotion & Style */}
              <div className="glass rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    3
                  </div>
                  Emotion & Style
                </h2>
                
                <div className="space-y-6">
                  {/* Emotion Selection */}
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-3">
                      Target Emotion
                    </label>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                      {emotions.map((emotion) => (
                        <button
                          key={emotion.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, emotion: emotion.value }))}
                          className={`p-3 rounded-lg border transition-all ${
                            formData.emotion === emotion.value
                              ? 'border-primary-500 bg-primary-500/20 text-primary-400'
                              : 'border-dark-600 bg-dark-800 text-dark-300 hover:border-dark-500'
                          }`}
                        >
                          <Smile className="w-5 h-5 mx-auto mb-1" />
                          <div className="text-xs">{emotion.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Brand Colors */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">
                        Primary Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={formData.primaryColor}
                          onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                          className="w-12 h-12 rounded-lg border border-dark-600 bg-dark-800"
                        />
                        <input
                          type="text"
                          value={formData.primaryColor}
                          onChange={(e) => setFormData(prev => ({ ...prev, primaryColor: e.target.value }))}
                          className="flex-1 px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">
                        Secondary Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={formData.secondaryColor}
                          onChange={(e) => setFormData(prev => ({ ...prev, secondaryColor: e.target.value }))}
                          className="w-12 h-12 rounded-lg border border-dark-600 bg-dark-800"
                        />
                        <input
                          type="text"
                          value={formData.secondaryColor}
                          onChange={(e) => setFormData(prev => ({ ...prev, secondaryColor: e.target.value }))}
                          className="flex-1 px-3 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isGenerating || !formData.videoTitle || !formData.niche}
                  size="lg"
                  className="px-8"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate Thumbnail
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
} 
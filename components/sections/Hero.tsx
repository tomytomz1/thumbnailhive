'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/Button'
import { SignUpModal } from '../ui/SignUpModal'
import { Play, Zap, TrendingUp, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const Hero: React.FC = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const router = useRouter()

  const handleSignUpSuccess = (email: string) => {
    // Redirect to sign-in page after successful sign-up
    router.push('/auth/signin?signup=true')
  }

  return (
    <>
      <section id="hero" className="relative min-h-screen flex items-center justify-center gradient-bg pt-20 pb-20 overflow-visible">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-primary-600/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Trust Indicators */}
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-dark-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>AI-Powered Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-primary-500" />
              <span>Real CTR Prediction</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-primary-500" />
              <span>Advanced Technology</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Generate <span className="gradient-text">High-Converting</span><br />
            YouTube Thumbnails with AI
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-dark-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Leverage advanced niche intelligence, competitor analysis, and CTR prediction 
            to create thumbnails that <strong className="text-primary-400">actually get clicked</strong>
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 max-w-5xl mx-auto">
            <div className="glass rounded-xl p-4 md:p-6 text-center">
              <Zap className="w-8 h-8 text-primary-500 mb-3 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">Niche-Optimized</h3>
              <p className="text-dark-400 text-sm">AI analyzes your niche's top performers and trending patterns</p>
            </div>
            <div className="glass rounded-xl p-4 md:p-6 text-center">
              <TrendingUp className="w-8 h-8 text-primary-500 mb-3 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">CTR Prediction</h3>
              <p className="text-dark-400 text-sm">Get accurate click-through rate forecasts before publishing</p>
            </div>
            <div className="glass rounded-xl p-4 md:p-6 text-center">
              <Play className="w-8 h-8 text-primary-500 mb-3 mx-auto" />
              <h3 className="font-semibold text-lg mb-2">A/B Test Ready</h3>
              <p className="text-dark-400 text-sm">Generate multiple variations for optimal performance testing</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-lg px-12 py-4"
              onClick={() => setIsSignUpModalOpen(true)}
            >
              Sign Up & Generate Now
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Technology Indicators */}
          <div className="text-center">
            <p className="text-dark-400 mb-6">Powered by cutting-edge AI technology</p>
            <div className="flex flex-wrap items-center justify-center gap-4 opacity-60">
              <div className="bg-dark-800 px-4 py-2 rounded-lg text-sm font-medium">Machine Learning</div>
              <div className="bg-dark-800 px-4 py-2 rounded-lg text-sm font-medium">Computer Vision</div>
              <div className="bg-dark-800 px-4 py-2 rounded-lg text-sm font-medium">Data Analytics</div>
              <div className="bg-dark-800 px-4 py-2 rounded-lg text-sm font-medium">API Integration</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSuccess={handleSignUpSuccess}
      />
    </>
  )
} 
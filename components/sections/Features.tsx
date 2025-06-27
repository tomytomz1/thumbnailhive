'use client'

import React from 'react'
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Smartphone, 
  Zap, 
  Users, 
  BarChart3, 
  Shield,
  Palette,
  Video
} from 'lucide-react'

export const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "Niche Intelligence",
      description: "AI analyzes your specific niche's top performers, trending patterns, and optimal visual styles",
      highlight: "Smart Analysis"
    },
    {
      icon: Target,
      title: "Competitor Analysis",
      description: "Real-time analysis of viral videos in your niche to identify winning thumbnail strategies",
      highlight: "Competitive Edge"
    },
    {
      icon: TrendingUp,
      title: "CTR Prediction",
      description: "Get accurate click-through rate forecasts before publishing with our ML models",
      highlight: "Data-Driven"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimization",
      description: "Thumbnails optimized for mobile viewing with readability scores and improvement tips",
      highlight: "Mobile-First"
    },
    {
      icon: BarChart3,
      title: "A/B Test Ready",
      description: "Generate multiple variations with unique test IDs for easy performance comparison",
      highlight: "Test & Optimize"
    },
    {
      icon: Palette,
      title: "Brand Consistency",
      description: "Maintain your brand colors, style guidelines, and visual identity across all thumbnails",
      highlight: "Brand-Aware"
    },
    {
      icon: Video,
      title: "Emotion Targeting",
      description: "Choose from various emotions (surprised, excited, shocked) to match your content tone",
      highlight: "Emotion-Driven"
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description: "Generate professional thumbnails in seconds using advanced AI prompt engineering",
      highlight: "Lightning Fast"
    },
    {
      icon: Shield,
      title: "Quota Management",
      description: "Stripe-powered billing with transparent usage tracking and flexible plan options",
      highlight: "Transparent Billing"
    }
  ]

  return (
    <section id="features" className="py-12 md:py-24 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful Features for <span className="gradient-text">Maximum Impact</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Every feature is designed to help you create thumbnails that not only look great 
            but actually drive clicks and grow your channel
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group w-full">
              <div className="glass rounded-2xl p-8 h-full transition-all duration-300 hover:bg-dark-800/50 hover:border-primary-500/30 text-center">
                {/* Feature Badge */}
                <div className="flex flex-col items-center mb-6">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center group-hover:bg-primary-500/30 transition-colors mb-3">
                    <feature.icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-1 rounded-full font-medium">
                    {feature.highlight}
                  </span>
                </div>
                
                {/* Feature Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-dark-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
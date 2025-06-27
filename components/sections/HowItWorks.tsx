'use client'

import React from 'react'
import { MessageSquare, Brain, Wand2, BarChart3, ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Share Your Video Details",
      description: "Simply enter your video title and niche. Optionally add your face image, preferred emotion, and brand colors.",
      details: ["Video title & niche", "Face image (optional)", "Brand colors", "Target emotion"]
    },
    {
      icon: Brain,
      title: "AI Analyzes Your Niche",
      description: "Our AI studies your niche's top performers, trending patterns, and competitor strategies in real-time.",
      details: ["Competitor analysis", "Trending video patterns", "Niche intelligence", "CTR benchmarks"]
    },
    {
      icon: Wand2,
      title: "Generate Optimized Thumbnails",
      description: "AI creates multiple high-converting thumbnail variations using advanced prompt engineering and visual optimization.",
      details: ["Multiple variations", "Niche-optimized design", "Mobile-first approach", "Brand consistency"]
    },
    {
      icon: BarChart3,
      title: "Get Performance Insights",
      description: "Receive CTR predictions, mobile optimization scores, A/B test setup, and actionable improvement tips.",
      details: ["CTR prediction", "Mobile optimization", "A/B test ready", "Heatmap analysis"]
    }
  ]

  return (
    <section id="how-it-works" className="py-12 md:py-24 bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="gradient-text">ThumbnailHive</span> Works
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Our AI-powered system combines niche intelligence, competitor analysis, 
            and performance prediction to create thumbnails that drive results
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500/20 via-primary-500/50 to-primary-500/20 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="glass rounded-2xl p-6 md:p-8 text-center relative z-10 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-primary-500" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-dark-300 mb-6 leading-relaxed">{step.description}</p>
                  
                  {/* Details */}
                  <div className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center text-sm text-dark-400">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></div>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Arrow (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-9 transform -translate-y-1/2 z-20">
                    <ArrowRight className="w-6 h-6 text-primary-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Ready to Transform Your Thumbnails?</h3>
            <p className="text-dark-300 mb-6">
              Experience the power of AI-driven thumbnail optimization designed to maximize your video performance
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                See Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
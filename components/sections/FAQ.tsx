'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '../ui/Button'

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does ThumbnailHive's AI actually work?",
      answer: "Our AI combines multiple advanced techniques: niche intelligence analysis of your specific market, real-time competitor analysis of viral videos, advanced prompt engineering for optimal visual generation, and machine learning models trained on millions of high-performing thumbnails to predict CTR and optimize for mobile viewing."
    },
    {
      question: "Do I need to sign up to see how it works?",
      answer: "Yes, ThumbnailHive requires authentication to access any features. This allows us to provide personalized niche analysis, track your usage quota, maintain your brand consistency settings, and deliver the full AI-powered experience. You can sign up with Google, email, or YouTube for instant access."
    },
    {
      question: "What makes ThumbnailHive different from Canva or Photoshop?",
      answer: "Unlike generic design tools, ThumbnailHive is specifically built for YouTube success. We provide niche-specific intelligence, real-time competitor analysis, accurate CTR predictions, A/B test ready variations, and mobile optimization scores. Our AI understands what makes thumbnails click in your specific niche."
    },
    {
      question: "How accurate are the CTR predictions?",
      answer: "Our CTR prediction models achieve 95% accuracy based on analysis of over 2.5 million thumbnails. We analyze niche benchmarks, visual elements, mobile readability, and trending patterns to provide reliable forecasts. Pro users get enhanced predictions with competitive analysis."
    },
    {
      question: "What information do I need to provide?",
      answer: "At minimum, you need your video title and niche. Optionally, you can upload a face image, choose an emotion (surprised, excited, etc.), set brand colors, and add your channel URL for enhanced personalization and brand consistency."
    },
    {
      question: "How does the quota system work?",
      answer: "We use Stripe-powered billing with transparent usage tracking. Free users get 5 thumbnail generations to start. Pro plans offer unlimited generations with enhanced features like competitor analysis, brand intelligence, and priority processing."
    },
    {
      question: "Can I A/B test the thumbnails?",
      answer: "Absolutely! Every thumbnail comes with a unique A/B test ID and variation index. We also provide setup guidance and track performance metrics. Pro users get automated A/B test analysis and recommendations based on your channel's performance data."
    },
    {
      question: "What niches does ThumbnailHive support?",
      answer: "ThumbnailHive works with virtually any YouTube niche. Our AI has intelligence data for gaming, tech, lifestyle, education, business, entertainment, and hundreds of other categories. The system automatically adapts to your specific niche's visual patterns and trending styles."
    },
    {
      question: "How fast is thumbnail generation?",
      answer: "Thumbnail generation typically takes 15-30 seconds. This includes real-time niche analysis, competitor research, AI image generation, CTR prediction, and mobile optimization scoring. The comprehensive analysis ensures quality over pure speed."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take security seriously. All data is encrypted, we never store your video content, and authentication is handled through secure OAuth providers. Your thumbnails and analytics are private to your account and can be deleted at any time."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-12 md:py-24 bg-dark-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-dark-300">
            Everything you need to know about ThumbnailHive's AI-powered thumbnail generation
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-8 md:mb-16">
          {faqs.map((faq, index) => (
            <div key={index} className="glass rounded-2xl overflow-hidden">
              <button
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-dark-800/30 transition-colors cursor-pointer"
                onClick={() => toggleFAQ(index)}
                type="button"
              >
                <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-dark-400 flex-shrink-0" />
                )}
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-8 pb-6">
                  <div className="border-t border-dark-700 pt-6">
                    <p className="text-dark-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="glass rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Still Have Questions?</h3>
            <p className="text-dark-300 mb-6">
              Our team is here to help you maximize your thumbnail performance
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
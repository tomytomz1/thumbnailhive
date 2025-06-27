'use client'

import React, { useState } from 'react'
import { Check, Star, Zap } from 'lucide-react'
import { Button } from '../ui/Button'
import { SignUpModal } from '../ui/SignUpModal'
import { useRouter } from 'next/navigation'

export const Pricing: React.FC = () => {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const router = useRouter()

  const handleSignUpSuccess = (email: string) => {
    // Redirect to sign-in page after successful sign-up
    router.push('/auth/signin?signup=true')
  }

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '5 thumbnail generations',
        'Basic niche analysis',
        'Standard CTR prediction',
        'Mobile optimization score',
        'Community support'
      ],
      limitations: [
        'No competitor analysis',
        'No brand intelligence',
        'No A/B test insights'
      ],
      cta: 'Start Free',
      popular: false,
      color: 'gray'
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'month',
      description: 'For professional content creation',
      features: [
        'Unlimited thumbnail generations',
        'Advanced niche intelligence',
        'Real-time competitor analysis',
        'Enhanced CTR predictions',
        'A/B test setup & tracking',
        'Brand consistency tools',
        'Heatmap visualizations',
        'Priority processing',
        'Email support'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true,
      color: 'primary'
    },
  ]

  return (
    <>
      <section className="py-12 md:py-24 bg-dark-900/50" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h2>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              Choose the perfect plan for your YouTube growth. All plans include our core AI features 
              with transparent Stripe-powered billing.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12 mb-8 md:mb-16 max-w-4xl mx-auto">
            {plans.map((plan, index) => (
              <div key={index} className={`relative ${plan.popular ? 'scale-105' : ''}`}>
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Card */}
                <div className={`glass rounded-2xl p-8 h-full ${
                  plan.popular 
                    ? 'border-primary-500/50 bg-primary-500/5' 
                    : 'border-dark-700'
                }`}>
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.price !== 'Custom' && (
                        <span className="text-dark-400">/{plan.period}</span>
                      )}
                    </div>
                    <p className="text-dark-300">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-dark-200">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <Button 
                      variant={plan.popular ? 'primary' : 'secondary'}
                      className="w-full"
                      size="lg"
                      onClick={() => setIsSignUpModalOpen(true)}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
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
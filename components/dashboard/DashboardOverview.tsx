'use client'

import React from 'react'
import { Button } from '../ui/Button'
import { 
  TrendingUp, 
  Image, 
  TestTube, 
  Zap, 
  Crown,
  Plus,
  ArrowRight
} from 'lucide-react'

interface User {
  id: string
  email: string
  name?: string | null
  image?: string | null
  planType: 'free' | 'pro' | 'enterprise'
  creditsRemaining: number
}

interface DashboardOverviewProps {
  user: User
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ user }) => {
  const stats = [
    {
      label: 'Credits Remaining',
      value: user.creditsRemaining,
      icon: Zap,
      color: 'text-primary-500',
      bgColor: 'bg-primary-500/20'
    },
    {
      label: 'Thumbnails Generated',
      value: '0', // TODO: Fetch from database
      icon: Image,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20'
    },
    {
      label: 'Active A/B Tests',
      value: '0', // TODO: Fetch from database
      icon: TestTube,
      color: 'text-green-500',
      bgColor: 'bg-green-500/20'
    },
    {
      label: 'Avg CTR Improvement',
      value: '0%', // TODO: Calculate from data
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/20'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user.name?.split(' ')[0] || 'Creator'}! 👋
            </h1>
            <p className="text-dark-300">
              Ready to create some high-converting thumbnails? Let's boost your CTR with AI.
            </p>
          </div>
          
          {user.planType === 'free' && (
            <div className="glass rounded-xl p-4 border border-primary-500/30">
              <div className="flex items-center space-x-3">
                <Crown className="w-6 h-6 text-primary-500" />
                <div>
                  <h3 className="font-semibold">Upgrade to Pro</h3>
                  <p className="text-sm text-dark-400">Unlock unlimited generations</p>
                </div>
                <Button size="sm">Upgrade</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-dark-400 text-sm">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Generate Thumbnail */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Generate Your First Thumbnail</h3>
              <p className="text-dark-300">
                Use our AI to create thumbnails optimized for your niche with CTR prediction.
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center">
              <Plus className="w-6 h-6 text-primary-500" />
            </div>
          </div>
          <Button className="w-full">
            Start Generating
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Learn More */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">How ThumbnailHive Works</h3>
              <p className="text-dark-300">
                Learn about niche intelligence, competitor analysis, and A/B testing.
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <Button variant="outline" className="w-full">
            Watch Tutorial
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Image className="w-8 h-8 text-dark-500" />
          </div>
          <h4 className="text-lg font-medium mb-2">No thumbnails yet</h4>
          <p className="text-dark-400 mb-6">
            Generate your first thumbnail to see it here with performance insights.
          </p>
          <Button>Generate First Thumbnail</Button>
        </div>
      </div>
    </div>
  )
} 
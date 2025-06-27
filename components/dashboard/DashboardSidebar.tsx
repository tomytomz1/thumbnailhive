'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Wand2, 
  Image, 
  BarChart3, 
  TestTube, 
  Settings, 
  CreditCard,
  Palette
} from 'lucide-react'

export const DashboardSidebar: React.FC = () => {
  const pathname = usePathname()

  const navItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      active: pathname === '/dashboard'
    },
    {
      label: 'Generate',
      href: '/dashboard/generate',
      icon: Wand2,
      active: pathname === '/dashboard/generate'
    },
    {
      label: 'My Thumbnails',
      href: '/dashboard/thumbnails',
      icon: Image,
      active: pathname === '/dashboard/thumbnails'
    },
    {
      label: 'A/B Tests',
      href: '/dashboard/tests',
      icon: TestTube,
      active: pathname === '/dashboard/tests'
    },
    {
      label: 'Analytics',
      href: '/dashboard/analytics',
      icon: BarChart3,
      active: pathname === '/dashboard/analytics'
    },
    {
      label: 'Brand Kit',
      href: '/dashboard/brand',
      icon: Palette,
      active: pathname === '/dashboard/brand'
    },
    {
      label: 'Billing',
      href: '/dashboard/billing',
      icon: CreditCard,
      active: pathname === '/dashboard/billing'
    },
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      active: pathname === '/dashboard/settings'
    },
  ]

  return (
    <aside className="w-64 bg-dark-900/50 border-r border-dark-800 h-screen sticky top-16">
      <div className="p-6">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                    : 'text-dark-300 hover:text-white hover:bg-dark-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mt-8 pt-8 border-t border-dark-700">
          <h3 className="text-sm font-semibold text-dark-400 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link
              href="/dashboard/generate"
              className="block w-full text-left px-3 py-2 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
            >
              + Generate Thumbnail
            </Link>
            <Link
              href="/dashboard/tests"
              className="block w-full text-left px-3 py-2 text-sm bg-dark-800 hover:bg-dark-700 text-dark-300 hover:text-white rounded-lg transition-colors"
            >
              📊 View A/B Tests
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
} 
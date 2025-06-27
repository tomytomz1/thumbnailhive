'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Header } from '../../components/layout/Header'
import { DashboardSidebar } from '../../components/dashboard/DashboardSidebar'
import { DashboardOverview } from '../../components/dashboard/DashboardOverview'

export default function DashboardPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark-300">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      
      <div className="flex pt-16">
        {/* Sidebar */}
        <DashboardSidebar />
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          <DashboardOverview user={session.user} />
        </main>
      </div>
    </div>
  )
} 
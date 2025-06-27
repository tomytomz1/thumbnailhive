import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import './globals.css'
import { SessionProvider } from '../components/providers/SessionProvider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ThumbnailHive - AI-Powered YouTube Thumbnail Generator',
  description: 'Generate high-converting YouTube thumbnails with AI-powered niche optimization, competitor analysis, and CTR prediction. Boost your video performance with data-driven thumbnail design.',
  keywords: 'YouTube thumbnails, AI thumbnail generator, video marketing, CTR optimization, YouTube growth',
  authors: [{ name: 'ThumbnailHive' }],
  openGraph: {
    title: 'ThumbnailHive - AI-Powered YouTube Thumbnail Generator',
    description: 'Generate high-converting YouTube thumbnails with AI-powered niche optimization and performance prediction.',
    url: 'https://thumbnailhive.com',
    siteName: 'ThumbnailHive',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThumbnailHive - AI-Powered YouTube Thumbnail Generator',
    description: 'Generate high-converting YouTube thumbnails with AI-powered niche optimization and performance prediction.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark-950 text-white antialiased`}>
        <SessionProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #475569',
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  )
} 
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn, getSession } from 'next-auth/react'

export default function VerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // The verification happens automatically when NextAuth processes the callback
        // We just need to check if the user is now authenticated
        const session = await getSession()
        
        if (session) {
          setStatus('success')
          
          // Start countdown redirect to dashboard
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer)
                router.push('/dashboard')
                return 0
              }
              return prev - 1
            })
          }, 1000)

          return () => clearInterval(timer)
        } else {
          // If no session after a delay, show error
          setTimeout(() => {
            setStatus('error')
          }, 2000)
        }
      } catch (error) {
        console.error('Verification error:', error)
        setStatus('error')
      }
    }

    verifyEmail()
  }, [router])

  const handleManualRedirect = () => {
    router.push('/dashboard')
  }

  const handleBackToSignIn = () => {
    router.push('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">⬢</span>
              </div>
              <span className="text-2xl font-bold text-white">ThumbnailHive</span>
            </div>
          </div>

          {status === 'verifying' && (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-6"></div>
              <h1 className="text-2xl font-bold text-white mb-4">Verifying Your Email</h1>
              <p className="text-gray-400 mb-6">
                Please wait while we verify your email address...
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">Email Verified Successfully! 🎉</h1>
              <p className="text-gray-400 mb-6">
                Welcome to ThumbnailHive! Your account has been verified and you're now ready to start creating amazing AI-powered thumbnails.
              </p>
              
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
                <p className="text-amber-400 text-sm">
                  Redirecting to your dashboard in <span className="font-bold">{countdown}</span> seconds...
                </p>
              </div>

              <button
                onClick={handleManualRedirect}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200"
              >
                Go to Dashboard Now →
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">Verification Failed</h1>
              <p className="text-gray-400 mb-6">
                We couldn't verify your email address. The link may have expired or already been used.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={handleBackToSignIn}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200"
                >
                  Request New Verification Email
                </button>
                
                <p className="text-gray-500 text-sm">
                  Need help? Contact our support team.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-900/30 rounded-lg p-4">
            <div className="text-amber-500 text-2xl mb-2">⚡</div>
            <div className="text-white text-sm font-medium">AI-Powered</div>
            <div className="text-gray-400 text-xs">Smart Generation</div>
          </div>
          <div className="bg-gray-900/30 rounded-lg p-4">
            <div className="text-amber-500 text-2xl mb-2">📈</div>
            <div className="text-white text-sm font-medium">High CTR</div>
            <div className="text-gray-400 text-xs">Proven Results</div>
          </div>
          <div className="bg-gray-900/30 rounded-lg p-4">
            <div className="text-amber-500 text-2xl mb-2">🎯</div>
            <div className="text-white text-sm font-medium">Optimized</div>
            <div className="text-gray-400 text-xs">Your Niche</div>
          </div>
        </div>
      </div>
    </div>
  )
} 
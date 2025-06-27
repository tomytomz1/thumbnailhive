'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Button } from '../../../components/ui/Button'
import { SignUpModal } from '../../../components/ui/SignUpModal'
import { Hexagon, Mail, Chrome, ArrowLeft, Eye, EyeOff, Sparkles, Zap, TrendingUp, CheckCircle, User, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [signUpData, setSignUpData] = useState<any>(null)
  const [showCreateAccount, setShowCreateAccount] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const isFromSignUp = searchParams.get('signup') === 'true'
  const error = searchParams.get('error')

  useEffect(() => {
    // Check for sign-up data in localStorage
    const storedSignUpData = localStorage.getItem('signUpData')
    if (storedSignUpData && isFromSignUp) {
      try {
        const data = JSON.parse(storedSignUpData)
        // Check if data is less than 10 minutes old
        if (Date.now() - data.timestamp < 10 * 60 * 1000) {
          setSignUpData(data)
          setEmail(data.email)
        }
        // Clean up localStorage
        localStorage.removeItem('signUpData')
      } catch (error) {
        console.error('Error parsing sign-up data:', error)
      }
    }
  }, [isFromSignUp])

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setEmailError('')
    setShowCreateAccount(false)
    
    try {
      const result = await signIn('email', { 
        email, 
        redirect: false,
        callbackUrl: '/dashboard' 
      })
      
      if (result?.error) {
        console.log('Sign in error:', result.error) // For debugging
        // Check if it's likely a user doesn't exist error
        if (result.error === 'EmailSignin' || result.error === 'Signin' || result.error === 'EmailSignInError') {
          setShowCreateAccount(true)
          setEmailError('')
        } else {
          setEmailError('Failed to send magic link. Please try again.')
        }
      } else {
        setEmailSent(true)
      }
    } catch (error) {
      console.error('Sign in error:', error)
      setEmailError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true)
    signIn('google', { callbackUrl: '/dashboard' })
  }

  const handleSignUpSuccess = (email: string) => {
    // Close modal and refresh page to show sign-up success state
    setIsSignUpModalOpen(false)
    router.push('/auth/signin?signup=true')
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="glass rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary-500" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
            <p className="text-dark-300 mb-6">
              We've sent a magic link to <strong className="text-white">{email}</strong>. 
              Click the link in your email to {isFromSignUp ? 'complete your account setup and' : ''} sign in to ThumbnailHive.
            </p>
            {isFromSignUp && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center justify-center space-x-2 text-green-400 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Account Created Successfully!</span>
                </div>
                <p className="text-sm text-green-300">
                  Welcome to ThumbnailHive! You'll get 5 free credits to start generating amazing thumbnails.
                </p>
              </div>
            )}
            <Button 
              variant="outline" 
              onClick={() => setEmailSent(false)}
              className="w-full"
            >
              Try Different Email
            </Button>
                  </div>
      </div>

      {/* Sign Up Modal */}
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSuccess={handleSignUpSuccess}
      />
    </div>
  )
}

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4 py-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-primary-600/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      
      <div className="max-w-4xl w-full relative z-10">
        {/* Email Verification Required Banner */}
        {error === 'EmailNotVerified' && (
          <div className="mb-6 glass rounded-xl p-4 border border-red-500/30 bg-red-500/5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">Email Verification Required</h3>
                <p className="text-sm text-dark-300">
                  You must verify your email address before accessing the dashboard. Please check your email for the verification link.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Sign-up Success Banner */}
        {isFromSignUp && signUpData && (
          <div className="mb-6 glass rounded-xl p-4 border border-primary-500/30 bg-primary-500/5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-primary-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">Welcome, {signUpData.fullName}! 🎉</h3>
                <p className="text-sm text-dark-300">
                  Your account has been created. Please verify your email to complete the setup and get your 5 free credits.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-4">
          <Link href="/" className="inline-flex items-center text-dark-400 hover:text-white mb-3 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <Hexagon className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">
              Thumbnail<span className="gradient-text">Hive</span>
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-dark-200 bg-clip-text text-transparent">
            {isFromSignUp ? 'Verify Your Email' : 'Welcome Back'}
          </h1>
          <p className="text-dark-300 text-base leading-relaxed mb-3">
            {isFromSignUp 
              ? 'Complete your account setup by verifying your email address'
              : 'Sign in to start generating high-converting thumbnails with AI'
            }
          </p>
          
          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-4 text-sm text-dark-400">
            <div className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-primary-500" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3 text-primary-500" />
              <span>High CTR</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3 text-primary-500" />
              <span>Fast Generation</span>
            </div>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="glass rounded-2xl p-6 border border-dark-700/50 shadow-2xl max-w-4xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            {/* Left Side - Google Sign In */}
            <div className="flex flex-col items-center justify-center space-y-3 text-center py-2">
              <div>
                <h3 className="text-lg font-semibold mb-1">Quick Sign In</h3>
                <p className="text-dark-400 text-sm max-w-xs mx-auto">Get started instantly with your Google account</p>
              </div>
              
              <Button
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                variant="outline"
                className="w-full max-w-sm flex items-center justify-center space-x-3 hover:bg-dark-700 hover:border-dark-600 transition-all duration-200"
                size="lg"
              >
                {isGoogleLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Chrome className="w-5 h-5" />
                )}
                <span>{isGoogleLoading ? 'Connecting...' : 'Continue with Google'}</span>
              </Button>
            </div>

            {/* Mobile Divider - only shows on mobile */}
            <div className="lg:hidden relative my-4 col-span-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-dark-800 text-dark-400">or</span>
              </div>
            </div>

            {/* Right Side - Email Sign In */}
            <div className="flex flex-col items-center justify-center space-y-3 text-center py-2" id="magic-link-section">
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  {isFromSignUp ? 'Verify Email' : 'Magic Link'}
                </h3>
                <p className="text-dark-400 text-sm max-w-xs mx-auto">
                  {isFromSignUp 
                    ? 'Click the verification link we\'ll send to your email'
                    : 'Sign in securely with your email'
                  }
                </p>
              </div>
              
              <form onSubmit={handleEmailSignIn} className="w-full max-w-sm space-y-3">
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setEmailError('')
                    }}
                    required
                    className={`w-full px-4 py-3 bg-dark-800 border rounded-lg text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      emailError ? 'border-red-500' : 'border-dark-600'
                    }`}
                    placeholder={isFromSignUp ? signUpData?.email || "Enter your email address" : "Enter your email address"}
                    readOnly={isFromSignUp && signUpData?.email}
                  />
                  <Mail className="absolute right-3 top-3 w-5 h-5 text-dark-400" />
                </div>
                {emailError && (
                  <p className="text-sm text-red-400 flex items-center justify-center space-x-1">
                    <span className="w-4 h-4 text-red-500">⚠</span>
                    <span>{emailError}</span>
                  </p>
                )}
                
                {/* Create Account Message */}
                {showCreateAccount && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center space-x-2 text-blue-400 mb-2">
                      <UserPlus className="w-5 h-5" />
                      <span className="font-medium">Account Not Found</span>
                    </div>
                    <p className="text-sm text-blue-300 mb-3">
                      We couldn't find an account with <strong>{email}</strong>. 
                      Would you like to create a new account?
                    </p>
                    <Button
                      onClick={() => setIsSignUpModalOpen(true)}
                      variant="outline"
                      className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:border-blue-400"
                      size="sm"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Account
                    </Button>
                  </div>
                )}
                
                <Button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      <span>{isFromSignUp ? 'Send Verification Email' : 'Send Magic Link'}</span>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Desktop Vertical Divider - centered between columns, spanning Magic Link section height */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-px bg-dark-700" style={{ top: '35%', transform: 'translate(-50%, -50%)', height: '60%' }}></div>

          {/* Footer */}
          <div className="mt-4 text-center border-t border-dark-700 pt-4 space-y-2">
            <div className="text-sm text-dark-300">
              Don't have an account?{' '}
              <button
                onClick={() => setIsSignUpModalOpen(true)}
                className="text-primary-400 hover:text-primary-300 underline font-medium"
              >
                Create one here
              </button>
            </div>
            <div className="text-xs text-dark-400">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-primary-400 hover:text-primary-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary-400 hover:text-primary-300">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="glass rounded-lg p-3 text-center border border-dark-700/30 hover:border-primary-500/30 transition-colors group">
              <div className="text-xl mb-1 group-hover:scale-110 transition-transform">🚀</div>
              <h3 className="font-semibold mb-0.5 text-white text-sm">Start Free</h3>
              <p className="text-xs text-dark-400">5 free generations</p>
            </div>
            <div className="glass rounded-lg p-3 text-center border border-dark-700/30 hover:border-primary-500/30 transition-colors group">
              <div className="text-xl mb-1 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="font-semibold mb-0.5 text-white text-sm">AI-Powered</h3>
              <p className="text-xs text-dark-400">Smart optimization</p>
            </div>
            <div className="glass rounded-lg p-3 text-center border border-dark-700/30 hover:border-primary-500/30 transition-colors group">
              <div className="text-xl mb-1 group-hover:scale-110 transition-transform">📈</div>
              <h3 className="font-semibold mb-0.5 text-white text-sm">High CTR</h3>
              <p className="text-xs text-dark-400">Proven results</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
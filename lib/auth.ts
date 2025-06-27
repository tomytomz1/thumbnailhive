import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { SupabaseAdapter } from '@auth/supabase-adapter'
import { createServerSupabaseClient } from './supabase'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      // Custom email template
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        const { host } = new URL(url)
        const transport = nodemailer.createTransport(provider.server)
        
        await transport.sendMail({
          to: email,
          from: provider.from,
          subject: `🚀 Sign in to ThumbnailHive`,
          text: `Sign in to ThumbnailHive\n\nClick this link to sign in:\n${url}\n\nIf you didn't request this email, you can safely ignore it.`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Sign in to ThumbnailHive</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a0a;">
                <!-- Header -->
                <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 40px 20px; text-align: center;">
                  <div style="display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                    <div style="width: 40px; height: 40px; background-color: rgba(255,255,255,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                      <span style="color: white; font-size: 20px;">⬢</span>
                    </div>
                    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">ThumbnailHive</h1>
                  </div>
                  <h2 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">Welcome Back! 🎉</h2>
                </div>
                
                <!-- Content -->
                <div style="background-color: #111111; padding: 40px 20px; color: white;">
                  <p style="font-size: 18px; line-height: 1.6; margin-bottom: 30px; color: #e5e5e5;">
                    Click the button below to sign in to your ThumbnailHive account and start generating amazing AI-powered thumbnails:
                  </p>
                  
                  <!-- CTA Button -->
                  <div style="text-align: center; margin: 40px 0;">
                    <a href="${url}" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);">
                      🚀 Sign In to ThumbnailHive
                    </a>
                  </div>
                  
                  <!-- Features -->
                  <div style="background-color: #1a1a1a; border-radius: 12px; padding: 24px; margin: 30px 0;">
                    <h3 style="color: #f59e0b; margin: 0 0 16px 0; font-size: 16px;">What's waiting for you:</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                      <div style="flex: 1; min-width: 150px;">
                        <div style="color: #f59e0b; margin-bottom: 4px;">⚡ AI-Powered</div>
                        <div style="color: #888; font-size: 14px;">Smart thumbnail generation</div>
                      </div>
                      <div style="flex: 1; min-width: 150px;">
                        <div style="color: #f59e0b; margin-bottom: 4px;">📈 High CTR</div>
                        <div style="color: #888; font-size: 14px;">Proven click-through rates</div>
                      </div>
                      <div style="flex: 1; min-width: 150px;">
                        <div style="color: #f59e0b; margin-bottom: 4px;">🎯 Niche-Optimized</div>
                        <div style="color: #888; font-size: 14px;">Tailored to your content</div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Alternative Link -->
                  <p style="font-size: 14px; color: #888; line-height: 1.6; margin-top: 30px;">
                    If the button doesn't work, you can copy and paste this link into your browser:<br>
                    <a href="${url}" style="color: #f59e0b; word-break: break-all;">${url}</a>
                  </p>
                  
                  <!-- Security Notice -->
                  <div style="background-color: #1a1a1a; border-left: 4px solid #f59e0b; padding: 16px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                    <p style="margin: 0; font-size: 14px; color: #ccc;">
                      🔒 <strong>Security Notice:</strong> This link will expire in 24 hours and can only be used once. If you didn't request this email, you can safely ignore it.
                    </p>
                  </div>
                </div>
                
                <!-- Footer -->
                <div style="background-color: #0a0a0a; padding: 30px 20px; text-align: center; border-top: 1px solid #333;">
                  <p style="margin: 0; font-size: 12px; color: #666;">
                    © 2024 ThumbnailHive. All rights reserved.<br>
                    You're receiving this email because you requested to sign in to ThumbnailHive.
                  </p>
                </div>
              </div>
            </body>
            </html>
          `,
        })
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async jwt({ token, user, account }) {
      // Add user ID to token for n8n authentication
      if (user) {
        token.userId = user.id
        token.email = user.email
      }
      
      // Store provider information
      if (account) {
        token.provider = account.provider
        
        // For email provider, mark as verified after successful callback
        if (account.provider === 'email') {
          token.emailVerified = true
        }
        
        // For Google OAuth, mark as verified immediately
        if (account.provider === 'google') {
          token.emailVerified = true
        }
      }
      
      return token
    },
    async session({ session, token }) {
      // Add user ID and plan info to session
      if (session.user && token) {
        const supabase = createServerSupabaseClient()
        
        // Get user data from NextAuth users table
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('email', session.user.email)
          .single()

        session.user.id = token.userId as string || userData?.id
        session.user.planType = userData?.plan_type || 'free'
        session.user.creditsRemaining = userData?.credits_remaining || 5
        session.user.emailVerified = Boolean(token.emailVerified) || userData?.email_verified_at != null
        
        // Create JWT token for n8n authentication
        session.accessToken = jwt.sign(
          {
            sub: session.user.id,
            email: session.user.email,
            isPro: userData?.plan_type !== 'free',
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
          },
          process.env.NEXTAUTH_SECRET!
        )
      }
      return session
    },
    async signIn({ user, account, profile }) {
      // For Google OAuth, allow immediate sign-in (email is pre-verified)
      if (account?.provider === 'google') {
        // Create or update user in our custom users table
        if (user.email) {
          const supabase = createServerSupabaseClient()
          
          const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .single()

          if (!existingUser) {
            // Create new user with verified email
            await supabase
              .from('users')
              .insert({
                id: user.id,
                email: user.email,
                full_name: user.name || null,
                avatar_url: user.image || null,
                plan_type: 'free',
                credits_remaining: 5,
                email_verified_at: new Date().toISOString(),
              })
          } else {
            // Update existing user
            await supabase
              .from('users')
              .update({
                full_name: user.name || existingUser.full_name,
                avatar_url: user.image || existingUser.avatar_url,
                email_verified_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })
              .eq('id', existingUser.id)
          }
        }
        return true
      }

      // For email provider, only allow sign-in after email verification
      if (account?.provider === 'email') {
        // This callback runs after the user clicks the verification link
        // At this point, NextAuth has already validated the token
        if (user.email) {
          const supabase = createServerSupabaseClient()
          
          const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .single()

          if (!existingUser) {
            // Create new user with verified email
            await supabase
              .from('users')
              .insert({
                id: user.id,
                email: user.email,
                full_name: user.name || null,
                avatar_url: user.image || null,
                plan_type: 'free',
                credits_remaining: 5,
                email_verified_at: new Date().toISOString(),
              })
          } else {
            // Update existing user with verification timestamp
            await supabase
              .from('users')
              .update({
                email_verified_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })
              .eq('id', existingUser.id)
          }
        }
        return true
      }

      return true
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      planType: 'free' | 'pro' | 'enterprise'
      creditsRemaining: number
      emailVerified?: boolean
    }
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string
    provider?: string
    emailVerified?: boolean
  }
} 
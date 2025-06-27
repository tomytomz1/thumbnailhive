import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { createServerSupabaseClient } from './supabase-server'

// Resend Audiences mailing list function
async function addToMailingList(email: string, name?: string) {
  try {
    console.log(`Adding ${email} to Resend mailing list`)
    
    // Only try mailing list if we have valid API key
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your_resend_api_key_here') {
      console.log('⚠️ Resend API key not configured, skipping mailing list')
      return true
    }

    if (!process.env.MAILING_LIST_ID || process.env.MAILING_LIST_ID === 'your_mailing_list_id_here') {
      console.log('⚠️ Mailing list ID not configured, skipping mailing list')
      return true
    }
    
    // Add to Resend Audiences
    const response = await fetch(`https://api.resend.com/audiences/${process.env.MAILING_LIST_ID}/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        first_name: name?.split(' ')[0] || '',
        last_name: name?.split(' ').slice(1).join(' ') || '',
        unsubscribed: false
      })
    })

    if (response.ok) {
      console.log(`✅ Successfully added ${email} to mailing list`)
      return true
    } else {
      const error = await response.text()
      console.error(`❌ Failed to add ${email} to mailing list:`, error)
      return false
    }
  } catch (error) {
    console.error('❌ Mailing list error:', error)
    return false
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.userId = user.id
        token.email = user.email
      }
      
      if (account) {
        token.provider = account.provider
        token.emailVerified = true
      }
      
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        // Use simple fallback values for now to avoid Supabase calls in session
        session.user.id = token.userId as string
        session.user.planType = 'free'
        session.user.creditsRemaining = 5
        session.user.emailVerified = Boolean(token.emailVerified)
      }
      return session
    },
    async signIn({ user, account, profile }) {
      try {
        console.log('Google OAuth sign-in attempt:', user.email)
        
        if (!user.email) return false

        // Try database operations, but don't fail OAuth if they don't work
        try {
          const supabase = createServerSupabaseClient()
          
          // Check if user exists
          const { data: existingUser, error: selectError } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email)
            .single()

          if (!selectError || selectError.code === 'PGRST116') {
            if (!existingUser) {
              // Create new user
              const { error: insertError } = await supabase
                .from('users')
                .insert({
                  id: user.id,
                  email: user.email,
                  full_name: user.name || null,
                  avatar_url: user.image || null,
                  plan_type: 'free',
                  credits_remaining: 5,
                  email_verified_at: new Date().toISOString(),
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                })

              if (!insertError) {
                console.log('✅ User created in database')
                // Add to mailing list for new users
                await addToMailingList(user.email, user.name || undefined)
              } else {
                console.error('⚠️ Failed to create user in database:', insertError)
              }
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
              console.log('✅ User updated in database')
            }
          }
        } catch (dbError) {
          console.error('⚠️ Database operation failed, but allowing OAuth to continue:', dbError)
        }

        // Always allow OAuth to succeed, regardless of database operations
        return true
      } catch (error) {
        console.error('OAuth error:', error)
        // Even if there's an error, allow OAuth to continue
        return true
      }
    },
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
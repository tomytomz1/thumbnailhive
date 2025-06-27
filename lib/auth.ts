import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { createServerSupabaseClient } from './supabase'
import { sendVerificationEmail } from './email'

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
    EmailProvider({
      server: {
        host: 'smtp.resend.com',
        port: 587,
        auth: {
          user: 'resend',
          pass: process.env.RESEND_API_KEY,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        await sendVerificationEmail(email, url)
      },
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
        if (!user.email) return false

        const supabase = createServerSupabaseClient()
        
        // Check if user exists
        const { data: existingUser, error: selectError } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single()

        if (selectError && selectError.code !== 'PGRST116') {
          console.error('Error checking existing user:', selectError)
          return false
        }

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

          if (insertError) {
            console.error('Error creating new user:', insertError)
            return false
          }

          // Add to mailing list for new users
          await addToMailingList(user.email, user.name || undefined)
          
        } else {
          // Update existing user
          const { error: updateError } = await supabase
            .from('users')
            .update({
              full_name: user.name || existingUser.full_name,
              avatar_url: user.image || existingUser.avatar_url,
              email_verified_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('id', existingUser.id)

          if (updateError) {
            console.error('Error updating existing user:', updateError)
            return false
          }
        }

        return true
      } catch (error) {
        console.error('SignIn callback error:', error)
        return false
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
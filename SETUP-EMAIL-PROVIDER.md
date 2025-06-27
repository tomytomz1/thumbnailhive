# Email Provider Setup Guide

## Current Status ✅
- **Google OAuth**: Working perfectly with Supabase user creation
- **Supabase Integration**: Users are created/updated automatically
- **Mailing List**: Ready to integrate (placeholder function created)
- **EmailProvider**: Ready to enable once you have Resend API key

## Next Steps to Complete Email Integration

### 1. Get Resend API Key
1. Go to [Resend.com](https://resend.com)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add your domain (or use their test domain for development)

### 2. Update Environment Variables
Update your `.env.local` file:
```bash
# Replace with your actual Resend API key
RESEND_API_KEY=re_your_actual_api_key_here

# Replace with your verified domain or use resend's test domain
EMAIL_FROM=noreply@yourdomain.com
# For testing: EMAIL_FROM=onboarding@resend.dev
```

### 3. Enable EmailProvider
In `lib/auth.ts`, uncomment the EmailProvider section:
```typescript
// Remove the comment blocks around this:
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
```

### 4. Add Mailing List Integration
Choose your preferred mailing list service and update the `addToMailingList` function:

#### Option A: Mailchimp
```typescript
// Install: npm install @mailchimp/mailchimp_marketing
import mailchimp from '@mailchimp/mailchimp_marketing'

async function addToMailingList(email: string, name?: string) {
  try {
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_SERVER_PREFIX,
    })
    
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
      email_address: email,
      status: 'subscribed',
      merge_fields: { FNAME: name?.split(' ')[0] || '' }
    })
    return true
  } catch (error) {
    console.error('Mailchimp error:', error)
    return false
  }
}
```

#### Option B: ConvertKit
```typescript
async function addToMailingList(email: string, name?: string) {
  try {
    const response = await fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email: email,
        first_name: name?.split(' ')[0] || ''
      })
    })
    return response.ok
  } catch (error) {
    console.error('ConvertKit error:', error)
    return false
  }
}
```

#### Option C: Resend Audiences
```typescript
async function addToMailingList(email: string, name?: string) {
  try {
    const response = await fetch('https://api.resend.com/audiences/YOUR_AUDIENCE_ID/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        first_name: name?.split(' ')[0] || '',
        unsubscribed: false
      })
    })
    return response.ok
  } catch (error) {
    console.error('Resend Audiences error:', error)
    return false
  }
}
```

## What's Already Working ✅

### Google OAuth Flow
1. User clicks "Continue with Google"
2. Authenticates with Google
3. User is created/updated in Supabase automatically
4. User is added to mailing list (when configured)
5. Redirected to dashboard

### Supabase Integration
- Users table with all necessary fields
- Automatic user creation for new users
- User updates for existing users
- Plan management (free/pro/enterprise)
- Credits tracking
- Email verification status

### Session Management
- JWT tokens with user data
- Session persistence
- Type-safe user information
- Plan and credits available in session

## Testing
Once you have the Resend API key:
1. Update the environment variables
2. Uncomment the EmailProvider
3. Test both Google OAuth and email magic links
4. Verify users are created in Supabase
5. Check mailing list integration

The system is production-ready except for the email provider configuration! 
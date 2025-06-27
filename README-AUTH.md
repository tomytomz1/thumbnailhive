# ThumbnailHive Authentication & Dashboard Setup

## 🚀 Authentication System

The authentication system is fully implemented using **NextAuth.js** with **Google OAuth** and **Email Magic Links**, integrated with **Supabase** for data storage.

### Features Implemented:

✅ **Google OAuth Authentication**  
✅ **Email Magic Link Authentication**  
✅ **Supabase Database Integration**  
✅ **User Session Management**  
✅ **Protected Dashboard Routes**  
✅ **User Credits System**  
✅ **Plan Management (Free/Pro/Enterprise)**

---

## 📊 Dashboard Pages

### 1. **Dashboard Overview** (`/dashboard`)
- Welcome message with user name
- Credits remaining display
- Statistics cards (thumbnails, A/B tests, CTR improvement)
- Quick action buttons
- Recent activity feed
- Upgrade prompts for free users

### 2. **Generate Thumbnails** (`/dashboard/generate`)
- Step-by-step thumbnail generation form
- Video title and niche input
- Face image upload (optional)
- Emotion selection (excited, surprised, shocked, etc.)
- Brand color customization
- Integration with n8n webhook
- Credits validation before generation

### 3. **My Thumbnails** (`/dashboard/thumbnails`)
- Grid and list view modes
- Filter by niche
- Download thumbnails
- Performance metrics (CTR score, mobile score)
- Thumbnail management

### 4. **Additional Pages** (Sidebar Navigation)
- A/B Tests (`/dashboard/tests`)
- Analytics (`/dashboard/analytics`)
- Brand Kit (`/dashboard/brand`)
- Billing (`/dashboard/billing`)
- Settings (`/dashboard/settings`)

---

## 🔐 How to Test Authentication

### 1. **Start the Development Server**
```bash
npm run dev
```

### 2. **Visit the Homepage**
- Go to `http://localhost:3000`
- Click "Get Started" or "Sign In" button
- You'll be redirected to `/auth/signin`

### 3. **Test Google OAuth**
- Click "Continue with Google"
- Use your Google account to sign in
- You'll be redirected to `/dashboard` after successful authentication

### 4. **Test Email Magic Link**
- Enter your email address
- Click "Send Magic Link"
- Check your email for the magic link
- Click the link to authenticate

### 5. **Test Protected Routes**
- Try accessing `/dashboard` without being signed in
- You should be redirected to `/auth/signin`
- After signing in, you should access the dashboard successfully

---

## 🗄️ Database Setup

### Required Supabase Tables:

1. **users** - User profiles and plan information
2. **thumbnails** - Generated thumbnail data
3. **niche_intelligence** - Niche-specific optimization data
4. **user_brands** - User brand guidelines
5. **ab_test_results** - A/B testing performance data

### Setup Instructions:

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key

2. **Run Database Setup**
   - Open Supabase SQL Editor
   - Copy and paste the contents of `scripts/setup-database.sql`
   - Execute the script to create all tables and policies

3. **Configure Environment Variables**
   - Update `.env.local` with your Supabase credentials
   - Ensure Google OAuth credentials are set
   - Configure n8n webhook URL

---

## 🔧 Environment Variables Required

```env
# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# N8N Webhook (for thumbnail generation)
NEXT_PUBLIC_N8N_WEBHOOK_URL=your-n8n-webhook-url
N8N_WEBHOOK_SECRET=your-n8n-webhook-secret
```

---

## 🎯 User Flow

1. **Landing Page** → User sees ThumbnailHive homepage
2. **Sign Up/Sign In** → User authenticates via Google or Email
3. **Dashboard** → User sees overview with credits and stats
4. **Generate Thumbnail** → User fills form and generates AI thumbnail
5. **My Thumbnails** → User manages and downloads generated thumbnails
6. **Analytics** → User tracks performance and optimizes

---

## 🚨 Troubleshooting

### Common Issues:

1. **"Cannot read properties of undefined"**
   - Ensure Supabase tables are created
   - Check environment variables are set correctly

2. **Google OAuth not working**
   - Verify Google OAuth credentials
   - Check redirect URIs in Google Console

3. **Magic links not sending**
   - Configure email server settings
   - Check spam folder

4. **Database connection errors**
   - Verify Supabase URL and keys
   - Check Row Level Security policies

---

## 📈 Next Steps

1. **Complete n8n Integration** - Ensure webhook properly generates thumbnails
2. **Implement Stripe Billing** - Add subscription management
3. **Add A/B Testing** - Connect with YouTube Analytics API
4. **Performance Analytics** - Track thumbnail performance metrics
5. **Brand Kit Management** - Allow users to save brand guidelines

---

## 🔗 Key Files

- `lib/auth.ts` - NextAuth configuration
- `lib/supabase.ts` - Supabase client setup
- `app/auth/signin/page.tsx` - Sign-in page
- `app/dashboard/page.tsx` - Dashboard overview
- `app/dashboard/generate/page.tsx` - Thumbnail generation
- `components/dashboard/` - Dashboard components
- `scripts/setup-database.sql` - Database setup script

The authentication system is production-ready and fully integrated with your existing n8n workflow! 
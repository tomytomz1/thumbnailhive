# 🎯 ThumbnailHive - AI-Powered YouTube Thumbnail Generator

> Generate high-converting YouTube thumbnails with advanced AI technology, niche intelligence, and CTR prediction.

![ThumbnailHive Hero](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase)

## ✨ Features

### 🚀 Core Functionality
- **AI-Powered Thumbnail Generation** - Advanced AI creates optimized thumbnails
- **Niche Intelligence** - Analyzes top performers in your specific niche
- **CTR Prediction** - Accurate click-through rate forecasting
- **A/B Testing Ready** - Generate multiple variations for testing
- **Mobile Optimization** - Thumbnails optimized for mobile viewing
- **Heat Map Analysis** - Visual attention mapping

### 🔐 Authentication & User Management
- **NextAuth.js Integration** - Secure authentication system
- **Email Verification** - Complete email verification flow
- **Google OAuth** - One-click Google sign-in
- **User Dashboard** - Personalized user experience
- **Credit System** - Usage tracking and billing integration

### 🎨 Design & UI/UX
- **Modern Glass Morphism Design** - Beautiful, professional interface
- **Responsive Layout** - Works perfectly on all devices
- **Dark Theme** - Optimized for extended usage
- **Smooth Animations** - Enhanced user experience
- **Professional Branding** - Consistent ThumbnailHive identity

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations

### Backend & Database
- **Supabase** - PostgreSQL database and auth
- **NextAuth.js** - Authentication solution
- **JWT Tokens** - Secure API authentication
- **N8N Integration** - Workflow automation

### AI & Processing
- **Custom AI Models** - Thumbnail generation
- **Computer Vision** - Image analysis
- **Niche Intelligence** - Performance analytics
- **CTR Prediction** - Machine learning models

### Email & Communication
- **Nodemailer** - Email delivery
- **Gmail Integration** - SMTP configuration
- **Branded Templates** - Professional email design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (Supabase recommended)
- Gmail account for email service
- Google OAuth credentials

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/tomytomz1/thumbnailhive.git
cd thumbnailhive
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp env.example .env.local
```

4. **Configure Environment Variables**
Edit `.env.local` with your credentials:
```env
# App Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Database
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Configuration
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com

# N8N Integration
NEXT_PUBLIC_N8N_WEBHOOK_URL=your-n8n-webhook-url

# Stripe (Optional)
STRIPE_PUBLIC_KEY=your-stripe-public-key
STRIPE_SECRET_KEY=your-stripe-secret-key

# Cloudinary (Optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

5. **Database Setup**
Run the SQL scripts in your Supabase dashboard:
```bash
# Execute in order:
scripts/setup-database.sql
scripts/add-users-table.sql
scripts/add-email-verification.sql
```

6. **Start Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Protected dashboard pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   ├── layout/           # Layout components
│   ├── sections/         # Landing page sections
│   └── ui/               # Reusable UI components
├── lib/                  # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   └── supabase.ts       # Supabase client
├── scripts/              # Database setup scripts
└── middleware.ts         # Next.js middleware
```

## 🔧 Configuration Guides

### Email Setup
See [EMAIL-SETUP-GUIDE.md](EMAIL-SETUP-GUIDE.md) for detailed email configuration with multiple providers.

### Authentication
See [README-AUTH.md](README-AUTH.md) for authentication setup and configuration.

### Database Integration
See [INTEGRATION-GUIDE.md](INTEGRATION-GUIDE.md) for N8N workflow and database integration.

## 🎨 Design System

### Colors
- **Primary**: Orange gradient (#F59E0B to #EF4444)
- **Dark**: Custom dark theme (#0F0F23, #1A1A2E, #16213E)
- **Glass**: Translucent overlays with backdrop blur

### Typography
- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable sans-serif
- **Code**: Monospace for technical content

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the excellent backend-as-a-service
- Tailwind CSS for the utility-first CSS framework
- All contributors and supporters of this project

## 📞 Support

For support, email support@thumbnailhive.com or join our Discord community.

---

**Made with ❤️ by the ThumbnailHive Team** 
# 📧 Email Setup Guide for ThumbnailHive

This guide will help you configure email sending for magic link authentication in your ThumbnailHive application.

## 🎯 Overview

NextAuth.js automatically sends magic link emails when users sign in with email. You just need to configure the email server settings.

## 📋 Required Environment Variables

Add these to your `.env.local` file:

```bash
# Email Configuration (for Magic Links)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=noreply@thumbnailhive.com
```

## 🚀 Setup Options

### Option 1: Gmail (Recommended for Development)

**Step 1: Enable 2-Factor Authentication**
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Security → 2-Step Verification → Turn On

**Step 2: Generate App Password**
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Other (custom name)"
3. Enter "ThumbnailHive" as the name
4. Copy the 16-character password

**Step 3: Configure Environment Variables**
```bash
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-gmail@gmail.com
EMAIL_SERVER_PASSWORD=your-16-char-app-password
EMAIL_FROM=your-gmail@gmail.com
```

### Option 2: SendGrid (Recommended for Production)

**Step 1: Create SendGrid Account**
1. Sign up at [SendGrid](https://sendgrid.com/)
2. Verify your account and domain

**Step 2: Create API Key**
1. Go to Settings → API Keys
2. Create API Key with "Mail Send" permissions
3. Copy the API key

**Step 3: Configure Environment Variables**
```bash
EMAIL_SERVER_HOST=smtp.sendgrid.net
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=apikey
EMAIL_SERVER_PASSWORD=your-sendgrid-api-key
EMAIL_FROM=noreply@yourdomain.com
```

### Option 3: Resend (Modern Alternative)

**Step 1: Create Resend Account**
1. Sign up at [Resend](https://resend.com/)
2. Verify your domain

**Step 2: Get API Key**
1. Go to API Keys section
2. Create new API key
3. Copy the key

**Step 3: Update NextAuth Configuration**
You'll need to modify `lib/auth.ts` to use Resend:

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// In your NextAuth config:
EmailProvider({
  server: {
    host: "smtp.resend.com",
    port: 587,
    auth: {
      user: "resend",
      pass: process.env.RESEND_API_KEY,
    },
  },
  from: process.env.EMAIL_FROM,
})
```

### Option 4: Mailgun

**Step 1: Create Mailgun Account**
1. Sign up at [Mailgun](https://www.mailgun.com/)
2. Verify your domain

**Step 2: Get SMTP Credentials**
1. Go to Domains → Your Domain → SMTP
2. Copy the SMTP credentials

**Step 3: Configure Environment Variables**
```bash
EMAIL_SERVER_HOST=smtp.mailgun.org
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=postmaster@your-domain.mailgun.org
EMAIL_SERVER_PASSWORD=your-mailgun-password
EMAIL_FROM=noreply@yourdomain.com
```

## 🎨 Custom Email Templates

NextAuth.js uses default email templates, but you can customize them:

### Basic Customization in `lib/auth.ts`:

```typescript
EmailProvider({
  server: {
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  },
  from: process.env.EMAIL_FROM,
  // Custom email template
  sendVerificationRequest: async ({ identifier: email, url, provider }) => {
    const { host } = new URL(url)
    const transport = nodemailer.createTransporter(provider.server)
    
    await transport.sendMail({
      to: email,
      from: provider.from,
      subject: `🚀 Sign in to ThumbnailHive`,
      text: `Sign in to ThumbnailHive\n${url}\n\n`,
      html: `
        <div style="background: #0a0a0a; color: white; padding: 40px; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto;">
            <h1 style="color: #f59e0b; margin-bottom: 30px;">🚀 Welcome to ThumbnailHive!</h1>
            <p style="font-size: 18px; margin-bottom: 30px;">Click the button below to sign in and start generating amazing thumbnails:</p>
            <a href="${url}" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Sign In to ThumbnailHive</a>
            <p style="margin-top: 30px; color: #666;">If you didn't request this email, you can safely ignore it.</p>
          </div>
        </div>
      `,
    })
  },
})
```

## 🧪 Testing Email Setup

### 1. Test in Development
```bash
npm run dev
```
1. Go to sign-in page
2. Enter your email
3. Click "Send Magic Link"
4. Check your email inbox

### 2. Test Email Delivery
Use a service like [Mail-Tester](https://www.mail-tester.com/) to check:
- Spam score
- Authentication (SPF, DKIM, DMARC)
- Content quality

## 🔧 Troubleshooting

### Common Issues:

**1. "Invalid login" error**
- Check EMAIL_SERVER_PASSWORD is correct
- For Gmail, ensure you're using App Password, not regular password

**2. Emails going to spam**
- Set up SPF, DKIM, DMARC records
- Use a professional EMAIL_FROM address
- Consider using a dedicated email service

**3. Connection timeout**
- Check EMAIL_SERVER_HOST and PORT
- Ensure firewall allows SMTP connections

**4. Authentication failed**
- Verify EMAIL_SERVER_USER format
- For SendGrid, user should be "apikey"
- For Gmail, use full email address

### Debug Mode:
Add to your `.env.local`:
```bash
NEXTAUTH_DEBUG=true
```

## 🚀 Production Recommendations

1. **Use Professional Email Service**: SendGrid, Mailgun, or Resend
2. **Set up Domain Authentication**: SPF, DKIM, DMARC records
3. **Monitor Email Delivery**: Set up webhooks for bounce/spam tracking
4. **Professional From Address**: Use your domain (noreply@yourdomain.com)
5. **Rate Limiting**: Implement to prevent abuse

## 📧 Email Content Preview

When users receive the magic link email, it will contain:
- Subject: "Sign in to ThumbnailHive"
- Professional HTML template with your branding
- Secure magic link that expires after a set time
- Clear call-to-action button

The email will automatically detect if it's a new user (from sign-up) or returning user and adjust the messaging accordingly.

---

**Need Help?** If you encounter issues, check the NextAuth.js documentation or reach out for assistance! 
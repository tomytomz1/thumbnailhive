import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(email: string, url: string) {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: '🚀 Sign in to ThumbnailHive',
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
                Click the button below to sign in to your ThumbnailHive account:
              </p>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 40px 0;">
                <a href="${url}" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);">
                  🚀 Sign In to ThumbnailHive
                </a>
              </div>
              
              <!-- Security Notice -->
              <div style="background-color: #1a1a1a; border-left: 4px solid #f59e0b; padding: 16px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; font-size: 14px; color: #ccc;">
                  🔒 This link will expire in 24 hours. If you didn't request this email, you can safely ignore it.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    })
    return true
  } catch (error) {
    console.error('Failed to send verification email:', error)
    throw error
  }
} 
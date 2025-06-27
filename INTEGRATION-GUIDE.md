# 🔗 **ThumbnailHive Integration Guide**

This guide ensures your **database**, **n8n workflow**, and **Next.js app** work together seamlessly.

---

## 🚨 **Critical Issues Fixed**

### **1. Database Schema Alignment**
✅ Updated TypeScript types to match your actual database structure  
✅ Fixed field type mismatches (string → number for IDs)  
✅ Added missing users table for NextAuth integration  

### **2. N8N Authentication**
✅ Added JWT token generation in NextAuth  
✅ Updated webhook calls to include Bearer token  
✅ Matched payload structure to your workflow expectations  

### **3. Field Mapping**
✅ Aligned form data with n8n workflow inputs  
✅ Fixed optimization_suggestions type (string[] → any)  
✅ Updated brand structure to match your schema  

---

## 📋 **Pre-Flight Checklist**

### **Step 1: Database Setup**
Run this SQL in your Supabase SQL Editor:

```sql
-- Add the missing users table
-- Copy and paste from: scripts/add-users-table.sql
```

### **Step 2: Environment Variables**
Ensure these are set in your `.env.local`:

```env
# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# N8N Webhook 
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://thriving.app.n8n.cloud/webhook-test/ultimate-thumbnail-generator

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### **Step 3: N8N Workflow Validation**
Your workflow expects this exact payload structure:

```json
{
  "body": {
    "title": "Video title here",
    "niche": "business",
    "emotion": "excited",
    "brandColor": "#f59e0b",
    "channelUrl": "",
    "faceImage": "base64-encoded-image-or-null"
  }
}
```

With Authorization header:
```
Authorization: Bearer <jwt-token>
```

---

## 🔄 **Data Flow Verification**

### **Frontend → N8N → Database**

1. **User submits form** in `/dashboard/generate`
2. **JWT token created** with user ID and plan info
3. **Webhook called** with proper authentication and payload
4. **N8N processes** and saves to your database tables
5. **Response returned** with generated thumbnails

### **Database → Frontend**

1. **Thumbnails fetched** from your `thumbnails` table
2. **Displayed in gallery** at `/dashboard/thumbnails`
3. **Performance metrics** shown (CTR, mobile scores)

---

## 🧪 **Testing Checklist**

### **Authentication Flow**
- [ ] Sign in with Google works
- [ ] User record created in `users` table
- [ ] JWT token generated in session
- [ ] Protected routes redirect when not authenticated

### **Thumbnail Generation**
- [ ] Form validation works
- [ ] Credits check prevents generation when 0
- [ ] JWT token sent to n8n webhook
- [ ] N8N workflow receives proper payload structure
- [ ] Thumbnails saved to database
- [ ] Success response returned

### **Database Integration**
- [ ] Users table exists and populated
- [ ] Thumbnails saved with correct field types
- [ ] Niche intelligence data available
- [ ] User brands data structure matches

---

## 🔧 **Key Code Changes Made**

### **1. Database Types (`lib/supabase.ts`)**
```typescript
// Updated to match your actual schema
thumbnails: {
  Row: {
    id: number,              // was: string
    ab_test_id: string | null, // was: string
    optimization_suggestions: any, // was: string[]
    // ... other fields aligned
  }
}
```

### **2. Authentication (`lib/auth.ts`)**
```typescript
// Added JWT token generation
session.accessToken = jwt.sign({
  sub: session.user.id,
  email: session.user.email,
  isPro: userData?.plan_type !== 'free',
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
}, process.env.NEXTAUTH_SECRET!)
```

### **3. Webhook Integration (`app/dashboard/generate/page.tsx`)**
```typescript
// Proper payload structure and authentication
const webhookPayload = {
  body: {
    title: formData.videoTitle,
    niche: formData.niche,
    emotion: formData.emotion,
    brandColor: formData.primaryColor,
    channelUrl: '',
    faceImage: formData.faceImage ? await convertFileToBase64(formData.faceImage) : null,
  }
}

const response = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL!, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${session.accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(webhookPayload),
})
```

---

## 🎯 **Expected N8N Workflow Behavior**

Your workflow should now:

1. ✅ **Receive authenticated requests** with valid JWT tokens
2. ✅ **Extract user ID** from token payload (`sub` field)
3. ✅ **Validate input data** (title, niche required)
4. ✅ **Check user credits** via Stripe API
5. ✅ **Generate thumbnails** via Ideogram API
6. ✅ **Save to database** with proper field mapping
7. ✅ **Return structured response** with thumbnail URLs and metadata

---

## 🚨 **Potential Issues & Solutions**

### **Issue: "Authentication required" error**
**Solution:** Ensure JWT token is being generated and sent correctly

### **Issue: Database field errors**
**Solution:** Run the users table setup script

### **Issue: N8N webhook timeout**
**Solution:** Check your webhook URL and network connectivity

### **Issue: File upload errors**
**Solution:** Verify base64 encoding is working correctly

---

## 📊 **Success Metrics**

When everything works correctly, you should see:

- ✅ Users signing in and appearing in `users` table
- ✅ Thumbnail generation completing without errors
- ✅ Generated thumbnails appearing in `/dashboard/thumbnails`
- ✅ Proper CTR scores and metadata being saved
- ✅ Credits being decremented after generation

---

## 🔄 **Next Steps After Testing**

1. **Monitor N8N logs** for any workflow errors
2. **Check Supabase logs** for database issues
3. **Test with different niches** and file uploads
4. **Verify Stripe integration** for credit management
5. **Test A/B testing workflow** if implemented

Your integration should now be **production-ready** with proper authentication, data flow, and error handling! 🚀 
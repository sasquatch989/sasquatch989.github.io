# EmailJS Setup Guide for Portfolio Contact Form

## Overview
This guide will help you set up EmailJS to make your contact form functional with your notification email system.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Select "Gmail" 
4. Use your **notification email** (`mynotificationemail@gmail.com`) - the one without 2FA
5. Follow the OAuth setup to connect your Gmail account
6. Note down the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** Portfolio Contact Form - {{subject}}

**Body:**
```
New contact form submission from your portfolio website:

From: {{fullName}}
Email: {{email}}
Company: {{company}}
Subject Category: {{subject}}
Preferred Response Time: {{timeline}}

Message:
{{message}}

---
Submitted: {{timestamp}}
```

4. Save the template and note the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** (e.g., `abcdef123456`)

## Step 5: Update Your Contact Form

Replace the placeholder values in `contact.html`:

```javascript
// Replace this line:
emailjs.init('YOUR_PUBLIC_KEY');
// With:
emailjs.init('your_actual_public_key_here');

// Replace this line:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
// With:
emailjs.send('your_service_id', 'your_template_id', formData)
```

## Step 6: Test the Form

1. Open your portfolio website
2. Fill out the contact form
3. Submit it
4. Check your notification email for the message
5. Verify it forwards to your main email

## Email Template Variables

The form sends these variables to your email template:

- `{{firstName}}` - First name from form
- `{{lastName}}` - Last name from form  
- `{{fullName}}` - Combined first and last name
- `{{email}}` - Email address from form
- `{{company}}` - Company/organization (or "Not specified")
- `{{subject}}` - Selected subject category
- `{{message}}` - Message content
- `{{timeline}}` - Preferred response timeline
- `{{timestamp}}` - When form was submitted

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- Basic email templates
- Standard support

This should be more than sufficient for a portfolio website.

## Security Notes

- Your notification email credentials are stored securely by EmailJS
- The public key is safe to include in client-side code
- Form submissions are sent directly from the browser to EmailJS
- No server-side code needed

## Troubleshooting

**Form shows error message:**
- Check that all three IDs are correct (Public Key, Service ID, Template ID)
- Verify your Gmail service is properly connected
- Check browser console for specific error messages

**Emails not arriving:**
- Check spam folder
- Verify your notification email is working
- Test the EmailJS service directly from their dashboard

**Template variables not working:**
- Ensure variable names in template match exactly (case-sensitive)
- Check that form field IDs match the JavaScript variable names

## Alternative: Formspree Setup

If you prefer Formspree instead of EmailJS:

1. Go to [https://formspree.io/](https://formspree.io/)
2. Create free account
3. Create new form, set endpoint to your notification email
4. Replace the EmailJS code with Formspree endpoint
5. Update form action attribute

Formspree is simpler but has a lower free tier limit (50 submissions/month).

## Next Steps

After setting up EmailJS:
1. Test the contact form thoroughly
2. Update the success message if needed
3. Consider adding a confirmation email to form submitters
4. Monitor your EmailJS dashboard for usage statistics

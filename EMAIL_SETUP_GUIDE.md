# Gmail App Password Setup Guide

To enable email sending from your portfolio contact form, you need to set up a Gmail App Password.

## Step-by-Step Instructions:

### 1. Enable 2-Factor Authentication (if not already enabled)
1. Go to your Google Account: https://myaccount.google.com/
2. Click "Security" in the left sidebar
3. Under "Signing in to Google", click "2-Step Verification"
4. Follow the steps to enable it (you'll need your phone)

### 2. Generate App Password
1. Still in "Security" section
2. Under "Signing in to Google", click "App passwords"
3. You might need to sign in again
4. Select app: "Mail"
5. Select device: "Windows Computer" (or "Other" and type "Portfolio")
6. Click "Generate"
7. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

### 3. Update the .env file
Replace `your-gmail-app-password-here` in the `.env` file with the app password:

```env
EMAIL_USER=deepit5656@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

**Important:** 
- Use the app password, NOT your regular Gmail password
- Remove any spaces from the app password
- Keep the quotes if there are any special characters

### 4. Restart the Backend Server
After updating the .env file:
1. Stop the backend server (Ctrl+C)
2. Start it again: `npm run dev`

### 5. Test the Contact Form
The form will now show different messages:
- ✅ "Message sent successfully! Email notification delivered." (when email works)
- ⚠️ "Message received and saved! (Email notification requires setup)" (when credentials missing)
- ❌ "Message saved! (Email notification failed - please check email setup)" (when there's an error)

## Troubleshooting:

### Common Issues:
1. **"Username and Password not accepted"**
   - Make sure you're using the App Password, not regular password
   - Ensure 2FA is enabled on your Google account

2. **"Less secure app access"**
   - This is outdated - use App Passwords instead

3. **Still not working?**
   - Double-check the email address in EMAIL_USER
   - Make sure there are no extra spaces in the app password
   - Restart the backend server after changes

### Alternative Email Services:
If Gmail doesn't work, you can also use:
- **Outlook/Hotmail:** Change service to 'hotmail'
- **Yahoo:** Change service to 'yahoo'
- **Custom SMTP:** Replace the service with host, port, and secure settings

## Security Note:
- Never commit the .env file to version control
- The .env file should already be in .gitignore
- App passwords are safer than regular passwords for applications

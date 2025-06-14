const express = require('express');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const router = express.Router();

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// POST /api/contact - Submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save to database
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Log the contact form submission
    console.log('\n=== NEW CONTACT FORM SUBMISSION ===');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log(`Time: ${new Date().toLocaleString()}`);
    console.log('===================================\n');    let emailSent = false;
    let responseMessage = 'Message received and saved! I\'ll get back to you via email soon.';

    // Try to send email notification
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS && 
          process.env.EMAIL_USER !== 'your-email@gmail.com' &&
          process.env.EMAIL_PASS !== 'your-gmail-app-password-here') {
        
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'deepit5656@gmail.com',
          subject: `Portfolio Contact: ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">New Portfolio Contact Message</h2>
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p style="background: white; padding: 15px; border-radius: 4px;">${message}</p>
              </div>
              <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
                This message was sent from your portfolio website.
              </p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        responseMessage = 'Message sent successfully! Email notification delivered.';
        console.log('✅ Email notification sent successfully');
      } else {        console.log('⚠️  Email credentials not configured properly');
        responseMessage = 'Message received and saved successfully! I\'ll get back to you via email.';
      }
    } catch (emailError) {
      console.error('⚠️  Email sending failed:', emailError.message);
      responseMessage = 'Message saved! (Email notification failed - please check email setup)';
    }

    res.status(201).json({ 
      success: true, 
      message: responseMessage,
      emailSent: emailSent
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

// GET /api/contact - Get all messages (for admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 
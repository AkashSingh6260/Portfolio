import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── CORS ──────────────────────────────────────────────────────────────────────
// Set ALLOWED_ORIGIN in your Render dashboard (your Vercel frontend URL).
// Multiple origins: comma-separated — e.g. "https://a.vercel.app,https://custom.com"
const allowedOrigins = process.env.ALLOWED_ORIGIN
  ? process.env.ALLOWED_ORIGIN.split(',').map(o => o.trim())
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // server-to-server / Postman
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(express.json());

// Request timeout
app.use((req, res, next) => {
  res.setTimeout(20000, () => {
    console.error(`Request timed out: ${req.method} ${req.originalUrl}`);
    if (!res.headersSent) {
      res.status(503).json({ error: 'Server timed out. Please try again later.' });
    }
  });
  next();
});

// ── Resend client ─────────────────────────────────────────────────────────────
// Uses HTTPS (not SMTP) — works on all cloud platforms including Render free tier.
// Get your free API key at https://resend.com → 100 emails/day free.
const resend = new Resend(process.env.RESEND_API_KEY);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.send('✅ Backend Server is running! Contact API is ready.');
});

// ── Debug route (safe — no secrets exposed) ───────────────────────────────────
app.get('/api/debug', (req, res) => {
  res.json({
    resendKeySet: Boolean(process.env.RESEND_API_KEY),
    emailUserSet: Boolean(process.env.EMAIL_USER),
    allowedOrigins,
    status: 'ok',
  });
});

// ── Contact API ───────────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set in environment variables.');
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  if (!process.env.EMAIL_USER) {
    console.error('EMAIL_USER is not set in environment variables.');
    return res.status(500).json({ error: 'Email recipient is not configured.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // use this until you verify a domain
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ffb400; border-bottom: 2px solid #ffb400; padding-bottom: 8px;">
            📬 New Message from Portfolio
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; width: 100px;">Name</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr style="background: #f9f9f9;">
              <td style="padding: 8px; font-weight: bold;">Email</td>
              <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold;">Subject</td>
              <td style="padding: 8px;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 16px;">
            <p style="font-weight: bold; margin-bottom: 4px;">Message:</p>
            <blockquote style="border-left: 4px solid #ffb400; padding: 12px 16px; background: #fffbf0; margin: 0; border-radius: 0 4px 4px 0;">
              ${message.replace(/\n/g, '<br>')}
            </blockquote>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 24px;">
            Sent via your Portfolio contact form
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(500).json({
        error: 'Failed to send message. Please try again later.',
        details: error.message,
      });
    }

    console.log('Email sent successfully, id:', data?.id);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Unexpected error sending email:', err);
    res.status(500).json({
      error: 'Failed to send message. Please try again later.',
      details: err.message,
    });
  }
});

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`   Allowed origins: ${allowedOrigins.join(', ')}`);
  console.log(`   Resend API key: ${process.env.RESEND_API_KEY ? '✅ set' : '❌ MISSING'}`);
  console.log(`   Email recipient: ${process.env.EMAIL_USER ? '✅ set' : '❌ MISSING'}`);
});

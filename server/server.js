import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const useSendGrid = Boolean(process.env.SENDGRID_API_KEY);
const emailProvider = useSendGrid ? 'sendgrid' : 'gmail';
const sendGridFrom = process.env.SENDGRID_FROM || process.env.EMAIL_USER;

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setTimeout(20000, () => {
    console.error(`Request timed out: ${req.method} ${req.originalUrl}`);
    if (!res.headersSent) {
      res.status(503).json({ error: 'Server timed out. Please try again later.' });
    }
  });
  next();
});

// Default route (so you don't see "Cannot GET /" in the browser)
app.get('/', (req, res) => {
  res.send('Backend Server is running! The contact API is ready.');
});

let emailProviderReady = false;
let emailProviderError = null;
let transporter = null;

if (useSendGrid) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  emailProviderReady = true;
  console.log('SendGrid is configured for email sending');
} else {
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    family: 4,
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your App Password
    },
    requireTLS: true,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    tls: {
      rejectUnauthorized: false,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      emailProviderReady = false;
      emailProviderError = error.message || String(error);
      console.error('Nodemailer verification failed:', error);
    } else {
      emailProviderReady = true;
      console.log('Nodemailer is ready to send messages');
    }
  });
}

app.get('/api/debug', (req, res) => {
  res.json({
    emailProvider,
    emailUserSet: Boolean(process.env.EMAIL_USER),
    emailPassSet: Boolean(process.env.EMAIL_PASS),
    sendGridKeySet: Boolean(process.env.SENDGRID_API_KEY),
    sendGridFromSet: Boolean(sendGridFrom),
    sendGridFrom,
    emailProviderReady,
    emailProviderError: emailProviderReady ? null : emailProviderError,
  });
});

const sendMailWithTimeout = (mailOptions, timeoutMs = 15000) => {
  return Promise.race([
    transporter.sendMail(mailOptions),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('MailTimeout')), timeoutMs)
    ),
  ]);
};

const sendSendGridWithTimeout = (msg, timeoutMs = 15000) => {
  return Promise.race([
    sgMail.send(msg),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('MailTimeout')), timeoutMs)
    ),
  ]);
};

// API Routes
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    if (useSendGrid) {
      if (!process.env.SENDGRID_API_KEY || !sendGridFrom || !process.env.EMAIL_USER) {
        console.error('SendGrid or email target is not configured.');
        return res.status(500).json({ error: 'Email service is not configured.' });
      }
    } else {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('Email credentials are missing.');
        return res.status(500).json({ error: 'Email service is not configured.' });
      }
    }

    const mailOptions = {
      from: useSendGrid ? sendGridFrom : process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #ffb400;">New Message from Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left: 4px solid #ffb400; padding-left: 10px; background: #f9f9f9;">
            ${message}
          </blockquote>
        </div>
      `,
    };

    if (useSendGrid) {
      await sendSendGridWithTimeout(mailOptions, 15000);
    } else {
      await sendMailWithTimeout(mailOptions, 15000);
    }

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email Error:', error);
    const errorDetails =
      error?.response?.body ||
      error?.response?.headers ||
      error?.message ||
      String(error);

    if (error?.message === 'MailTimeout') {
      return res.status(504).json({ error: 'Email service timed out. Please try again later.', details: errorDetails });
    }

    res.status(500).json({ error: 'Failed to send message. Please try again later.', details: errorDetails });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

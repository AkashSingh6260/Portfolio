import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

console.log('Testing email configuration...');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS check:', process.env.EMAIL_PASS ? 'Loaded' : 'Missing');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify(function(error, success) {
  if (error) {
    console.error('\n❌ NODEMAILER CONNECTION ERROR:');
    console.error(error);
  } else {
    console.log('\n✅ Server is ready to take our messages');
  }
});

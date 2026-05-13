# Portfolio Website

A modern, fully responsive portfolio website built with React, Three.js, and Express.js backend with email functionality.

## Features

- 🎨 **Modern UI** with smooth animations and transitions
- 🌐 **3D Scene** using Three.js and React Three Fiber
- 📧 **Contact Form** with email integration via Gmail
- 📱 **Fully Responsive** design for all devices
- ⚡ **Fast** development with Vite
- 🎯 **Type-safe** with React components
- 🎬 **Smooth Animations** with Framer Motion and GSAP
- 📊 **Interactive Sections** - Hero, About, Skills, Projects, Experience, Achievements

## Tech Stack

### Frontend
- **React** 19.2.6 - UI library
- **Vite** 8.0.12 - Build tool
- **Tailwind CSS** 3.4.19 - Styling
- **Three.js** 0.184.0 - 3D graphics
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - Animation library
- **GSAP** - Advanced animations
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime
- **Express.js** 5.2.1 - Web framework
- **Nodemailer** 8.0.7 - Email service
- **CORS** - Cross-origin support
- **Dotenv** - Environment variables

## Project Structure

```
Portfolio/
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Achievements.jsx
│   │   ├── CodingProfiles.jsx
│   │   ├── Contact.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── ThreeScene.jsx
│   │   └── UI.jsx
│   ├── data/
│   │   └── portfolio.js
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server/
│   ├── server.js
│   ├── test-email.js
│   ├── package.json
│   └── .env
├── public/
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Frontend Setup

```bash
cd Portfolio
npm install
```

### Backend Setup

```bash
cd Portfolio/server
npm install
```

### Environment Configuration

1. Create or update `.env` file in `server/` directory:

```env
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
```

2. **Generate Gmail App Password:**
   - Go to [myaccount.google.com/security](https://myaccount.google.com/security)
   - Enable 2-Step Verification (if not already enabled)
   - Navigate to "App passwords"
   - Select "Mail" and "Windows Computer"
   - Google will generate a 16-character password
   - Copy and paste it into `EMAIL_PASS` in `.env`

## Running the Project

### Development Mode

**Terminal 1 - Frontend:**
```bash
cd Portfolio
npm run dev
```
Frontend runs on: http://localhost:5173/

**Terminal 2 - Backend:**
```bash
cd Portfolio/server
npm run dev
```
Backend runs on: http://localhost:5000/

Both servers have hot-reload enabled for development.

### Production Build

```bash
cd Portfolio
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend
- `npm run start` - Start server
- `npm run dev` - Start with watch mode
- `node test-email.js` - Test email configuration

## Contact Form

The contact form integrates with the backend to send emails:

1. User fills out the form (Name, Email, Subject, Message)
2. Frontend sends POST request to `http://localhost:5000/api/contact`
3. Backend validates the data
4. Email is sent via Gmail SMTP
5. Response is returned to frontend

### Testing Email

To verify email setup works:

```bash
cd Portfolio/server
node test-email.js
```

This will check if Nodemailer can authenticate with Gmail.

## Troubleshooting

### Email Not Sending
- **Error: Invalid login (535-5.7.8)**
  - Gmail credentials are wrong
  - Generate a new App Password
  - Ensure 2-Step Verification is enabled on your Google account

### Port Already in Use
- Vite will automatically try the next available port (5174, 5175, etc.)
- You can specify a custom port: `npm run dev -- --port 3000`

### CORS Issues
- Backend already has CORS enabled
- Frontend should connect to `http://localhost:5000/api/contact`

## Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
```
Deploy the `dist/` folder

### Backend (Heroku/Railway/Render)
- Set environment variables: `EMAIL_USER` and `EMAIL_PASS`
- Use `npm start` as start command
- Point frontend to backend URL

## License

This project is open source and available under the ISC License.

## Support

For issues or questions, please check the browser console and server logs for error messages.

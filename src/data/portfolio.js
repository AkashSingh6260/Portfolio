export const personalInfo = {
  name: 'Akash Singh',
  roles: ['Full Stack Developer', 'AI/ML Enthusiast', 'Competitive Programmer', 'MERN Stack Developer'],
  tagline: 'Building intelligent digital experiences with code, creativity, and AI.',
  email: 'akki.akashsingh2005@gmail.com',
  phone: '+91-6260710989',
  location: 'Gwalior, India',
  about: `I am a Computer Science Engineering student at Madhav Institute of Technology and Science, Gwalior, passionate about full-stack development, AI systems, and scalable applications. I enjoy building impactful products combining modern web technologies with intelligent systems. My interests include microservices, machine learning, real-time systems, and developer-focused solutions.`,
};

export const education = {
  institution: 'Madhav Institute of Technology and Science, Gwalior',
  degree: 'B.Tech in Computer Science and Engineering',
  cgpa: '8.65',
  icon: '🎓',
};

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/akash-singh-6bb244214/',
  github: 'https://github.com/AkashSingh6260',
  leetcode: 'https://leetcode.com/u/AkashSingh6260/',
  codechef: 'https://www.codechef.com/users/akashsingh6260',
};

export const skills = {
  Languages: ['C++', 'Python', 'JavaScript'],
  Frontend: ['React', 'Redux Toolkit', 'Tailwind CSS'],
  Backend: ['Node.js', 'Express.js', 'FastAPI'],
  Databases: ['MongoDB', 'MySQL', 'FAISS'],
  'AI / ML': ['NLP', 'BERT', 'TensorFlow', 'RAG', 'LLaMA 3.1', 'Scikit-learn'],
  'Tools & DevOps': ['Docker', 'Kubernetes', 'Git', 'Linux', 'Postman'],
  'Core CS': ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Microservices'],
};

export const projects = [
  {
    id: 1,
    title: 'SAHAYAK',
    subtitle: 'AI Powered Home Services Platform',
    description: 'A modern MERN + FastAPI microservices-based platform for on-demand home services with integrated AI capabilities including real-time SOS, RAG chatbot, and seamless payment integration.',
    features: [
      'Real-time SOS emergency dispatch system',
      'WebSocket communication',
      'AI chatbot using RAG + LLaMA 3.1 + FAISS',
      'Razorpay payment integration',
      'JWT authentication & RBAC',
      'Redux Toolkit optimization',
      'Scalable microservices architecture',
    ],
    tech: ['MERN', 'FastAPI', 'Python', 'WebSockets', 'FAISS', 'LLaMA 3.1', 'Docker'],
    color: '#ffb400',
    gradient: 'from-amber-500/20 to-orange-600/10',
    featured: true,
    github: 'https://github.com/AkashSingh6260',
  },
  {
    id: 2,
    title: 'DEEPFAKE NEWS DETECTOR',
    subtitle: 'AI-Powered Misinformation Detection',
    description: 'An AI-powered misinformation detection system using NLP and machine learning with 90%+ accuracy, combining BERT and Logistic Regression for real-time fake news analysis.',
    features: [
      '90%+ accuracy on benchmark datasets',
      'BERT + Logistic Regression models',
      'Real-time fake news analysis',
      'Flask deployment',
      'End-to-end ML pipeline',
    ],
    tech: ['Python', 'NLP', 'BERT', 'TensorFlow', 'Flask', 'Scikit-learn'],
    color: '#00d9ff',
    gradient: 'from-cyan-500/20 to-blue-600/10',
    featured: true,
    github: 'https://github.com/AkashSingh6260',
  },
];

export const experience = [
  {
    role: 'Content Lead',
    org: 'GDG on Campus',
    type: 'Leadership',
    icon: '🚀',
    description: 'Led content strategy and technical workshops for the Google Developer Group campus chapter.',
  },
  {
    role: 'Campus Ambassador',
    org: 'Unstop',
    type: 'Ambassador',
    icon: '🌟',
    description: 'Promoted tech competitions and hackathons, onboarding 100+ students onto the platform.',
  },
  {
    role: 'Student Partner',
    org: 'Internshala',
    type: 'Ambassador',
    icon: '💼',
    description: 'Represented Internshala, conducting awareness sessions about internship opportunities.',
  },
];

export const achievements = [
  { title: 'Finalist', org: 'IIITM National Hackathon', icon: '🏆', color: '#ffb400' },
  { title: 'Round 1 Cleared', org: 'HackWithInfy', icon: '⚡', color: '#00d9ff' },
  { title: '2-Star Coder', org: 'CodeChef', icon: '⭐', color: '#ff6b35' },
  { title: '200+ Problems', org: 'LeetCode', icon: '💻', color: '#ffa116' },
  { title: '150+ Problems', org: 'GFG / Coding Ninjas', icon: '🎯', color: '#2f8d46' },
  { title: 'ML Quiz Winner', org: 'IIT Kharagpur', icon: '🥇', color: '#ffb400' },
  { title: 'Design Winner', org: 'IIT Roorkee HTML/CSS', icon: '🎨', color: '#9d4edd' },
];

export const stats = [
  { label: 'LeetCode Problems', value: 200, suffix: '+' },
  { label: 'Projects Built', value: 10, suffix: '+' },
  { label: 'CGPA', value: 8.65, suffix: '', decimals: 2 },
  { label: 'Hackathons', value: 5, suffix: '+' },
];

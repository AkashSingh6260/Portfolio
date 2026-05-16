import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionTitle } from './UI';
import { personalInfo, socialLinks } from '../data/portfolio';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch('https://portfolio-yxmu.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
        mode: 'cors',
        signal: controller.signal,
      });

      const data = await response.json().catch(() => null);

      if (response.ok) {
        setStatus('sent');
      } else {
        console.error('Contact error:', data || response.statusText);
        alert(data?.error || 'Failed to send message. Please try again or use direct email.');
        setStatus('idle');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        alert('The request timed out. Please try again.');
      } else {
        console.error(error);
        alert('Cannot connect to the server right now.');
      }
      setStatus('idle');
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: '#ffb400' },
    { icon: FaPhone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}`, color: '#22c55e' },
    { icon: FaMapMarkerAlt, label: 'Location', value: personalInfo.location, href: '#', color: '#00d9ff' },
  ];

  return (
    <Section id="contact">
      <SectionTitle
        label="Contact"
        title="Let's"
        highlight="Connect"
        subtitle="Have a project in mind or want to collaborate? I'd love to hear from you."
      />

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left — Contact info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          {/* AI-styled intro */}
          <div className="glass-card p-6 border border-accent/20 relative overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-text-secondary text-xs font-mono ml-2">contact.sh</span>
            </div>

            <div className="font-mono text-sm space-y-2">
              <div>
                <span className="text-accent">$ </span>
                <span className="text-green-400">whoami</span>
              </div>
              <div className="text-text-secondary pl-4">Akash Singh — Full Stack Developer & AI Engineer</div>
              <div className="mt-2">
                <span className="text-accent">$ </span>
                <span className="text-green-400">status --now</span>
              </div>
              <div className="text-text-secondary pl-4">
                <span className="text-green-400">●</span> Actively seeking exciting opportunities
              </div>
              <div className="mt-2">
                <span className="text-accent">$ </span>
                <span className="text-green-400">ping akash</span>
              </div>
              <div className="text-text-secondary pl-4 flex items-center gap-2">
                <span className="text-accent animate-pulse">▋</span>
                Ready to collaborate_
              </div>
            </div>
          </div>

          {/* Contact details */}
          <div className="space-y-3">
            {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 glass-card p-4 border border-white/5 hover:border-accent/30 transition-all duration-300 group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Icon style={{ color }} className="text-base" />
                </div>
                <div>
                  <div className="text-text-secondary text-xs">{label}</div>
                  <div className="text-text-primary font-medium group-hover:text-accent transition-colors duration-300 text-sm">
                    {value}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Social links */}
          <div className="flex gap-4">
            {[
              { icon: FaGithub, href: socialLinks.github, label: 'GitHub' },
              { icon: FaLinkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -3 }}
                className="glass-card p-3 border border-accent/20 hover:border-accent text-text-secondary hover:text-accent transition-all duration-300 text-xl"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right — Contact form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="glass-card p-8 border border-accent/10">
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-display font-bold text-2xl text-accent mb-2">Message Sent!</h3>
                <p className="text-text-secondary">Thanks for reaching out. I'll get back to you soon.</p>
                <motion.button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  whileHover={{ scale: 1.05 }}
                  className="mt-6 px-6 py-2 rounded-full border border-accent/30 text-accent text-sm hover:bg-accent/10 transition-all"
                >
                  Send Another
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  {['name', 'email'].map(field => (
                    <div key={field}>
                      <label className="text-text-secondary text-xs font-mono uppercase tracking-wider mb-2 block">
                        {field} *
                      </label>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        id={`contact-${field}`}
                        value={form[field]}
                        onChange={handleChange}
                        required
                        placeholder={field === 'name' ? 'Your Name' : 'your@email.com'}
                        className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent focus:shadow-glow transition-all duration-300 text-sm"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="text-text-secondary text-xs font-mono uppercase tracking-wider mb-2 block">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="contact-subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's it about?"
                    className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent focus:shadow-glow transition-all duration-300 text-sm"
                  />
                </div>

                <div>
                  <label className="text-text-secondary text-xs font-mono uppercase tracking-wider mb-2 block">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    id="contact-message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent focus:shadow-glow transition-all duration-300 text-sm resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255,180,0,0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'sending'}
                  className="w-full bg-accent text-bg font-bold py-4 rounded-xl hover:bg-accent-light transition-all duration-300 text-sm shadow-glow disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        className="w-4 h-4 border-2 border-bg border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending...
                    </span>
                  ) : (
                    'Send Message →'
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, MapPin, Phone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../api/config';
import { cn } from '../lib/utils';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            // Using a relative URL - assuming proxy in vite or full URL for testing
            // For now using full URL as we haven't set up proxy yet
            const response = await api.post('/messages', formData);

            if (response.data.success) {
                setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
                setFormData({ name: '', email: '', subject: '', message: '' });
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus({
                type: 'error',
                message: error.response?.data?.message || 'Failed to send message. Please try again later.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className="py-24 px-6 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-gray-900 dark:text-white">Contact Me</h2>
                        <div className="w-full h-1.5 bg-primary rounded-full" />
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Let&apos;s Connect</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                                I&apos;m currently looking for new opportunities and collaborations.
                                Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-semibold">ankita.gupta.0411@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="font-semibold">+91 8176034359</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="font-semibold">Bhopal, Madhya Pradesh</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4 pt-8">
                            <a href="https://github.com/ankita34359" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-primary hover:text-white transition-all text-gray-600 dark:text-gray-400">
                                <Github size={24} />
                            </a>
                            <a href="https://www.linkedin.com/in/i-ankita-gupta/" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-primary hover:text-white transition-all text-gray-600 dark:text-gray-400">
                                <Linkedin size={24} />
                            </a>
                            <a href="mailto:ankita.gupta.0411@gmail.com" className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-primary hover:text-white transition-all text-gray-600 dark:text-gray-400">
                                <Mail size={24} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="p-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-light-card dark:bg-dark-card shadow-xl"
                    >
                        {status.message && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "mb-6 p-4 rounded-xl flex items-center space-x-3",
                                    status.type === 'success' ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
                                )}
                            >
                                {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                                <p className="text-sm font-medium">{status.message}</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium ml-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium placeholder-gray-400"
                                        placeholder="Ankita Gupta"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium ml-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-gray-400"
                                        placeholder="ankita@gmail.com"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-gray-400"
                                    placeholder="Project Inquiry"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none placeholder-gray-400"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:opacity-90 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

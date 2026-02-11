import { useState, useEffect } from 'react';
import { api, IMAGE_BASE_URL } from '../api/config';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Github, Linkedin, Mail, FileText, ArrowRight, Code2, Globe, Cpu } from 'lucide-react';

const Hero = () => {
    const [resumeUrl, setResumeUrl] = useState('/Ankita_Gupta_Resume.pdf'); // Fallback

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await api.get('/resume');
                if (response.data.success && response.data.filePath) {
                    setResumeUrl(response.data.filePath.startsWith('http') ? response.data.filePath : `${IMAGE_BASE_URL}${response.data.filePath}`);
                }
            } catch (error) {
                console.error('Error fetching resume:', error);
            }
        };
        fetchResume();
    }, []);
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8, rotateY: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 pb-10 overflow-hidden bg-light-bg dark:bg-dark-bg relative transition-colors duration-300">
            {/* Background Decorative Elements */}
            <div
                style={{
                    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)'
                }}
                className="absolute inset-0 z-0 opacity-[0.05] dark:opacity-[0.15] text-gray-400 dark:text-gray-500"
            />
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px] -z-10 animate-pulse" />

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">

                {/* Left Column: Info (Restored from previous style) */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span>Available for Opportunities</span>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h2 className="text-gray-500 dark:text-gray-400 font-medium text-lg mb-2">Hello, I&apos;m</h2>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight text-gray-900 dark:text-white mb-4">
                            Ankita Gupta
                        </h1>
                        <p className="text-3xl md:text-4xl text-gray-950 dark:text-gray-100 font-semibold tracking-tighter">
                            Full Stack Web Developer
                        </p>
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-400 text-lg max-w-lg leading-relaxed">
                        Final year B.Tech Student in CSE (CCFSD). Crafting seamless digital experiences through modern web technologies and cloud infrastructure.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
                        <a
                            href={resumeUrl}
                            download="Ankita_Gupta_Resume.pdf"
                            className="inline-block"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-[0_0_30px_-5px_rgb(0,112,243)] transition-all flex items-center group relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center">
                                    Download Resume <FileText className="ml-2 w-5 h-5" />
                                </span>
                            </motion.button>
                        </a>
                        <Link
                            to="contact"
                            smooth={true}
                            duration={500}
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border border-gray-200 dark:border-gray-800 rounded-2xl font-bold text-gray-900 dark:text-white transition-all flex items-center group hover:border-primary/50"
                            >
                                Contact Me <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex items-center space-x-6 pt-6">
                        <a href="https://github.com/ankita34359" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                            <Github className="w-6 h-6" />
                        </a>
                        <a href="https://www.linkedin.com/in/i-ankita-gupta/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a href="mailto:ankita.gupta.0411@gmail.com" className="text-gray-500 hover:text-primary transition-colors">
                            <Mail className="w-6 h-6" />
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right Column: Premium Visual (Retained from current) */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative hidden lg:flex justify-center items-center perspective-[1000px]"
                >
                    <motion.div
                        animate={{
                            rotateY: [0, 5, 0],
                            rotateX: [0, -5, 0]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 w-[420px] h-[520px] bg-gradient-to-br from-white/30 to-white/5 dark:from-white/10 dark:to-transparent backdrop-blur-2xl rounded-[2.5rem] border border-gray-200 dark:border-white/10 p-4 shadow-[0_0_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]"
                    >
                        {/* Scanning Effect Overlay */}
                        <motion.div
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[2px] bg-primary/40 blur-[4px] z-20 pointer-events-none"
                        />

                        <div className="w-full h-full bg-white/40 dark:bg-black/40 rounded-[2rem] p-8 text-sm flex flex-col relative overflow-hidden">
                            <div className="flex space-x-2 mb-8">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                            </div>

                            <div className="flex-1 space-y-6 text-gray-300">
                                <div className="space-y-1">
                                    <p className="text-primary/80">01 function <span className="text-blue-400">Profile</span>() {'{'}</p>
                                    <p className="pl-4 text-gray-400">02   const <span className="text-purple-400">dev</span> = {'{'}</p>
                                    <p className="pl-8">03     name: <span className="text-green-400">&apos;Ankita Gupta&apos;</span>,</p>
                                    <p className="pl-8">04     role: <span className="text-green-400">&apos;Fullstack Developer&apos;</span>,</p>
                                    <p className="pl-8 text-gray-400">05     status: <span className="text-amber-400">&apos;Open to Work&apos;</span></p>
                                    <p className="pl-4">06   {'}'}</p>
                                    <p className="text-primary/80">07 {'}'}</p>
                                </div>

                                <div className="space-y-5 pt-8">
                                    <div className="flex items-center space-x-4 group cursor-default">
                                        <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all">
                                            <Cpu size={22} className="text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Infrastructure</p>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">AWS & Cloud Design</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 group cursor-default">
                                        <div className="p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-all">
                                            <Globe size={22} className="text-blue-500 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Stacks</p>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">React.js, Node.js, Express.js</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 group cursor-default">
                                        <div className="p-3 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-all">
                                            <Code2 size={22} className="text-purple-500 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Workflow</p>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">Git and Github</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Background Visual Flair */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full -z-10 animate-[spin_20s_linear_infinite]" />
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;

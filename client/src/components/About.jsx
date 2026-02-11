import { motion } from 'framer-motion';
import {
    GraduationCap,
    Award,
    User,
    Sparkles
} from 'lucide-react';

const About = () => {
    const education = {
        college: "Jagran Lakecity University",
        course: "B.Tech (Hons) Computer Science and Engineering",
        specialization: "Cloud Computing and Full Stack Development (CCFSD)",
        cgpa: "8.35 / 10.0"
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="about" className="py-24 px-6 relative overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-300">
            {/* Background Flair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-gray-900 dark:text-white">About Me</h2>
                        <div className="w-full h-1.5 bg-primary rounded-full" />
                    </div>
                </motion.div>

                {/* Simplified Two-Column Layout */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
                >

                    {/* 1. Professional Persona Card */}
                    <motion.div
                        variants={itemVariants}
                        className="p-10 rounded-[2.5rem] bg-light-card dark:bg-dark-card border border-gray-100 dark:border-white/5 flex flex-col justify-between relative overflow-hidden group hover:border-primary/20 transition-all duration-500 shadow-xl dark:shadow-2xl"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center space-x-3 text-primary mb-8">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <User size={20} />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest">The Persona</span>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                Always learning, always building.
                            </h3>

                            <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                                <p>
                                    Final-year CSE undergraduate with a strong interest in <span className="text-gray-900 dark:text-white font-semibold">Full-Stack Web Development</span>.
                                    Experience in building user-friendly digital solutions and currently exploring cloud technologies and scalable systems.
                                </p>
                                <p>
                                    I completed my role as a <span className="text-gray-900 dark:text-white font-semibold">Frontend Web Developer Intern at Null Class</span>, where I engineered scalable frontend architectures and optimized API integrations.
                                </p>
                                <p>
                                    Committed to developing impactful applications that enhance accessibility, efficiency, and user experience.
                                </p>
                            </div>
                        </div>

                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
                    </motion.div>

                    {/* 2. Education Card */}
                    <motion.div
                        variants={itemVariants}
                        className="p-10 rounded-[2.5rem] bg-light-card dark:bg-dark-card border border-gray-100 dark:border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all duration-500 shadow-xl dark:shadow-2xl flex flex-col justify-between"
                    >
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-all" />

                        <div className="relative z-10 flex flex-col h-full py-2">
                            <div>
                                <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest w-fit mb-10">
                                    <GraduationCap size={16} className="mr-1" /> Education Profile
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h4 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">{education.college}</h4>
                                        <p className="text-primary font-semibold text-xl">{education.course}</p>
                                    </div>

                                    <div className="pt-4 border-t border-white/5">
                                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2 flex items-center">
                                            <Sparkles size={12} className="mr-2 text-primary" /> Specialization
                                        </p>
                                        <p className="text-gray-300 text-base leading-relaxed">{education.specialization}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md group-hover:bg-white/10 transition-colors">
                                <div className="space-y-1">
                                    <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase">
                                        <Award size={16} /> <span>Performance</span>
                                    </div>
                                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Current CGPA</p>
                                </div>
                                <div className="flex items-baseline space-x-1">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{education.cgpa.split(' ')[0]}</span>
                                    <span className="text-gray-500 font-medium text-lg">/ 10.0</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
};

export default About;

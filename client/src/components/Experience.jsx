import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const Experience = () => {
    const experience = {
        role: 'Frontend Web Developer Intern',
        company: 'Null Class',
        period: 'January 2025 – May 2025',
        location: 'Bhopal, Madhya Pradesh',
        points: [
            'Developed and maintained scalable frontend architecture for a YouTube Clone using React.js, ensuring a fully responsive and user-friendly UI across desktop and mobile devices.',
            'Integrated optimized API calls to fetch dynamic video content, improving page load performance by 30% and enhancing real-time data synchronization.',
            'Collaborated actively using Git workflows, adopting structured practices that enhanced team collaboration.',
            'Engineered reusable UI components with a focus on clean code principles and state management, resulting in highly maintainable and scalable web application architecture'
        ],
        skills: ['React.js', 'Frontend Architecture', 'API Integration', 'Git Workflow', 'UI/UX']
    };

    return (
        <section id="experience" className="py-24 px-6 bg-light-bg dark:bg-dark-bg transition-colors duration-300 overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-gray-900 dark:text-white">Professional Experience</h2>
                        <div className="w-full h-1.5 bg-primary rounded-full" />
                    </div>
                </motion.div>

                <div className="relative">
                    {/* Glass Card for Single Experience */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="p-8 md:p-12 rounded-[2.5rem] bg-light-card dark:bg-dark-card border border-gray-100 dark:border-white/5 hover:border-primary/20 transition-all duration-500 shadow-xl dark:shadow-2xl relative overflow-hidden group"
                    >
                        {/* Interactive Glow */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-all duration-700" />

                        <div className="relative z-10">
                            {/* Header Info */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                                <div className="space-y-3">
                                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                                        <Briefcase size={14} className="mr-1" /> Internship
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                                        {experience.role}
                                    </h3>
                                    <p className="text-xl text-primary font-semibold flex items-center">
                                        {experience.company}
                                    </p>
                                </div>
                                <div className="flex flex-col items-start md:items-end space-y-2 text-gray-500 dark:text-gray-400 font-medium">
                                    <div className="flex items-center">
                                        <Calendar size={18} className="mr-2 text-primary" />
                                        {experience.period}
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin size={18} className="mr-2 text-primary" />
                                        {experience.location}
                                    </div>
                                </div>
                            </div>

                            {/* Contribution List */}
                            <div className="space-y-6 mb-12">
                                {experience.points.map((point, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + (index * 0.1) }}
                                        className="flex items-start space-x-4"
                                    >
                                        <div className="mt-1.5 flex-shrink-0">
                                            <CheckCircle2 size={20} className="text-primary opacity-80" />
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                            {point}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Skill Tags */}
                            <div className="pt-8 border-t border-gray-100 dark:border-white/5">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em] mb-4">Core Technologies Utilized</p>
                                <div className="flex flex-wrap gap-3">
                                    {experience.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-5 py-2 rounded-xl bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 text-sm font-semibold border border-gray-100 dark:border-white/10 hover:border-primary/40 hover:text-primary transition-all cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Experience;

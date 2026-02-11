import { motion } from 'framer-motion';
import { Code2, Target, Zap, Award, CheckCircle2 } from 'lucide-react';

const stats = [
    { label: 'Solved Problems', value: '350+', icon: <Code2 className="w-5 h-5" /> },
    { label: 'GitHub Contributions', value: '2,000+', icon: <Zap className="w-5 h-5" /> },
    { label: 'CodeChef Proficiency', value: 'Active', icon: <Target className="w-5 h-5" /> },
    { label: 'Project Impact', value: 'Significant', icon: <Award className="w-5 h-5" /> },
];

const DSA = () => {
    return (
        <section id="dsa" className="py-24 px-6 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-gray-900 dark:text-white">Data Structure & Algorithm</h2>
                        <div className="w-full h-1.5 bg-primary rounded-full" />
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-light-card dark:bg-dark-card text-center shadow-md dark:shadow-none"
                        >
                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                                {stat.icon}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-primary">{stat.value}</h3>
                        </motion.div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-light-card dark:bg-dark-card shadow-lg"
                    >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                            <Zap className="mr-2 text-primary" /> Problem-Solving Mindset
                        </h3>
                        <div className="space-y-6">
                            {[
                                { title: 'Logical Reasoning', desc: 'Expertise in breaking down complex problems into manageable components.' },
                                { title: 'Complexity Optimization', desc: 'Continuous focus on refining Time and Space complexity for efficient solutions.' },
                                { title: 'Pattern Recognition', desc: 'Identifying and applying recurring algorithmic patterns and data structures.' },
                                { title: 'Scalable Implementation', desc: 'Writing clean, maintainable code following best engineering practices.' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start space-x-3 group cursor-default">
                                    <div className="mt-1 flex-shrink-0">
                                        <CheckCircle2 size={18} className="text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-light-card dark:bg-dark-card flex flex-col justify-center items-center text-center shadow-lg"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                            <Award size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Competitive Programming</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-sm">
                            I regularly participate in coding contests on CodeChef and maintain a high velocity of problem-solving to optimize complexity.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.codechef.com/users/i_am_ankita"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:opacity-90 transition-all flex items-center shadow-lg"
                            >
                                View CodeChef
                            </a>
                            <a
                                href="https://github.com/ankita34359/CodeChef-Rating-0-to-500"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:opacity-90 transition-all flex items-center shadow-lg"
                            >
                                GitHub Repository
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DSA;

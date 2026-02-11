import { motion } from 'framer-motion';
import { Award, Star, Trophy, CheckCircle } from 'lucide-react';

const achievements = [
    {
        title: 'Sunstone Hackathon Winner',
        organization: 'Sunstone',
        date: '2022',
        description: 'Secured first place in the Sunstone Hackathon, delivering an innovative solution that claimed the grand prize pool among 50+ competing teams.',
        icon: <Award className="w-5 h-5" />,
    },
    {
        title: 'Marker Cup Recipient',
        organization: 'Jagran Lakecity University',
        date: '2023',
        description: 'Distinguished for achieving the highest academic performance and securing the top CGPA within the Cloud Computing and Full Stack Development specialization.',
        icon: <Trophy className="w-5 h-5" />,
    },
    {
        title: 'Open Source Contributor',
        organization: 'Notable Community Projects',
        date: '2024',
        description: 'Recognized for significant contributions to core documentation and UI testing suites. Ranked within the Top 20% Universally among contributors.',
        icon: <Star className="w-5 h-5" />,
    },
];

const Achievements = () => {
    return (
        <section id="achievements" className="py-24 px-6 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-gray-900 dark:text-white">Achievements</h2>
                        <div className="w-full h-1.5 bg-primary rounded-full" />
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {achievements.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="p-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-light-card dark:bg-dark-card shadow-lg hover:shadow-2xl transition-all"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-primary text-sm font-semibold mb-4">{item.organization} • {item.date}</p>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                {item.description}
                            </p>
                            <div className="flex items-center text-xs text-green-500 font-bold uppercase tracking-wider">
                                <CheckCircle size={14} className="mr-1" /> Verified
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;

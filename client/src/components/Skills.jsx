import { motion } from 'framer-motion';
import {
    Globe,
    Server,
    Database,
    Brain,
    Wrench,
    Code2,
    Layout,
    Cpu,
    Terminal,
    Layers,
    Binary
} from 'lucide-react';

const skillCategories = [
    {
        title: 'Frontend Technology',
        icon: <Layout className="w-6 h-6" />,
        skills: ['HTML5', 'CSS3', 'JavaScript(ES6+)', 'React.js', 'Bootstrap', 'Tailwind CSS'],
        color: 'blue'
    },
    {
        title: 'Backend Technology',
        icon: <Server className="w-6 h-6" />,
        skills: ['Node.js', 'Express.js', 'Python', 'Flask'],
        color: 'emerald'
    },
    {
        title: 'Database Technology',
        icon: <Database className="w-6 h-6" />,
        skills: ['MongoDB', 'MySQL', 'SQLite'],
        color: 'purple'
    },
    {
        title: 'Machine Learning',
        icon: <Brain className="w-6 h-6" />,
        skills: ['Python', 'Pandas', 'Numpy', 'Scikit-learn'],
        color: 'pink'
    },
    {
        title: 'Tool and Platform',
        icon: <Wrench className="w-6 h-6" />,
        skills: ['Git', 'Github', 'MongoDB Atlas', 'VS Code', 'Vercel', 'Postman', 'AI Tools'],
        color: 'orange'
    },
    {
        title: 'Programming Languages',
        icon: <Binary className="w-6 h-6" />,
        skills: ['C', 'C++', 'Java', 'Python'],
        color: 'indigo'
    },
];

const Skills = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
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

    const getColorClasses = (color) => {
        const colorMap = {
            blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20 group-hover:border-blue-500/50',
            emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/50',
            purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20 group-hover:border-purple-500/50',
            pink: 'text-pink-500 bg-pink-500/10 border-pink-500/20 group-hover:border-pink-500/50',
            orange: 'text-orange-500 bg-orange-500/10 border-orange-500/20 group-hover:border-orange-500/50',
            indigo: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20 group-hover:border-indigo-500/50',
        };
        return colorMap[color] || colorMap.blue;
    };

    return (
        <section id="skills" className="py-24 px-6 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-gray-900 dark:text-white">
                            My Skills
                        </h2>
                        <div className="w-full h-1.5 bg-primary rounded-full" />
                    </div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="group p-8 rounded-[2rem] bg-light-card dark:bg-dark-card border border-gray-100 dark:border-white/5 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-primary/5 shadow-gray-200/40 relative overflow-hidden"
                        >
                            {/* Card Glow Effect */}
                            <div className={`absolute -top-10 -right-10 w-32 h-32 opacity-0 group-hover:opacity-20 transition-opacity blur-3xl rounded-full bg-${category.color}-500`} />

                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500 border ${getColorClasses(category.color)}`}>
                                    {category.icon}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-primary transition-colors">
                                    {category.title}
                                </h3>

                                <div className="flex flex-wrap gap-2.5">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-white/5 group-hover:border-primary/20 hover:text-primary dark:hover:text-primary transition-all cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;

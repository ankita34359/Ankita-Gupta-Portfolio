import { useState, useEffect } from 'react';
import { api, IMAGE_BASE_URL } from '../api/config';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ExternalLink, Github, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { ProjectSkeleton } from './Skeleton';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('Web Development Project');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                if (response.data.success) {
                    setProjects(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(p => p.category === filter);

    const categories = ['Web Development Project', 'Machine Learning Projects'];

    return (
        <section id="projects" className="py-24 px-6 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-gray-900 dark:text-white">Featured Projects</h2>
                        <div className="w-full h-1.5 bg-primary rounded-full" />
                    </div>
                </motion.div>

                <div className="flex flex-wrap gap-4 justify-center mb-16">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={cn(
                                "px-6 py-2 rounded-full border text-sm font-bold transition-all",
                                filter === cat
                                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                    : "border-gray-200 dark:border-gray-800 text-gray-500 hover:text-primary dark:hover:text-white"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="skeleton"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {[1, 2, 3].map(i => <ProjectSkeleton key={i} />)}
                        </motion.div>
                    ) : filteredProjects.length === 0 ? (
                        <motion.div
                            key="no-content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 text-gray-500 font-medium"
                        >
                            No projects found in this category.
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredProjects.map((project, idx) => (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    className="group relative flex flex-col h-full rounded-[1.5rem] bg-white dark:bg-[#12121c] border border-gray-100 dark:border-white/5 overflow-hidden shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500"
                                >
                                    {/* Project Image Area */}
                                    <div className="aspect-video overflow-hidden relative bg-[#f8f9fa] dark:bg-[#0a0a12] border-b border-gray-100 dark:border-white/5 p-4 flex items-center justify-center">
                                        {project.image ? (
                                            <img
                                                src={`${IMAGE_BASE_URL}${project.image}`}
                                                alt={project.title}
                                                className="max-w-full max-h-full object-contain transition-all duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-7xl">🚀</div>
                                        )}
                                        {project.isFeatured && (
                                            <div className="absolute top-4 right-4 px-3 py-1 bg-gray-900/80 backdrop-blur-md text-amber-400 border border-amber-400/20 rounded-full text-[10px] font-bold flex items-center z-10">
                                                <Sparkles size={12} className="mr-1" /> Featured
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                            <div className="flex gap-3">
                                                {project.githubLink && (
                                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white hover:text-black transition-all">
                                                        <Github size={20} />
                                                    </a>
                                                )}
                                                {project.liveLink && (
                                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white hover:text-black transition-all">
                                                        <ExternalLink size={20} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="mb-4">
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Tech Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {(Array.isArray(project.tech) ? project.tech : (project.tech || '').split(',')).map((t, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-primary/5 text-primary border border-primary/10 rounded-full text-xs font-bold tracking-wider">
                                                    {t.trim()}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Achievements - Always visible, no truncation */}
                                        {project.achievements && (
                                            <div className="mb-6 pb-6 border-b border-gray-100 dark:border-white/5">
                                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Key Achievements</p>
                                                <ul className="space-y-2">
                                                    {(Array.isArray(project.achievements) ? project.achievements : (project.achievements || '').split('\n')).filter(a => a && a.trim()).map((achievement, i) => (
                                                        <li key={i} className="flex items-start text-sm text-gray-500 dark:text-gray-400 leading-snug">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 mr-2.5 flex-shrink-0" />
                                                            {achievement.replace(/^[•-]\s*/, '')}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Links Section */}
                                        <div className="flex gap-4">
                                            {project.liveLink && (
                                                <a
                                                    href={project.liveLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 py-3 bg-primary text-white text-center rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                                >
                                                    Live View <ExternalLink size={16} />
                                                </a>
                                            )}
                                            {project.githubLink && (
                                                <a
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 py-3 bg-gray-100 dark:bg-[#1a1a2e] text-gray-700 dark:text-white text-center rounded-xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-[#252545] transition-all flex items-center justify-center gap-2"
                                                >
                                                    Source Code <Github size={16} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Projects;

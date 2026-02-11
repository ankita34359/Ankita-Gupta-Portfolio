import { useState, useEffect } from 'react';
import { api } from '../api/config';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Loader2 } from 'lucide-react';
import { CertificateSkeleton } from './Skeleton';

const Certificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await api.get('/certificates');
                if (response.data.success) {
                    setCertificates(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching certificates:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCertificates();
    }, []);

    return (
        <section id="certificates" className="py-24 px-6 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-gray-900 dark:text-white">Certificates</h2>
                        <div className="w-full h-1.5 bg-primary rounded-full" />
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="skeleton"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {[1, 2, 3, 4].map(i => <CertificateSkeleton key={i} />)}
                        </motion.div>
                    ) : certificates.length === 0 ? (
                        <motion.div
                            key="no-content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 text-gray-500 font-medium"
                        >
                            No certificates found.
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {certificates.map((cert, idx) => (
                                <motion.div
                                    key={cert._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="group relative h-full"
                                >
                                    <div className="h-full p-4 rounded-[2rem] border border-gray-100 dark:border-white/5 bg-white dark:bg-[#12121c] shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 flex flex-col">
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-6">
                                                <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full uppercase tracking-wider">{cert.date}</span>
                                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                    <Award size={24} />
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">{cert.name}</h3>
                                            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-6">{cert.issuer}</p>

                                            {cert.description && (
                                                <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed italic">
                                                        &ldquo;{cert.description}&rdquo;
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        {cert.link && (
                                            <div className="p-6 mt-auto">
                                                <a
                                                    href={cert.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full py-4 bg-gray-50 dark:bg-[#1a1a2e] text-gray-900 dark:text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm"
                                                >
                                                    Verify Credential <ExternalLink size={16} />
                                                </a>
                                            </div>
                                        )}
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

export default Certificates;

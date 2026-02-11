import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    MessageSquare,
    LogOut,
    Search,
    Trash2,
    Calendar,
    User,
    Mail as MailIcon,
    ArrowRight,
    Loader2,
    Briefcase,
    Award,
    FileText,
    Plus,
    Edit3,
    ExternalLink,
    Github,
    Upload
} from 'lucide-react';
import { api, IMAGE_BASE_URL } from '../api/config';
import { cn } from '../lib/utils';

const AdminDashboard = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('messages');
    const [messages, setMessages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [resumePath, setResumePath] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    // Form states for adding/editing
    const [showProjectModal, setShowProjectModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [projectForm, setProjectForm] = useState({
        title: '', description: '', tech: '', image: null, category: 'Web Development Project', githubLink: '', liveLink: '', achievements: '', isFeatured: false
    });

    const [showCertificateModal, setShowCertificateModal] = useState(false);
    const [editingCertificate, setEditingCertificate] = useState(null);
    const [certificateForm, setCertificateForm] = useState({
        name: '', issuer: '', date: '', description: '', link: ''
    });

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [msgRes, projRes, certRes, resumeRes] = await Promise.allSettled([
                api.get('/messages'),
                api.get('/projects'),
                api.get('/certificates'),
                api.get('/resume')
            ]);

            if (msgRes.status === 'fulfilled' && msgRes.value.data.success) setMessages(msgRes.value.data.data.reverse());
            if (projRes.status === 'fulfilled' && projRes.value.data.success) setProjects(projRes.value.data.data);
            if (certRes.status === 'fulfilled' && certRes.value.data.success) setCertificates(certRes.value.data.data);
            if (resumeRes.status === 'fulfilled' && resumeRes.value.data.success) setResumePath(resumeRes.value.data.filePath);
        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response?.status === 401) {
                onLogout();
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteMessage = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;
        try {
            await api.delete(`/messages/${id}`);
            setMessages(messages.filter(m => m._id !== id));
            if (selectedMessage?._id === id) setSelectedMessage(null);
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    // Project Logic
    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', projectForm.title);
            formData.append('description', projectForm.description);
            formData.append('tech', projectForm.tech);
            formData.append('category', projectForm.category);
            formData.append('githubLink', projectForm.githubLink);
            formData.append('liveLink', projectForm.liveLink);
            formData.append('achievements', projectForm.achievements);
            formData.append('isFeatured', projectForm.isFeatured);

            if (projectForm.image instanceof File) {
                formData.append('image', projectForm.image);
            }

            let res;
            if (editingProject) {
                res = await api.put(`/projects/${editingProject._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setProjects(projects.map(p => p._id === editingProject._id ? res.data.data : p));
                alert('Project updated successfully!');
            } else {
                res = await api.post('/projects', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setProjects([res.data.data, ...projects]);
                alert('Project created successfully!');
            }
            setShowProjectModal(false);
            setEditingProject(null);
            setProjectForm({ title: '', description: '', tech: '', image: null, category: 'Web Development Project', githubLink: '', liveLink: '', achievements: '', isFeatured: false });
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Failed to save project. Please try again.');
        }
    };

    const deleteProject = async (id) => {
        if (!window.confirm('Delete this project?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/projects/${id}`);
            setProjects(projects.filter(p => p._id !== id));
            alert('Project deleted!');
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Failed to delete project.');
        }
    };

    // Certificate Logic
    const handleCertificateSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCertificate) {
                const res = await axios.put(`http://localhost:5000/api/certificates/${editingCertificate._id}`, certificateForm);
                setCertificates(certificates.map(c => c._id === editingCertificate._id ? res.data.data : c));
                alert('Certificate updated successfully!');
            } else {
                const res = await axios.post('http://localhost:5000/api/certificates', certificateForm);
                setCertificates([res.data.data, ...certificates]);
                alert('Certificate created successfully!');
            }
            setShowCertificateModal(false);
            setEditingCertificate(null);
            setCertificateForm({ name: '', issuer: '', date: '', description: '', link: '' });
        } catch (error) {
            console.error('Error saving certificate:', error);
            alert('Failed to save certificate.');
        }
    };

    const deleteCertificate = async (id) => {
        if (!window.confirm('Delete this certificate?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/certificates/${id}`);
            setCertificates(certificates.filter(c => c._id !== id));
            alert('Certificate deleted!');
        } catch (error) {
            console.error('Error deleting certificate:', error);
            alert('Failed to delete certificate.');
        }
    };

    // Resume Logic
    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('resume', file);
        setIsUploading(true);
        try {
            const res = await api.post('/resume/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResumePath(res.data.filePath);
            alert('Resume updated successfully!');
        } catch (error) {
            console.error('Error uploading resume:', error);
            alert('Upload failed. Only PDFs are allowed.');
        } finally {
            setIsUploading(false);
        }
    };

    // UI Helper
    const TabButton = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-semibold",
                activeTab === id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
        >
            <Icon size={18} />
            <span>{label}</span>
        </button>
    );

    const filteredMessages = messages.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black font-sans flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white dark:bg-dark-card border-r border-gray-100 dark:border-gray-800 p-6 flex flex-col justify-between h-screen sticky top-0">
                <div>
                    <div className="flex items-center space-x-2 mb-10 px-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">A</div>
                        <span className="text-xl font-bold dark:text-white">Admin</span>
                    </div>

                    <nav className="space-y-2">
                        <TabButton id="messages" icon={MessageSquare} label="Messages" />
                        <TabButton id="projects" icon={Briefcase} label="Projects" />
                        <TabButton id="certificates" icon={Award} label="Certificates" />
                        <TabButton id="resume" icon={FileText} label="Resume" />
                    </nav>
                </div>

                <button
                    onClick={onLogout}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-semibold"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-10 overflow-hidden flex flex-col h-screen">
                {activeTab === 'messages' && (
                    <>
                        <header className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold dark:text-white">Contact Messages</h1>
                                <p className="text-gray-500 text-sm mt-1">Manage inquiries from your portfolio</p>
                            </div>
                            <div className="relative hidden md:block w-72">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-dark-card dark:text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </header>
                        <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden pb-4">
                            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                                {loading ? (
                                    <div className="h-40 flex items-center justify-center"><Loader2 className="animate-spin text-primary" size={40} /></div>
                                ) : filteredMessages.length === 0 ? (
                                    <div className="bg-white dark:bg-dark-card rounded-2xl p-10 text-center border border-gray-100 dark:border-gray-800">
                                        <MessageSquare className="mx-auto mb-4 text-gray-300" size={48} />
                                        <p className="text-gray-500 font-medium font-sans">No messages found.</p>
                                    </div>
                                ) : (
                                    filteredMessages.map((msg) => (
                                        <motion.div
                                            key={msg._id}
                                            onClick={() => setSelectedMessage(msg)}
                                            className={cn("p-6 rounded-2xl border transition-all cursor-pointer group", selectedMessage?._id === msg._id ? "bg-primary/5 border-primary shadow-md" : "bg-white dark:bg-dark-card border-gray-100 dark:border-gray-800 hover:border-primary/40 shadow-sm")}
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-bold text-lg dark:text-white group-hover:text-primary transition-colors">{msg.name}</h3>
                                                <span className="text-xs text-gray-400 font-medium">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-primary text-sm font-semibold mb-2">{msg.subject}</p>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-1">{msg.message}</p>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                            <AnimatePresence mode="wait">
                                {selectedMessage && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="w-full lg:w-[450px] bg-white dark:bg-dark-card rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-2xl p-8 flex flex-col">
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center"><User size={24} /></div>
                                            <button onClick={() => deleteMessage(selectedMessage._id)} className="p-3 rounded-xl bg-red-50/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={20} /></button>
                                        </div>
                                        <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                            <div>
                                                <h2 className="text-2xl font-bold dark:text-white mb-2">{selectedMessage.name}</h2>
                                                <div className="flex items-center text-gray-500 text-sm space-x-4">
                                                    <span className="flex items-center"><MailIcon size={14} className="mr-1.5" /> {selectedMessage.email}</span>
                                                    <span className="flex items-center"><Calendar size={14} className="mr-1.5" /> {new Date(selectedMessage.createdAt).toLocaleString()}</span>
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800"><p className="font-bold dark:text-white text-sm">{selectedMessage.subject}</p></div>
                                            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm"><p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-sm">{selectedMessage.message}</p></div>
                                        </div>
                                        <a href={`mailto:${selectedMessage.email}`} className="mt-8 w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center space-x-2 hover:opacity-90 transition-all shadow-lg"><span>Reply via Email</span><ArrowRight size={18} /></a>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </>
                )}

                {activeTab === 'projects' && (
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <header className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold dark:text-white">Projects</h1>
                                <p className="text-gray-500 text-sm mt-1">Manage your dynamic project list</p>
                            </div>
                            <button
                                onClick={() => {
                                    setEditingProject(null);
                                    setProjectForm({ title: '', description: '', tech: '', image: null, category: 'Web Development Project', githubLink: '', liveLink: '', achievements: '', isFeatured: false });
                                    setShowProjectModal(true);
                                }}
                                className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all"
                            >
                                <Plus size={18} />
                                <span>Add Project</span>
                            </button>
                        </header>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 custom-scrollbar pb-10">
                            {projects.map(project => (
                                <div key={project._id} className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
                                    <div className="aspect-video w-full relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4 border border-gray-100 dark:border-gray-700">
                                        {project.image ? (
                                            <img src={`${IMAGE_BASE_URL}${project.image}`} alt={project.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">🖼️</div>
                                        )}
                                        {project.isFeatured && (
                                            <div className="absolute top-2 right-2 px-2 py-0.5 bg-amber-400 text-white text-[10px] font-bold rounded-full">Featured</div>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold dark:text-white mb-2">{project.title}</h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{project.description}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                const validCategories = ['Web Development Project', 'Machine Learning Projects'];
                                                const projectCategory = validCategories.includes(project.category)
                                                    ? project.category
                                                    : 'Web Development Project';

                                                setEditingProject(project);
                                                setProjectForm({
                                                    ...project,
                                                    category: projectCategory,
                                                    tech: project.tech.join(', '),
                                                    achievements: project.achievements ? project.achievements.join('\n') : '',
                                                    image: project.image // Keep path to not lose it if not uploading new one
                                                });
                                                setShowProjectModal(true);
                                            }}
                                            className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 hover:text-primary transition-colors"
                                        >
                                            <Edit3 size={18} />
                                        </button>
                                        <button onClick={() => deleteProject(project._id)} className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'certificates' && (
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <header className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold dark:text-white">Certificates</h1>
                                <p className="text-gray-500 text-sm mt-1">Manage your credentials</p>
                            </div>
                            <button
                                onClick={() => { setEditingCertificate(null); setCertificateForm({ name: '', issuer: '', date: '', description: '', link: '' }); setShowCertificateModal(true); }}
                                className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all"
                            >
                                <Plus size={18} />
                                <span>Add Certificate</span>
                            </button>
                        </header>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pr-2 custom-scrollbar pb-10">
                            {certificates.map(cert => (
                                <div key={cert._id} className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
                                    <Award className="text-primary mb-4" size={32} />
                                    <h3 className="text-xl font-bold dark:text-white mb-1">{cert.name}</h3>
                                    <p className="text-primary text-xs font-semibold mb-4">{cert.issuer}</p>
                                    <div className="flex gap-2">
                                        <button onClick={() => { setEditingCertificate(cert); setCertificateForm(cert); setShowCertificateModal(true); }} className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 hover:text-primary transition-colors"><Edit3 size={18} /></button>
                                        <button onClick={() => deleteCertificate(cert._id)} className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'resume' && (
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="w-full max-w-md bg-white dark:bg-dark-card rounded-[2.5rem] p-10 border border-gray-100 dark:border-gray-800 shadow-2xl text-center">
                            <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <FileText size={40} />
                            </div>
                            <h2 className="text-2xl font-bold dark:text-white mb-2">Resume Management</h2>
                            <p className="text-gray-500 mb-8">Upload your latest resume (PDF) to keep your portfolio up to date.</p>

                            {resumePath && (
                                <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Resume: resume.pdf</span>
                                    <a href={`${IMAGE_BASE_URL}${resumePath}`} target="_blank" rel="noreferrer" className="text-primary hover:underline text-sm font-bold">View</a>
                                </div>
                            )}

                            <label className={cn(
                                "cursor-pointer flex items-center justify-center space-x-2 w-full py-4 rounded-2xl font-bold transition-all shadow-lg",
                                isUploading ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-primary text-white hover:opacity-90 shadow-primary/20"
                            )}>
                                {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
                                <span>{isUploading ? 'Uploading...' : 'Upload New Resume'}</span>
                                <input type="file" className="hidden" accept=".pdf" onChange={handleResumeUpload} disabled={isUploading} />
                            </label>
                        </div>
                    </div>
                )}

                {showProjectModal && (
                    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-dark-card w-full max-w-3xl rounded-[2.5rem] p-10 overflow-y-auto max-h-[90vh] shadow-2xl border border-gray-100 dark:border-gray-800">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-bold dark:text-white">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                                <button onClick={() => setShowProjectModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">✕</button>
                            </div>
                            <form onSubmit={handleProjectSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Title</label>
                                            <input type="text" placeholder="e.g. E-Commerce Platform" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-white" required />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Category</label>
                                            <select
                                                value={projectForm.category}
                                                onChange={e => setProjectForm({ ...projectForm, category: e.target.value })}
                                                className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-white appearance-none"
                                                required
                                            >
                                                <option value="Web Development Project">Web Development Project</option>
                                                <option value="Machine Learning Projects">Machine Learning Projects</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">GitHub Link</label>
                                            <input type="text" placeholder="https://github.com/..." value={projectForm.githubLink} onChange={e => setProjectForm({ ...projectForm, githubLink: e.target.value })} className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-white" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Live Demo Link</label>
                                            <input type="text" placeholder="https://example.com" value={projectForm.liveLink} onChange={e => setProjectForm({ ...projectForm, liveLink: e.target.value })} className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-white" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Project Image</label>
                                            <div className="relative group">
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    id="projectImage"
                                                    accept="image/*"
                                                    onChange={e => setProjectForm({ ...projectForm, image: e.target.files[0] })}
                                                />
                                                <label
                                                    htmlFor="projectImage"
                                                    className="w-full aspect-video rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-all overflow-hidden bg-gray-50 dark:bg-gray-900"
                                                >
                                                    {projectForm.image ? (
                                                        projectForm.image instanceof File ? (
                                                            <img src={URL.createObjectURL(projectForm.image)} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <img src={`${IMAGE_BASE_URL}${projectForm.image}`} className="w-full h-full object-cover" />
                                                        )
                                                    ) : (
                                                        <>
                                                            <Upload size={24} className="text-gray-400 mb-2" />
                                                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Click to Upload</span>
                                                        </>
                                                    )}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Tech Stack (comma separated)</label>
                                            <input type="text" placeholder="React, Node.js, MDB" value={projectForm.tech} onChange={e => setProjectForm({ ...projectForm, tech: e.target.value })} className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-white" required />
                                        </div>
                                        <div className="flex items-center space-x-2 p-2">
                                            <input
                                                type="checkbox"
                                                id="isFeatured"
                                                checked={projectForm.isFeatured}
                                                onChange={e => setProjectForm({ ...projectForm, isFeatured: e.target.checked })}
                                                className="w-5 h-5 accent-primary cursor-pointer"
                                            />
                                            <label htmlFor="isFeatured" className="text-sm font-bold text-gray-700 dark:text-gray-300 cursor-pointer">Mark as Featured</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Short Description</label>
                                    <textarea placeholder="Tell us what the project is about..." value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-white h-24" required />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Key Achievements / Bullet Points (one per line)</label>
                                    <textarea placeholder="• Architected the system...&#10;• Integrated Stripe...&#10;• Optimized database..." value={projectForm.achievements} onChange={e => setProjectForm({ ...projectForm, achievements: e.target.value })} className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:text-white h-32" />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button type="submit" className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Save Project</button>
                                    <button type="button" onClick={() => setShowProjectModal(false)} className="px-10 py-4 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">Cancel</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {showCertificateModal && (
                    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-6">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-dark-card w-full max-w-2xl rounded-[2.5rem] p-10">
                            <h2 className="text-2xl font-bold mb-6">{editingCertificate ? 'Edit Certificate' : 'Add New Certificate'}</h2>
                            <form onSubmit={handleCertificateSubmit} className="space-y-4">
                                <input type="text" placeholder="Name" value={certificateForm.name} onChange={e => setCertificateForm({ ...certificateForm, name: e.target.value })} className="w-full p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 outline-none" required />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Issuer" value={certificateForm.issuer} onChange={e => setCertificateForm({ ...certificateForm, issuer: e.target.value })} className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 outline-none" required />
                                    <input type="text" placeholder="Date/Year" value={certificateForm.date} onChange={e => setCertificateForm({ ...certificateForm, date: e.target.value })} className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 outline-none" required />
                                </div>
                                <textarea placeholder="Description" value={certificateForm.description} onChange={e => setCertificateForm({ ...certificateForm, description: e.target.value })} className="w-full p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 outline-none h-32" />
                                <input type="text" placeholder="Verification Link" value={certificateForm.link} onChange={e => setCertificateForm({ ...certificateForm, link: e.target.value })} className="w-full p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 outline-none" />
                                <div className="flex gap-4 mt-6">
                                    <button type="submit" className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold">Save Certificate</button>
                                    <button type="button" onClick={() => setShowCertificateModal(false)} className="px-8 py-4 bg-gray-100 dark:bg-gray-800 rounded-2xl font-bold">Cancel</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;

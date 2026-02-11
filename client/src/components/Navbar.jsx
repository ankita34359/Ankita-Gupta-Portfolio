import { useState, useEffect } from 'react';
/* eslint-disable-next-line no-unused-vars */
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { cn } from '../lib/utils';

const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Experience', to: 'experience' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState(''); // Initialize with empty string or a default section if needed
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Active section detection
            const sections = navLinks.map(link => document.getElementById(link.to));
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        setActiveSection(section.id);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
                scrolled ? 'bg-light-card/80 dark:bg-black/80 backdrop-blur-md shadow-lg py-3 border-b border-gray-100 dark:border-none' : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-black tracking-tighter cursor-pointer flex items-center group mt-1"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <span className="text-primary mr-1">&lt;</span>
                    <span className="text-gray-900 dark:text-white group-hover:tracking-widest transition-all duration-300 uppercase">Ankita</span>
                    <span className="text-primary ml-1">/&gt;</span>
                </motion.div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            smooth={true}
                            duration={500}
                            spy={true}
                            offset={-70}
                            onSetActive={() => setActiveSection(link.to)}
                            className={cn(
                                'text-base font-medium transition-colors cursor-pointer hover:text-primary',
                                activeSection === link.to ? 'text-primary' : 'text-gray-600 dark:text-gray-400'
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-black border-t dark:border-gray-800 absolute top-full left-0 right-0 overflow-hidden shadow-xl"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    smooth={true}
                                    duration={500}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        'text-base font-medium transition-colors',
                                        activeSection === link.to ? 'text-primary' : 'text-gray-600 dark:text-gray-400'
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

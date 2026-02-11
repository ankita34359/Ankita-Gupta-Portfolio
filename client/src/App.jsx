import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Certificates from './components/Certificates';
import DSA from './components/DSA';
import Contact from './components/Contact';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

const Portfolio = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <Skills />
    <Projects />
    <Experience />
    <Achievements />
    <Certificates />
    <DSA />
    <Contact />
    <footer className="py-12 border-t border-gray-100 dark:border-gray-900 text-center text-gray-500 text-sm">
      <p>© {new Date().getFullYear()} Ankita Gupta. All rights reserved.</p>
      <div className="mt-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <a href="/admin" className="text-[10px] uppercase tracking-widest hover:text-primary transition-colors">Admin Portal</a>
      </div>
    </footer>
  </>
);

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  return (
    <Router>
      <main className="relative min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route
            path="/admin"
            element={
              !isAdmin ? (
                <AdminLogin onLogin={setIsAdmin} />
              ) : (
                <AdminDashboard onLogout={() => {
                  localStorage.removeItem('isAdmin');
                  localStorage.removeItem('adminToken');
                  localStorage.removeItem('adminUser');
                  setIsAdmin(false);
                }} />
              )
            }
          />
          {/* Catch all redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

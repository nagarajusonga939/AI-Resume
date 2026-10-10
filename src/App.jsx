import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AuthModal from './components/auth/AuthModal';
import ScrollToTop from './components/common/ScrollToTop';

// Pages
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import Results from './pages/Results';
import Dashboard from './pages/Dashboard';
import About from './pages/About';

function App() {
  return (
    <ResumeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text font-sans antialiased selection:bg-brand-primary/15 selection:text-brand-primary">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analyze" element={<Analyze />} />
              <Route path="/results" element={<Results />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
          <AuthModal />
        </div>
      </Router>
    </ResumeProvider>
  );
}

export default App;

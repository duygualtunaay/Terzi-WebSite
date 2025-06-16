import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { StickyContacts } from './components/ui/StickyContacts';
import { CookieConsent } from './components/ui/CookieConsent';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { SizeEstimator } from './pages/SizeEstimator';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/size-estimator" element={<SizeEstimator />} />
              </Routes>
            </main>
            <Footer />
            <StickyContacts />
            <CookieConsent />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
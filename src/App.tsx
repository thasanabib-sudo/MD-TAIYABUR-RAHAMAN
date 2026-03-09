import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import AIChat from './components/AIChat';
import Footer from './components/Footer';
import Admin from './pages/Admin';

const Home = () => (
  <div className="min-h-screen">
    <Header />
    <main>
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Events />
      <Gallery />
      <Contact />
    </main>
    <AIChat />
    <Footer />
  </div>
);

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

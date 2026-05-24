import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { track } from './utils/analytics.js';
import PWAInstallPrompt from './components/ui/PWAInstallPrompt.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Traits from './components/sections/Traits.jsx';
import Experience from './components/sections/Experience.jsx';
import Skills from './components/sections/Skills.jsx';
import Clients from './components/sections/Clients.jsx';
import GlobalReach from './components/sections/GlobalReach.jsx';
import Domains from './components/sections/Domains.jsx';
import BhutanTrips from './components/sections/BhutanTrips.jsx';
import Timeline from './components/sections/Timeline.jsx';
import Achievements from './components/sections/Achievements.jsx';
import Recommendations from './components/sections/Recommendations.jsx';
import Contact from './components/sections/Contact.jsx';

function AppInner() {
  // Fire once — detects if user launched from installed PWA
  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || window.navigator.standalone === true;
    if (isStandalone) {
      const platform = /iphone|ipad|ipod/i.test(navigator.userAgent) ? 'ios' : 'android';
      track('pwa_app_launch', { platform });
    }
  }, []);

  return null; // logic only — rendered inside ThemeProvider below
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
      <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Traits />
          <Experience />
          <Skills />
          <Clients />
          <GlobalReach />
          <Domains />
          <BhutanTrips />
          {/* <Timeline /> */}
          <Achievements />
          <Recommendations />
          <Contact />
        </main>
        <Footer />
        <PWAInstallPrompt />
      </div>
    </ThemeProvider>
  );
}

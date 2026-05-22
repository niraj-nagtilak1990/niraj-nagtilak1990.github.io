import { ThemeProvider } from './context/ThemeContext.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Traits from './components/sections/Traits.jsx';
import Experience from './components/sections/Experience.jsx';
import Skills from './components/sections/Skills.jsx';
import Clients from './components/sections/Clients.jsx';
import Domains from './components/sections/Domains.jsx';
import BhutanTrips from './components/sections/BhutanTrips.jsx';
import Timeline from './components/sections/Timeline.jsx';
import Achievements from './components/sections/Achievements.jsx';
import Recommendations from './components/sections/Recommendations.jsx';
import Contact from './components/sections/Contact.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Traits />
          <Experience />
          <Skills />
          <Clients />
          <Domains />
          <BhutanTrips />
          {/* <Timeline /> */}
          <Achievements />
          <Recommendations />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero/Hero';
import About from '../components/sections/About/About';
import Skills from '../components/sections/Skills/Skills';
import Projects from '../components/sections/Projects/Projects';
import Experience from '../components/sections/Experience/Experience';
import Certifications from '../components/sections/Certifications/Certifications';
import Contact from '../components/sections/Contact/Contact';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

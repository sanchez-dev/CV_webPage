import { useEffect } from 'react';
import './i18n';
import Header from './components/Header';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Jobs from './components/Jobs';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';


const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

function App() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };
    console.log("App updated at", new Date());
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-background">

      <Header />
      <main>
        <Hero />
        <Jobs />
        <Highlights />
      </main>
      <Footer />
    </div>
  );
}

export default App

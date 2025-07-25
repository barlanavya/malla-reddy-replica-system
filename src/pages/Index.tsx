import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Academics from '@/components/Academics';
import News from '@/components/News';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Academics />
        <News />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

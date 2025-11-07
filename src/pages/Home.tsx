
import Header from '../components/Header';
import Hero from '../components/Hero';
import News from '../components/News';
import About from '../components/About';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <News />
      </main>
      <Footer />
    </div>
  );
}
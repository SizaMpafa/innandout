import { About } from '../components/About';
import { BookingForm } from '../components/BookingForm';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Portfolio } from '../components/Portfolio';
import { Services } from '../components/Services';

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <BookingForm />
      </main>
      <Footer />
    </>
  );
}

import OptimizedImage from '../components/OptimizedImage';
import { Mail } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';

export default function Contact() {
  return (
    <>
      <Header />
      <Breadcrumb />
      {/* Hero Banner */}
      <section className="relative h-[320px] sm:h-[400px] md:h-[480px] lg:h-[520px] flex items-center justify-center mb-8">
        <OptimizedImage
          src="/images/hero/main-slider-1.jpg"
          alt="Contact GETFund"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          width={1920}
          height={520}
          priority
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-4">
          <Mail className="w-14 h-14 mb-4 text-getfund-gold drop-shadow-lg" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 drop-shadow-lg">Contact Us</h1>
          <p className="text-lg sm:text-xl max-w-2xl drop-shadow">We welcome your questions, feedback, and partnership inquiries.</p>
        </div>
      </section>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <ul className="mb-4">
                <li><strong>Address:</strong> GETFund House, 6th Avenue Extension, North Ridge, Accra, Ghana</li>
                <li><strong>Email:</strong> info@getfund.gov.gh</li>
                <li><strong>Phone:</strong> +233 302 238 136 / +233 302 238 137</li>
              </ul>
              <h2 className="text-2xl font-semibold mb-4">Office Hours</h2>
              <ul>
                <li>Monday – Friday: 8:00 AM – 5:00 PM</li>
                <li>Saturday – Sunday: Closed</li>
              </ul>
            </div>
            <form className="space-y-6">
              <div>
                <label className="block mb-2 font-semibold">Full Name</label>
                <input type="text" className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Email Address</label>
                <input type="email" className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Message</label>
                <textarea className="w-full border rounded px-3 py-2" rows={5} required></textarea>
              </div>
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-primary-dark">Send Message</button>
            </form>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Location Map</h2>
            <div className="w-full h-64 rounded-lg overflow-hidden shadow">
              <iframe
                title="GETFund Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.624073964839!2d-0.1961236846750192!3d5.570420495954998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9b0e2e2e2e2e%3A0x123456789abcdef!2sGETFund%20House!5e0!3m2!1sen!2sgh!4v1680000000000!5m2!1sen!2sgh"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
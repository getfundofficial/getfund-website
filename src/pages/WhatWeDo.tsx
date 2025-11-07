import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import Programs from '../components/Programs';

export default function WhatWeDo() {
  return (
    <div className="min-h-screen">
      <Header />
      <Breadcrumb />
      <main>
        <Programs />
      </main>
      <Footer />
    </div>
  );
}

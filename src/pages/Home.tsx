// pages/Home.jsx
import React from 'react';
import { Layout } from '../components/layouts/Layout';
import { Hero } from '../components/sections/Hero';
import { Features } from '../components/sections/Features';
import { Process } from '../components/sections/Proccess';
import { MarketInsights } from '../components/sections/MarketInsights';
import { AdvancedCalculator } from '../components/sections/AdvancedCalculator';
import { HowItWorks } from '../components/sections/HowItWorks'
import { Footer } from '../components/layouts/Footer';
import { Testimonials } from '../components/sections/Testimonials';
import { Partners } from '../components/sections/Partners';
import { Contact } from '../components/sections/Contact';
import { FAQ } from '../components/sections/FAQ';
export function Home() {
  return (
    <Layout>
      <Hero />
      <HowItWorks />
      <Features />
      <Process />
      <AdvancedCalculator />
      <MarketInsights />
      <Testimonials />
      <Partners />
      <FAQ />
      <Contact />
      {/* <Footer /> */}
    </Layout>
  );
}

export default Home;
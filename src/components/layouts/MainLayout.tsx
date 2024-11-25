// import { Header } from './Header'
// import { Footer } from './Footer'
// import { Outlet } from 'react-router-dom'
// import React from 'react'

// export function MainLayout() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
// <main className="flex-grow pt-16">
//   <Outlet />
// </main>
//       <Footer />
//     </div>
//   )
// }


// components/layouts/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ScrollProvider } from '../providers/ScrollProvider';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export const MainLayout = () => {
  return (
    <ScrollProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-grow pt-16">
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
        </main>
        <Footer />
      </div>
    </ScrollProvider>
  );
};


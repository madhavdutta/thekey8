// providers/ScrollProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useScroll as useFramerScroll } from 'framer-motion';

const ScrollContext = createContext({
  scrollY: 0,
  scrollYProgress: 0
});

import { ReactNode } from 'react';

interface ScrollProviderProps {
  children: ReactNode;
}

export function ScrollProvider({ children }: ScrollProviderProps) {
  const { scrollY, scrollYProgress } = useFramerScroll();
  const [scroll, setScroll] = useState({ scrollY: 0, scrollYProgress: 0 });

  useEffect(() => {
    const unsubscribeY = scrollY.on('change', (latest) => {
      setScroll(prev => ({ ...prev, scrollY: latest }));
    });

    const unsubscribeProgress = scrollYProgress.on('change', (latest) => {
      setScroll(prev => ({ ...prev, scrollYProgress: latest }));
    });

    return () => {
      unsubscribeY();
      unsubscribeProgress();
    };
  }, [scrollY, scrollYProgress]);

  return (
    <ScrollContext.Provider value={scroll}>
      {children}
    </ScrollContext.Provider>
  );
}

export const useScroll = () => useContext(ScrollContext);
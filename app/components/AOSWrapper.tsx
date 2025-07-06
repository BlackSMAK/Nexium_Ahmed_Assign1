'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSWrapper() {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  return null; // just runs effect
}

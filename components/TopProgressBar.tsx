// components/TopProgressBar.tsx
"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.08,
  easing: 'ease',
  speed: 500,
});

export default function TopProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Start progress when pathname changes
    NProgress.start();
    
    // Complete progress after a short delay
    const timer = setTimeout(() => {
      NProgress.done();
    }, 200);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname, searchParams]);

  useEffect(() => {
    // Handle link clicks to start progress immediately
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && !link.href.startsWith('mailto:') && !link.href.startsWith('tel:')) {
        // Check if it's an internal link
        const url = new URL(link.href);
        const currentUrl = new URL(window.location.href);
        
        // Only show progress for internal navigation
        if (url.origin === currentUrl.origin && url.pathname !== currentUrl.pathname) {
          NProgress.start();
        }
      }
    };

    // Handle router.push calls by intercepting button clicks that might trigger navigation
    const handleButtonClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button');
      
      if (button && (button.textContent?.includes('Apply') || button.getAttribute('data-navigation'))) {
        NProgress.start();
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('click', handleButtonClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('click', handleButtonClick);
    };
  }, []);

  return null;
}

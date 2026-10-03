import { draftT } from './i18n.jsx';
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
const Journey = lazy(() => import('./ConversionJourney.jsx'));
export default function DeferredJourney({ compact = false }) {
  const anchor = useRef(null);
  const [visible, setVisible] = useState(() => location.hash === '#find-your-path');
  useEffect(() => {
    if (visible) return;
    if (!('IntersectionObserver' in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: '600px 0px' });
    if (anchor.current) observer.observe(anchor.current);
    return () => observer.disconnect();
  }, [visible]);
  return <div id="find-your-path" ref={anchor} className="journey-deferred"><Suspense fallback={<div className="journey-loading" aria-live="polite">{draftT("Preparing your guide…")}</div>}>{visible ? <Journey compact={compact} /> : <div className="journey-loading" aria-hidden="true" />}</Suspense></div>;
}

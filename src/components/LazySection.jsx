import { useEffect, useRef, useState, useCallback } from 'react';

export default function LazySection({ children }) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  const handleIntersect = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.3,
      rootMargin: '0px 0px 100px 0px', // preload slightly before visible
    });

    const node = ref.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [handleIntersect]);

  return (
    <div ref={ref} className="min-h-[200px] my-4">
      {isVisible ? children : <p className="text-gray-400">Loading section...</p>}
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(false);
  const [isOverInteractive, setIsOverInteractive] = useState(false);
  const [showBlur, setShowBlur] = useState(true);
  const cursorRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    
    const updateCursor = (e) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      animationFrameId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Handle interactive elements - simple approach
    const handleMouseOver = (e) => {
      const target = e.target;

      // Simple check for common interactive elements
      const isInteractive = (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[class*="hover:"]') ||
        window.getComputedStyle(target).cursor === 'pointer'
      );
      
      setIsOverInteractive(isInteractive);
    };

    // Add event listeners to document and body for better Safari compatibility
    document.addEventListener('mousemove', updateCursor, { passive: true });
    document.body.addEventListener('mousemove', updateCursor, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    
    // Force cursor styles on Safari
    const applyCursorStyles = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        *, *::before, *::after {
          cursor: none !important;
          -webkit-cursor: none !important;
        }
        html, body {
          cursor: none !important;
          -webkit-cursor: none !important;
        }
      `;
      document.head.appendChild(style);
      return style;
    };

    const styleElement = applyCursorStyles();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      document.removeEventListener('mousemove', updateCursor);
      document.body.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <>
      {/* Cursor Arrow */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          left: position.x - 4,
          top: position.y - 4,
          width: '27px',
          height: '27px',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transform: 'translate3d(0, 0, 0)',
          transition: 'opacity 0.2s ease-out',
          willChange: 'transform, opacity',
        }}
      >
        <svg 
          width="27" 
          height="27" 
          viewBox="0 0 27 27" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="#0000FF"
          style={{
            display: 'block',
            pointerEvents: 'none',
          }}
        >
          <path d="M3.56845 0.810243L26.2559 2.17957L25.9549 7.17075L9.6562 6.18674L26.6647 23.1953L23.1292 26.7308L6.32161 9.92322L7.28352 25.8421L2.29234 26.1432L0.934752 3.64696L0.922322 3.45637L0.752451 0.640372L3.56845 0.810243Z" />
        </svg>
      </div>
    </>
  );
};

export default CustomCursor;
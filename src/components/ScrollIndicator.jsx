import React from 'react';

const ScrollIndicator = () => {
  return (
    <div 
      className="absolute bottom-[60px] left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-white text-sm text-center font-bold items-center flex gap-1 pointer-events-none shadow-lg shadow-black-500"
      style={{ backgroundColor: 'var(--color-black)' }}
    >
      <div className='inline-block text-xl text-bold'>↓</div> 
      <div className='inline-block text-lg text-bold'>Scroll</div>
    </div>
  );
};

export default ScrollIndicator;
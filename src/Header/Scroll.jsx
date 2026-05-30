import React from 'react';

function Scroll() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 scroll-indicator z-20 pointer-events-none hidden md:flex">
      <div className="scroll-indicator-bar" />
      <span className="scroll-indicator-text">scroll</span>
    </div>
  );
}

export default Scroll;
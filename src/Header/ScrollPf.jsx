import React from 'react';

function ScrollPf() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
      <div className="scroll-indicator-bar" />
      <span className="scroll-indicator-text">scroll</span>
    </div>
  );
}

export default ScrollPf;
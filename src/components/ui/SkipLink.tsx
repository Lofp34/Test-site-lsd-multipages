'use client';

import React from 'react';

const SkipLink: React.FC = () => {
  const handleSkipToMain = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkipToMain}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
      style={{
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden'
      }}
      onFocus={(e) => {
        e.target.style.position = 'fixed';
        e.target.style.top = '1rem';
        e.target.style.left = '1rem';
        e.target.style.width = 'auto';
        e.target.style.height = 'auto';
        e.target.style.overflow = 'visible';
        e.target.style.zIndex = '9999';
      }}
      onBlur={(e) => {
        e.target.style.position = 'absolute';
        e.target.style.left = '-9999px';
        e.target.style.width = '1px';
        e.target.style.height = '1px';
        e.target.style.overflow = 'hidden';
      }}
    >
      Aller au contenu principal
    </a>
  );
};

export default SkipLink;
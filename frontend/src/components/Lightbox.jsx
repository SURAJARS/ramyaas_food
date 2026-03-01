import React, { useEffect } from 'react';

export const LightboxImage = ({ src, title, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-screen" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl font-bold bg-black bg-opacity-70 hover:bg-opacity-90 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 shadow-lg z-10"
          title="Close (ESC)"
        >
          ✕
        </button>
        <img src={src} alt={title} className="max-w-full max-h-screen object-contain rounded-lg shadow-2xl" />
        {title && <p className="text-white text-center mt-4 text-lg font-semibold">{title}</p>}
      </div>
    </div>
  );
};

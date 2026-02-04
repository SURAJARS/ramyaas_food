import React from 'react';

export const LightboxImage = ({ src, title, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-screen" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl font-bold"
        >
          ✕
        </button>
        <img src={src} alt={title} className="max-w-full max-h-screen object-contain" />
        {title && <p className="text-white text-center mt-4">{title}</p>}
      </div>
    </div>
  );
};

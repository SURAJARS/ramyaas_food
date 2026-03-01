import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const ToastContainer = ({ toasts, removeToast }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleCheckout = (toastId) => {
    removeToast(toastId);
    navigate('/checkout');
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] space-y-3 max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            p-4 rounded-lg shadow-lg flex items-center justify-between gap-3 
            animate-slideIn
            ${
              toast.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-300'
                : toast.type === 'error'
                ? 'bg-red-100 text-red-800 border border-red-300'
                : 'bg-blue-100 text-blue-800 border border-blue-300'
            }
          `}
        >
          <div className="flex items-center gap-3 flex-1">
            <span className="text-xl flex-shrink-0">
              {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}
            </span>
            <div className="flex-1">
              <p className="font-semibold text-sm">{toast.message}</p>
              {toast.submessage && (
                <p className="text-xs opacity-80">{toast.submessage}</p>
              )}
            </div>
          </div>

          {toast.showCheckoutButton && (
            <button
              onClick={() => handleCheckout(toast.id)}
              className={`
                px-3 py-1 rounded font-semibold text-xs whitespace-nowrap flex-shrink-0
                transition-colors
                ${
                  toast.type === 'success'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              `}
            >
              {language === 'ta' ? 'பேமண்ட்' : 'Pay'}
            </button>
          )}
        </div>
      ))}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ToastContainer;

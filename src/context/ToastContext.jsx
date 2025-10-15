import React, { createContext, useState, useCallback } from 'react';
import Toast from '../Pages/H/Tost';

let ToastContext=createContext()


export const ToastProvider = ({ children }) => {


  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const closeToast = () => {
    setToast({ message: '', type: 'success' });
  };

  return (
    <ToastContext.Provider value={ showToast }>
      {children}
      <Toast
        message={Toast.message}
        type={Toast.type}
        onClose={closeToast}
      />
    </ToastContext.Provider>
  );
};

export {ToastContext}
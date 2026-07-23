import React, { createContext, useState, useContext } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <div className="fixed top-4 right-4 z-50 animate-bounce">
          <div className={`flex items-center gap-3 px-4 py-3 rounded shadow-lg border-l-4 bg-gray text-light ${
            alert.type === 'success' ? 'border-green-500' :
            alert.type === 'error' ? 'border-red-500' : 'border-primary'
          }`}>
            {alert.type === 'success' && <CheckCircle className="text-green-500" size={20} />}
            {alert.type === 'error' && <AlertCircle className="text-red-500" size={20} />}
            {alert.type === 'info' && <Info className="text-primary" size={20} />}
            <span className="font-medium text-sm">{alert.message}</span>
            <button onClick={() => setAlert(null)} className="ml-4 text-light hover:text-white transition">
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};

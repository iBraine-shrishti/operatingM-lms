import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
const ToastContext = createContext(undefined);
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);
    const showToast = useCallback((message, type = 'success', title) => {
        const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        const newToast = { id, message, type, title };
        setToasts((prev) => [...prev, newToast]);
        setTimeout(() => {
            removeToast(id);
        }, 4000);
    }, [removeToast]);
    return (<ToastContext.Provider value={{ showToast, removeToast }}>
      {children}

      {/* Small Right Bottom Notification Container */}
      <div aria-live="assertive" className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full sm:w-84">
        {toasts.map((toast) => {
            const isSuccess = toast.type === 'success';
            const isError = toast.type === 'error';
            const isWarning = toast.type === 'warning';
            return (<div key={toast.id} className={`pointer-events-auto flex items-start space-x-3 p-3.5 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 transform bg-white ${isSuccess
                    ? 'border-emerald-200'
                    : isError
                        ? 'border-rose-200'
                        : isWarning
                            ? 'border-amber-200'
                            : 'border-blue-200'}`}>
              {/* Status Icon */}
              <div className={`p-1.5 rounded-xl shrink-0 mt-0.5 ${isSuccess
                    ? 'bg-emerald-100 text-emerald-600'
                    : isError
                        ? 'bg-rose-100 text-rose-600'
                        : isWarning
                            ? 'bg-amber-100 text-amber-600'
                            : 'bg-blue-100 text-blue-600'}`}>
                {isSuccess && <CheckCircle2 size={17}/>}
                {isError && <AlertCircle size={17}/>}
                {isWarning && <AlertTriangle size={17}/>}
                {!isSuccess && !isError && !isWarning && <Info size={17}/>}
              </div>

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                {toast.title && (<h5 className="text-xs font-bold text-slate-900 leading-tight mb-0.5">
                    {toast.title}
                  </h5>)}
                <p className="text-xs font-semibold text-slate-700 leading-snug">
                  {toast.message}
                </p>
              </div>

              {/* Dismiss Button */}
              <button type="button" onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors shrink-0" title="Dismiss">
                <X size={14}/>
              </button>
            </div>);
        })}
      </div>
    </ToastContext.Provider>);
};
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

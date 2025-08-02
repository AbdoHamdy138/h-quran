import React from 'react';
import toast, { Toaster, ToastBar } from 'react-hot-toast';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const ToastProvider: React.FC = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 4000,
      style: {
        background: '#fff',
        color: '#374151',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        borderRadius: '0.75rem',
        padding: '16px',
      },
    }}
  >
    {(t) => (
      <ToastBar toast={t}>
        {({ icon, message }) => (
          <div className="flex items-center">
            {icon}
            <div className="ml-3 flex-1">
              {message}
            </div>
            {t.type !== 'loading' && (
              <button
                className="ml-4 text-gray-400 hover:text-gray-600"
                onClick={() => toast.dismiss(t.id)}
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </ToastBar>
    )}
  </Toaster>
);

export const showToast = {
  success: (message: string) => toast.success(message, {
    icon: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
  }),
  
  error: (message: string) => toast.error(message, {
    icon: <XCircleIcon className="w-5 h-5 text-red-500" />,
  }),
  
  info: (message: string) => toast(message, {
    icon: <InformationCircleIcon className="w-5 h-5 text-blue-500" />,
  }),
  
  loading: (message: string) => toast.loading(message),
  
  dismiss: (toastId?: string) => toast.dismiss(toastId),
};
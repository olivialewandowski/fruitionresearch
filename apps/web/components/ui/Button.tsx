'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    outline:
      'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass =
    disabled || isLoading ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

Button.displayName = 'Button';

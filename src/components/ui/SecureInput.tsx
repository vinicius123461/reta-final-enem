import React, { forwardRef } from 'react';

interface SecureInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Mantém a interface simples e compatível
}

export const SecureInput = forwardRef<HTMLInputElement, SecureInputProps>((props, ref) => {
  const { className = '', ...inputProps } = props;

  const baseClassName = `w-full px-4 py-3 rounded-xl border border-[#E8F4FD] focus:border-[#87CEEB] focus:outline-none transition-colors bg-white ${className}`;

  return (
    <input
      ref={ref}
      {...inputProps}
      className={baseClassName}
      autoComplete="off"
    />
  );
});

SecureInput.displayName = 'SecureInput';
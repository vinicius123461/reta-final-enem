import React, { forwardRef } from 'react';

interface SecureTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  // Mantém a interface simples e compatível
}

export const SecureTextarea = forwardRef<HTMLTextAreaElement, SecureTextareaProps>((props, ref) => {
  const { className = '', ...textareaProps } = props;

  const baseClassName = `w-full px-4 py-3 rounded-xl border border-[#E8F4FD] focus:border-[#87CEEB] focus:outline-none transition-colors resize-none bg-white ${className}`;

  return (
    <textarea
      ref={ref}
      {...textareaProps}
      className={baseClassName}
    />
  );
});

SecureTextarea.displayName = 'SecureTextarea';
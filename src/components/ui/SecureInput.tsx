import React, { forwardRef } from 'react';
import { useSecureTyping } from '@/hooks/useSecureTyping';

interface SecureInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: string;
  onValueChange?: (value: string) => void;
  onCommit?: (value: string) => void;
  onValidate?: (value: string) => boolean;
  debounceTime?: number;
  showTypingIndicator?: boolean;
  preventAutoSubmit?: boolean;
}

export const SecureInput = forwardRef<HTMLInputElement, SecureInputProps>(({
  value: externalValue = '',
  onValueChange,
  onCommit,
  onValidate,
  debounceTime = 2000,
  showTypingIndicator = true,
  preventAutoSubmit = true,
  className = '',
  ...props
}, ref) => {
  const {
    temporaryValue,
    handleChange,
    isTyping,
    isProcessing,
    commitValue
  } = useSecureTyping(externalValue, {
    debounceTime,
    onProcess: onCommit,
    onValidate,
    preventAutoSubmit
  });

  // Notificar mudanças para componente pai
  React.useEffect(() => {
    if (onValueChange && temporaryValue !== externalValue) {
      onValueChange(temporaryValue);
    }
  }, [temporaryValue, onValueChange, externalValue]);

  const baseClassName = `w-full px-4 py-3 rounded-xl border border-[#E8F4FD] focus:border-[#87CEEB] focus:outline-none transition-colors bg-white ${className}`;
  
  const statusClassName = isTyping 
    ? 'border-[#FFD700] shadow-sm' 
    : isProcessing 
    ? 'border-[#87CEEB] shadow-md' 
    : '';

  return (
    <div className="relative">
      <input
        ref={ref}
        {...props}
        value={temporaryValue}
        onChange={handleChange}
        className={`${baseClassName} ${statusClassName}`}
        autoComplete="off"
      />
      
      {showTypingIndicator && (isTyping || isProcessing) && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
          {isTyping && (
            <div className="flex items-center text-[#FFD700] text-xs">
              <div className="w-2 h-2 bg-[#FFD700] rounded-full animate-pulse mr-1"></div>
              <span>Digitando...</span>
            </div>
          )}
          {isProcessing && (
            <div className="flex items-center text-[#87CEEB] text-xs">
              <div className="w-2 h-2 bg-[#87CEEB] rounded-full animate-spin mr-1"></div>
              <span>Processando...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

SecureInput.displayName = 'SecureInput';
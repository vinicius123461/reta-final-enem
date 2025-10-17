import { useState, useCallback, useRef, useEffect } from 'react';

interface UseSecureTypingOptions {
  debounceTime?: number;
  onProcess?: (value: string) => void;
  onValidate?: (value: string) => boolean;
  preventAutoSubmit?: boolean;
}

interface UseSecureTypingReturn {
  value: string;
  setValue: (value: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTyping: boolean;
  isProcessing: boolean;
  temporaryValue: string;
  commitValue: () => void;
  resetValue: () => void;
}

export const useSecureTyping = (
  initialValue: string = '',
  options: UseSecureTypingOptions = {}
): UseSecureTypingReturn => {
  const {
    debounceTime = 2000, // 2 segundos por padrão
    onProcess,
    onValidate,
    preventAutoSubmit = true
  } = options;

  const [value, setValue] = useState(initialValue);
  const [temporaryValue, setTemporaryValue] = useState(initialValue);
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastKeypressRef = useRef<number>(0);

  // Limpar timer ao desmontar componente
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const currentTime = Date.now();
    
    // Atualizar valor temporário imediatamente para feedback visual
    setTemporaryValue(newValue);
    setIsTyping(true);
    lastKeypressRef.current = currentTime;

    // Limpar timer anterior se existir
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Configurar novo timer de 2 segundos
    debounceTimerRef.current = setTimeout(() => {
      // Verificar se não houve nova digitação nos últimos 2 segundos
      if (Date.now() - lastKeypressRef.current >= debounceTime - 100) {
        setIsTyping(false);
        
        // Se não deve fazer auto-submit, apenas para de processar
        if (preventAutoSubmit) {
          setIsProcessing(false);
          return;
        }

        // Validar se necessário
        if (onValidate && !onValidate(newValue)) {
          setIsProcessing(false);
          return;
        }

        // Processar valor se callback fornecido
        if (onProcess) {
          setIsProcessing(true);
          try {
            onProcess(newValue);
            setValue(newValue);
          } catch (error) {
            console.error('Erro ao processar valor:', error);
          } finally {
            setIsProcessing(false);
          }
        } else {
          setValue(newValue);
        }
      }
    }, debounceTime);
  }, [debounceTime, onProcess, onValidate, preventAutoSubmit]);

  const commitValue = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    setIsTyping(false);
    setIsProcessing(true);

    try {
      // Validar se necessário
      if (onValidate && !onValidate(temporaryValue)) {
        setIsProcessing(false);
        return false;
      }

      // Processar valor
      if (onProcess) {
        onProcess(temporaryValue);
      }
      
      setValue(temporaryValue);
      setIsProcessing(false);
      return true;
    } catch (error) {
      console.error('Erro ao confirmar valor:', error);
      setIsProcessing(false);
      return false;
    }
  }, [temporaryValue, onProcess, onValidate]);

  const resetValue = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    setIsTyping(false);
    setIsProcessing(false);
    setTemporaryValue(initialValue);
    setValue(initialValue);
  }, [initialValue]);

  const setValueDirectly = useCallback((newValue: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    setIsTyping(false);
    setIsProcessing(false);
    setTemporaryValue(newValue);
    setValue(newValue);
  }, []);

  return {
    value,
    setValue: setValueDirectly,
    handleChange,
    isTyping,
    isProcessing,
    temporaryValue,
    commitValue,
    resetValue
  };
};

export default useSecureTyping;
import { memo } from 'react';
import './Error.scss';

interface ErrorProps {
  message: string;
  details?: string;
  onRetry?: () => void;
  className?: string;
}

const Error = memo<ErrorProps>(({ 
  message, 
  details, 
  onRetry, 
  className = '' 
}) => {
  const errorClass = ['error', className].filter(Boolean).join(' ');

  return (
    <div className={errorClass} role="alert" aria-live="polite">
      <div className="error__icon">⚠️</div>
      <div className="error__content">
        <h3 className="error__title">Ops! Algo deu errado</h3>
        <p className="error__message">{message}</p>
        {details && (
          <p className="error__details">{details}</p>
        )}
        {onRetry && (
          <button 
            className="error__retry"
            onClick={onRetry}
            type="button"
          >
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
});

Error.displayName = 'Error';

export default Error;

import { memo } from 'react';
import './Loading.scss';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const Loading = memo<LoadingProps>(({ 
  size = 'md', 
  text = 'Carregando...', 
  className = '' 
}) => {
  const sizeClass = `loading--${size}`;
  const loadingClass = ['loading', sizeClass, className].filter(Boolean).join(' ');

  return (
    <div className={loadingClass} role="status" aria-live="polite">
      <div className="loading__spinner">
        <div className="loading__spinner-inner"></div>
      </div>
      {text && (
        <p className="loading__text">{text}</p>
      )}
    </div>
  );
});

Loading.displayName = 'Loading';

export default Loading;

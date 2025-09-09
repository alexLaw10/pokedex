import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.scss';



const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.textContent = 'Pular para o conteúdo principal';
skipLink.className = 'skip-link';
document.body.insertBefore(skipLink, document.body.firstChild);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

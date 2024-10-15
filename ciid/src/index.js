import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'primereact/resources/themes/saga-blue/theme.css';  // Elige el tema que prefieras
import 'primereact/resources/primereact.min.css';          // Estilos base de PrimeReact
import 'primeicons/primeicons.css';                        // Iconos de PrimeIcons


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AudioPlayerProvider } from './contexts/AudioPlayerContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { I18nProvider } from './contexts/I18nContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
      <AudioPlayerProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AudioPlayerProvider>
    </I18nProvider>
  </StrictMode>,
)

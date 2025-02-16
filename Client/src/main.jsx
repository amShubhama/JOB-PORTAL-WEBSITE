import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContexProvider } from './contex/AppContex.jsx'



createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <AppContexProvider>
        <App />
      </AppContexProvider>
    </BrowserRouter>

)

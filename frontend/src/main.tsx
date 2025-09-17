import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store.ts'
import {Provider} from 'react-redux'
import AppInitializer from './utils/AppInitializer.tsx'



createRoot(document.getElementById('root')!).render(

    <StrictMode>
      <BrowserRouter>
      <Provider store = {store}>
        <AppInitializer>
           <App />
        </AppInitializer>
      </Provider>
      </BrowserRouter>
    </StrictMode>
)

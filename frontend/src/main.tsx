import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";import { store } from './redux/store.ts'
import {Provider} from 'react-redux'
import AppInitializer from './utils/AppInitializer.tsx'



const queryclient = new  QueryClient()

createRoot(document.getElementById('root')!).render(

    <StrictMode>
      <BrowserRouter>
      <Provider store = {store}>
        <QueryClientProvider client={queryclient}>
          <AppInitializer>
            <App />
          </AppInitializer>
        </QueryClientProvider>
      </Provider>
      </BrowserRouter>
    </StrictMode>
)

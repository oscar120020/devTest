import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { Instruments } from './component/Instruments'
import { OrderBooks } from './component/OrderBooks'
import { AppProvider } from './context/AppProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={App} />
          <Route path='/order-books' Component={OrderBooks} />
          <Route path='/instruments' Component={Instruments} />
          <Route path='*' Component={App} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
)

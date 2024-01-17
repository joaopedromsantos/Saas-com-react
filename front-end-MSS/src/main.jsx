import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Dashboard from './pages/dashboard.jsx'
import Estoque from './pages/estoque.jsx'
import Marcacao from './pages/marcacao.jsx'
import Cobrar from './pages/cobranca.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path='estoque' element={<Estoque />} />
        <Route path='marcacao' element={<Marcacao />} />
        <Route path='cobrar' element={<Cobrar />} />
      </Route>
    </Routes>
  </BrowserRouter>
) 
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import './App.css'
import ProductsPage from './pages/ProductsPage'
import LoginPage from './pages/LoginPage'
import ResetPasswordPage from './pages/ResetPasswordPage'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/loginpage" />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/productspage" element={<ProductsPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

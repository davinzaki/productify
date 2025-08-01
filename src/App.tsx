import { Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardPage from './components/DashboardPage'
import { ThemeProvider } from './components/ThemeProvider'
import ProductPage from './pages/products/ProductPage'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/*" element={
          <DashboardLayout>
            <Routes>
              <Route index element={<DashboardPage />} />
              <Route path="products" element={<ProductPage />} />
            </Routes>
          </DashboardLayout>
        } />
      </Routes>
    </ThemeProvider>
  )
}

export default App

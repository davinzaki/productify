import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import DashboardLayout from './layouts/DashboardLayout'
import { ThemeProvider } from './components/ThemeProvider'
import ProductPage from './pages/products/ProductPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import { SidebarProvider } from './components/ui/sidebar'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<ProductPage />} />
      </Route>
    )
  )

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
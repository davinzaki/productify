import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import DashboardLayout from './components/layouts/DashboardLayout'
import { ThemeProvider } from './components/shared/ThemeProvider'
import ProductPage from './pages/products/ProductPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import { SidebarProvider } from './components/ui/sidebar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductCategoryPage from './pages/product-categories/ProductCategoryPage'
import { Toaster } from 'sonner'

const queryClient = new QueryClient(
  //   {
  //   defaultOptions: {
  //     queries: {
  //       refetchOnWindowFocus: false //auto hit when focus on window 
  //     }
  //   }
  // }
)

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="product-categories" element={<ProductCategoryPage />} />
      </Route>
    )
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider>
          <RouterProvider router={router} />
          <Toaster />
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
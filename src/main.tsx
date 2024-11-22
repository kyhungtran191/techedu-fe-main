import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProvider } from './context/AppContext'
import { AxiosInterceptor } from './configs/axiosInstance'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { GetCategoriesWithSubCategories } from './services/categories'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

queryClient.prefetchQuery(['categories-all'], GetCategoriesWithSubCategories)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ToastContainer closeOnClick pauseOnHover={false} pauseOnFocusLoss={false} />
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AxiosInterceptor>
          <App />
        </AxiosInterceptor>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </BrowserRouter>
)

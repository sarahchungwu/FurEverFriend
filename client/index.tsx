import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import App from './components/App'

function AppProvider() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<PetMainPage />} />
        <Route path="/detail/:id" element={<PetDetail />} />
        <Route path="/study" element={<Study />} />
        <Route path="/shop" element={<Shop />} />
      </Route>,
    ),
  )
  return <RouterProvider router={routes} />
}

document.addEventListener('DOMContentLoaded', () => {
  const queryClient = new QueryClient()
  createRoot(document.getElementById('app') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
      <AppProvider />
    </QueryClientProvider>,
  )
})

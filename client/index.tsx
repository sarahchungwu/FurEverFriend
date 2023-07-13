import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import AppLayout from './components/AppLayout/AppLayout'

function AppProvider() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route index element={<LanddingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dogs/new" element={<NewDogFormPage />} />
        {/* in the dog profile, should aslo can view MatchList */}
        <Route path="/dogs/:id" element={<DogProfilePage />} />
        <Route path="/dogs/:id/matches" element={<MatchListPage />} />
        <Route path="/dogs/:id/add-match" element={<AddMatchPage />} />
        <Route path="/massages" element={<MassageListPage />} />
        <Route path="/massages/:id" element={<MassageDatailPage />} />
        <Route path="/massages/add" element={<MassageFormPage />} />
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

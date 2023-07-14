import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import AppLayout from './components/AppLayout/AppLayout'
import AddDogFormPage from './Pages/DogPage/AddDogFormPage'
import DogProfilePage from './Pages/DogPage/DogProfilePage'
import HomePage from './Pages/HomePage/HomePage'
import LandingPage from './Pages/LandingPage/LandingPage'
import MassageDetailPage from './Pages/MessagePage/MessageDetailPage'
import MassageFormPage from './Pages/MessagePage/MessageFormPage'
import MassageListPage from './Pages/MessagePage/MessageListPage'
import AddMatchPage from './Pages/MatchPage/AddMatchPage'
import MatchListPage from './Pages/MatchPage/MatchListPage'
import ProfilePage from './Pages/Profile/ProfilePage'
import RegisterPage from './Pages/Profile/RegisterPage'
import { Auth0Provider } from '@auth0/auth0-react'
import MyDogPage from './components/Dogs/MyDogPage'

function AppProvider() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dog" element={<MyDogPage />} />
        <Route path="/dogs/new" element={<AddDogFormPage />} />
        {/* in the dog profile, should aslo can view MatchList */}
        <Route path="/dogs/:id" element={<DogProfilePage />} />
        <Route path="/dogs/:id/matches" element={<MatchListPage />} />
        <Route path="/dogs/:id/add-match" element={<AddMatchPage />} />
        <Route path="/messages" element={<MassageListPage />} />
        <Route path="/messages/:id" element={<MassageDetailPage />} />
        <Route path="/messages/add" element={<MassageFormPage />} />
      </Route>,
    ),
  )
  return <RouterProvider router={routes} />
}

document.addEventListener('DOMContentLoaded', () => {
  const queryClient = new QueryClient()
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="kahikatea-sarah.au.auth0.com"
      clientId="qYdwyt2DojsUHKdKhsT1nXMevWefz9MX"
      cacheLocation="localstorage"
      authorizationParams={{
        audience: 'https://fureverfriend/api',
        redirect_uri: window.location.origin,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AppProvider />
      </QueryClientProvider>
    </Auth0Provider>,
  )
})

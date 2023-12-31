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
import MyDogPage from './Pages/DogPage/MyDogPage'
import EditProfilePage from './Pages/Profile/EditProfilePage'
import FirstMessagePage from './Pages/MessagePage/FirstMessagePage'

function AppProvider() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AppLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/dogs" element={<MyDogPage />} />
        <Route path="/dogs/new" element={<AddDogFormPage />} />
        {/* in the dog profile, should aslo can view MatchList */}
        <Route path="/dogs/:id" element={<DogProfilePage />} />
        <Route path="/dogs/matches" element={<MatchListPage />} />
        <Route path="/dogs/:id/add-match" element={<AddMatchPage />} />
        <Route path="dogs/matches/:id" element={<FirstMessagePage />} />
        <Route path="/messages" element={<MassageListPage />} />
        <Route path="/messages/:id" element={<MassageDetailPage />} />
        <Route path="/messages/:id/add" element={<MassageFormPage />} />
      </Route>,
    ),
  )
  return <RouterProvider router={routes} />
}

document.addEventListener('DOMContentLoaded', () => {
  const queryClient = new QueryClient()
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      domain={import.meta.env.VITE_AUTH0_DOMAIN as string}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID as string}
      cacheLocation="localstorage"
      authorizationParams={{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
        redirect_uri: window.location.origin,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AppProvider />
      </QueryClientProvider>
    </Auth0Provider>,
  )
})

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { AuthProvider } from './features/auth/AuthContext'
import Home from './pages/Home'
import Vehicles from './pages/Vehicles'
import VehicleDetails from './pages/VehicleDetails'
import Login from './pages/Login'
import Admin from './pages/Admin'
import { Favorites, About, Contact, NotFound } from './pages/Pages'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/vehicles', element: <Vehicles /> },
      { path: '/vehicles/:id', element: <VehicleDetails /> },
      { path: '/favorites', element: <Favorites /> },
      { path: '/login', element: <Login /> },
      { path: '/admin', element: <Admin /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

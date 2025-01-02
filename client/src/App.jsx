import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ResetPassword from './components/ResetPassword/ResetPassword';
import OTP from './components/OTP/OTP'
import Prifile from './components/Profile/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/resetpassword',
    element: <ResetPassword />
  },
  {
    path: '/otp',
    element: <OTP />
  },
  {
    path: '/Profile',
    element: <Prifile />
  },
])

function App() {

  return (
    <>
      <main>
        <RouterProvider router={router} />
      </main>
    </>
  )
}

export default App

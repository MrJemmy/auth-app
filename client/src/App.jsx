import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ResetPassword from './components/ResetPassword/ResetPassword';
import OTP from './components/OTP/OTP'
import Profile from './components/Profile/Profile'
import ProtectedRoute from './components/Auth/ProtectedRoute';

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/profile', element: <Profile /> },
    ]
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

import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./components/authentication/Login"
import Register from "./components/authentication/Register"
import Home from './components/components_lite/Home'

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={appRoute}></RouterProvider>
    </div>
  )
}

export default App
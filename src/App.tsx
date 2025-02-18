import { createBrowserRouter, RouterProvider } from "react-router"
import Layout from "./layout"
import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"

const routers = createBrowserRouter([
  {
    path: "",
    element : <Layout/>,
    children :[
      {
        path : "/",
        element : <Home/>
      },
      {
        path : "/login",
        element : <Login/>
      },
      {
        path : "/register",
        element : <Register/>
      }
    ]
  }
])

export default function App(){
  return(
    //jsx -bable
  <RouterProvider router={routers} />
  )
}
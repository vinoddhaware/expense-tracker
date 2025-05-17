import { createBrowserRouter, RouterProvider } from "react-router-dom"
import GettingStarted from "./pages/GettingStarted"
import Login from "./pages/Login"
import Home from "./pages/Home"
import DashboardLayout from "./layout/DashboardLayout"
import { ExpenseProvider } from "./context/ExpenseContext"
import ExpenseHistory from "./pages/ExpenseHistory"

function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <GettingStarted/>
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/',
      element: <DashboardLayout/>,
      children: [
        {
          path: '/dashboard',
          element: <Home/>
        },
        {
          path: '/Expense-history',
          element: <ExpenseHistory/>
        },
      ]
    },
  ])

  return (
    <>
      <ExpenseProvider>
        <RouterProvider router={router} />
      </ExpenseProvider>
    </>

    
  )
}

export default App

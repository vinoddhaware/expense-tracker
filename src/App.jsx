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
      path: '/expense-tracker',
      element: <GettingStarted/>
    },
    {
      path: '/expense-tracker/login',
      element: <Login/>
    },
    {
      path: '/expense-tracker/dashboard',
      element: <DashboardLayout/>,
      children: [
        {
          path: '/expense-tracker/dashboard/dashboard',
          element: <Home/>
        },
        {
          path: '/expense-tracker/dashboard/Expense-history',
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

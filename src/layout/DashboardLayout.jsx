import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>      
    </>
  )
}

export default DashboardLayout

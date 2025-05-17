import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import AddExpense from '../components/AddExpense'
import { useExpense } from '../context/ExpenseContext'
import { TiThMenu } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const Navbar = () => {

  const {loginData:nickname} = useExpense();

  const [openAddExpense, setopenAddExpense] = useState(false);
  const [openMenu, setopenMenu] = useState(false);

  return (
    <div className='bg-gray-950 text-white' >
        <div className='relative w-[90%] mx-auto sm:flex sm:items-center sm:justify-between py-6 ' >
          <div onClick={()=>setopenMenu(!openMenu)} className='absolute text-xl sm:hidden p-1'>
            { openMenu ? <ImCross size={16} /> : <TiThMenu />}
          </div>
            <ul className='hidden sm:flex sm:w-full items-center gap-6'>
                <NavLink to={'/expense-tracker/dashboard'} className={'transition-all duration-300 ease-linear active:scale-95 hover:bg-gray-900'} ><li>Home</li></NavLink>
                <NavLink to={'/expense-tracker/Expense-history'} className={'transition-all duration-300 ease-linear'}><li>Expense History</li></NavLink>
            </ul>

            <div className=' sm:w-full flex justify-end items-center gap-4'>
              <h1> Hi, <span className='font-medium text-sky-500'>{nickname}</span></h1>
              <button onClick={()=>setopenAddExpense(true)} type='button' className='p-1 text-[12px] sm:text-base sm:px-2 sm:py-1.5 bg-blue-900 rounded-md cursor-pointer hover:bg-blue-900/90 active:scale-95 transition-all duration-300 ease-in-out outline-none'>+ Add Expense</button>
            </div>
        </div>

        <div className={` ${!openMenu ? "hidden": " flex flex-col justify-center items-center gap-2 bg-gray-800/30 pl-4 py-4 z-10"}`}>
            <ul className='flex flex-col justify-center items-start gap-2'>
                <NavLink to={'/dashboard'} className={'w-full transition-all duration-300 ease-linear active:scale-95 hover:bg-gray-900'} ><li>Home</li></NavLink>
                <NavLink to={'/Expense-history'} className={'w-full transition-all duration-300 ease-linear'}><li>Expense History</li></NavLink>
            </ul>
        </div>

        <AddExpense openAddExpense = {openAddExpense} setopenAddExpense = {setopenAddExpense}  />
    </div>
  )
}

export default Navbar

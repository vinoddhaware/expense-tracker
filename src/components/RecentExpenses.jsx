import React, { useState } from 'react'
import { MdDelete, MdEditSquare } from 'react-icons/md'
import { useExpense } from '../context/ExpenseContext';
import EditExpense from './EditExpense';

const RecentExpenses = ({currExpense}) => {
  const {id, category, ExpenseAmount, ExpenseName, date} = currExpense  

  const { deleteExpense} = useExpense();

  const [openEditExpense, setopenEditExpense] = useState(false) 

  return (
    <>
        <tr className='hover:bg-gray-800/40'>
            <td className='px-4 py-1 md:px-6 md:py-4 text-left tracking-wider text-nowrap'> {date} </td>
            <td className='px-4 py-1 md:px-6 md:py-4 text-left tracking-wider' > {ExpenseName} </td>
            <td className='px-4 py-1 md:px-6 md:py-4 text-left tracking-wider' > {category} </td>
            <td className='px-4 py-1 md:px-6 md:py-4 text-left tracking-wider' >₹ {ExpenseAmount} </td>
            <td className='px-6 py-1 md:px-6 md:py-4 space-x-4 sm:space-x-6 text-nowrap'>
                <button onClick={()=>setopenEditExpense(true)} className='text-xl cursor-pointer text-green-600'> <MdEditSquare /> </button>
                <button onClick={()=>deleteExpense(id)} className='text-xl cursor-pointer text-red-500'> <MdDelete /> </button>
            </td>
        </tr>

        <EditExpense openEditExpense = {openEditExpense} setopenEditExpense = {setopenEditExpense} singleExpenseData = {currExpense} />
    </>
  )
}

export default RecentExpenses

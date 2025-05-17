import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useExpense } from '../context/ExpenseContext'

const EditExpense = ({openEditExpense, setopenEditExpense, singleExpenseData}) => {
    if(!openEditExpense) return null

    const {id, category, ExpenseName, ExpenseAmount, date} = singleExpenseData

    const {expenses, setExpenses, editExpense} = useExpense();


    const handleClose = e =>  e.target === e.currentTarget ? setopenEditExpense(false) : null

    const [editExpData, setEditExpData] = useState({
        id: id,
        date: date,
        category: category,
        ExpenseName: ExpenseName,
        ExpenseAmount: ExpenseAmount,
    })

    const handleInputChange = (e) =>{
        const {name, value} = e.target
        setEditExpData((prev)=> ({...prev, [name]:value}))
    }

    const handleFormSubmit = (e) =>{
        e.preventDefault()
        editExpense(editExpData)
        setopenEditExpense(false)
    }

    const handleKeypress = (e)=>{
    const charCode = e.charCode || e.keyCode;
        const char = String.fromCharCode(charCode);
        if (!/^[A-Za-z]$/.test(char) && charCode !== 32) {
        e.preventDefault()};
    }    

  return (
    <div className='text-white fixed inset-0 py-10 flex flex-row-reverse gap-2 justify-center backdrop-blur-sm z-50'> 
        <RxCross2  onClick={handleClose} className='text-center text-xl rotate-45 hover:rotate-0 hover:scale-150 active:scale-95 transition-all duration-500 ease-in-out' />
        <form onSubmit={handleFormSubmit} className='h-[450px] w-[300px] sm:h-[76%] sm:w-[400px] bg-gray-800 rounded-2xl p-10 flex flex-col gap-6'>
            <h1 className='text-lg font-bold place-self-center ' >Edit Expense</h1>
           
            <div className='relative'> 
                <input onKeyPress={handleKeypress} onChange={handleInputChange} id='ExpenseName' name='ExpenseName' value={editExpData.ExpenseName} type="text" className='outline-none focus-within:border-b-blue-600 border-b border-white/40 w-full p-1 text-sm transition-all duration-300 ease-linear peer placeholder-transparent' placeholder='Enter Expense' autoComplete='off' required/>
                <label htmlFor="ExpenseName" className='absolute left-1 -top-3.5 text-white/50 text-[12px]  peer-placeholder-shown:top-2 transition-all duration-500 peer-focus:-top-3.5 peer-focus:text-white' > Enter Discription </label>
            </div>

            <div className='relative mt-2'>
                <input min={1} onChange={handleInputChange} name='ExpenseAmount' id='ExpenseAmount' value={editExpData.ExpenseAmount} type="number" className='outline-none focus-within:border-b-blue-600 border-b border-white/40 w-full p-1 text-sm transition-all duration-300 ease-linear peer placeholder-transparent ' placeholder='Enter Amount' autoComplete='off' required/>
                <label htmlFor="ExpenseAmount" className='absolute left-1 -top-3.5 text-[12px] text-white/50 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-white  transition-all duration-500' > Enter Amount </label>
            </div>

            <div>
                <input onChange={handleInputChange} value={editExpData.date} type="date" name="date" id="date" className='border border-white/40 w-full p-1 rounded-md focus-within:border-blue-600 outline-none text-sm cursor-pointer transition-all duration-300 ease-linear bg-gray-800' required  />
            </div>

            <select onChange={handleInputChange} name='category' value={editExpData.category} className='border border-white/40 w-full p-1 rounded-md focus-within:border-blue-600 outline-none text-sm cursor-pointer transition-all duration-300 ease-linear bg-gray-800'>
                <option defaultValue="Food" value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Bills">Bills</option>
                <option value="Others">Others</option>
            </select>               
            
            <div className='flex  justify-start items-center gap-4'>
                <button type='submit' className='text-sm px-4 py-2 bg-green-600/25 hover:bg-green-600/60 my-6 cursor-pointer active:scale-95 transition-all duration-300 ease-linear'> Upadeted to Pocket </button>

                <button onClick={()=>setopenEditExpense(false)} type='button' className='text-sm px-4 py-2 bg-gray-600/25 hover:bg-blue-600/60 my-6 cursor-pointer active:scale-95 transition-all duration-300 ease-linear'> Cancel </button>
            </div>


        </form>      
    </div>
  )
}

export default EditExpense

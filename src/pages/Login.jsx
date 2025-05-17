import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useExpense } from '../context/ExpenseContext'

const Login = () => {

  const {setLoginData}  = useExpense()
  const navigate = useNavigate()

  const [loginName, setLoginName] = useState('')

  const handleKeypress = (e)=>{
  const charCode = e.charCode || e.keyCode;
      const char = String.fromCharCode(charCode);
      if (!/^[A-Za-z]$/.test(char) && charCode !== 32) {
      e.preventDefault()};
  }
  
  const handleFormSubmit = (e) =>{
    e.preventDefault()
    if (loginName.length < 5) return alert('Input must be at least 5 characters long.');
    if (loginName.length > 15) return alert('Input must be less than 15 characters long.');
       
    setLoginData(loginName)
    navigate('/dashboard')
    setLoginName('')
   }

  return (
  <div className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-black to-gray-900 via-red-900 text-white'>
        <form onSubmit={handleFormSubmit} className='flex flex-col justify-center items-start gap-3'>
          <h1 className='text-xl font-semibold'> You are just one step away! </h1>
          <div className='flex flex-col justify-center items-center bg-white/10 p-10 rounded-3xl gap-8'>
            <div className='relative'>
              <input autoComplete='off' onKeyPress={handleKeypress} onChange={e=>setLoginName(e.target.value)} value={loginName} type="text" id='nickname' name='nickname' placeholder='Nickname' className='border-b p-1 font-semibold text-lg outline-none focus-within:border-b-blue-600 peer placeholder-transparent transition-all duration-300 ease-linear' required />
              <label htmlFor="nickname" className='absolute text-base -top-3.5 left-1 sm:text-lg font-semibold peer-placeholder-shown:text-gray-300/60 peer-placeholder-shown:top-1 peer-focus:-top-3.5 peer-focus:text-white transition-all duration-300 ease-linear'> Enter Name </label>
            </div>        
          </div>
          <button type='submit' className='cursor-pointer text-2xl bg-white/90 text-red-950/80 px-4 py-2 rounded-full mt-4 place-self-end'> Let's go </button>
        </form>
        
    </div>
  )
}

export default Login

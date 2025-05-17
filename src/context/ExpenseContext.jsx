import { createContext, useContext, useEffect, useState } from "react";

const ExpenseContext = createContext()

export const ExpenseProvider = ({children}) =>{

const [loginData, setLoginData] = useState(()=> JSON.parse(localStorage.getItem("expenses-tracker-usename")) || '')
const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses-tracker');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem('expenses-tracker', JSON.stringify(expenses));
    localStorage.setItem('expenses-tracker-usename', JSON.stringify(loginData));
  }, [expenses, loginData]);

  const deleteExpense = (id) => {
    const updatedExp = expenses.filter((exp) => exp.id !== id)
    setExpenses(updatedExp);
  };  

  const editExpense = (updatedExpense) => {
    const updatedExp = expenses.map((exp) => (exp.id === updatedExpense.id ? updatedExpense : exp))
    setExpenses(updatedExp);
  };
  
  const monthlySummary = expenses.reduce((acc, expense) => {    
    const date = new Date(expense.date);
    const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
    if (!acc[monthYear]) {
        acc[monthYear] = { total: 0, categories: {} };
      }
    acc[monthYear].total += Number(expense.ExpenseAmount);
    acc[monthYear].categories[expense.category] =
      (acc[monthYear].categories[expense.category] || 0) + Number(expense.ExpenseAmount);
    return acc;
  }, {});  

  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.ExpenseAmount);
      return acc;
    }, {});

  const data = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };    

    return <ExpenseContext.Provider value={{expenses, setExpenses, deleteExpense, editExpense, monthlySummary, categoryData, data, loginData, setLoginData}} >{children}</ExpenseContext.Provider>
}


export const useExpense = () => useContext(ExpenseContext)

import React from 'react'
import { useExpense } from '../context/ExpenseContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = () => {

  const { categoryData, data } = useExpense();

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold mb-4">Spending by Category</h2>
      {Object.keys(categoryData).length === 0 ? (
        <p className="text-gray-500">No data to display.</p>
      ) : (
        <div className="max-w-sm mx-auto ">
          <Pie data={data} />
        </div>
      )}
    </div>
  )
}

export default CategoryPieChart

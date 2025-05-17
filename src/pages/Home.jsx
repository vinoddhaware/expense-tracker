import { Delete, DeleteIcon, Edit, Wallet } from "lucide-react";
import React, { useState } from "react";
import { BiWallet } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import RecentExpenses from "../components/RecentExpenses";
import { useExpense } from "../context/ExpenseContext";
import CategoryPieChart from "../components/CategoryPieChart";

const Home = () => {
  const { expenses, monthlySummary } = useExpense();

  const [expenseName, setExpenseName] = useState('')
  const totalBalance = expenses.map((exp) => exp.ExpenseAmount);
  const availableBalance = totalBalance.reduce(
    (accum, currAmount) => +accum + +currAmount,
    0
  );

  const totalFoodExpense = expenses.filter((exp) => exp.category === "Food");
  const totalTravalExpense = expenses.filter(
    (exp) => exp.category === "Travel"
  );
  const totalBillsExpense = expenses.filter((exp) => exp.category === "Bills");
  const totalOthersExpense = expenses.filter(
    (exp) => exp.category === "Others"
  );

  const totalExpenseFood = totalFoodExpense.map((exp) => exp.ExpenseAmount);
  const foodSum = totalExpenseFood.reduce(
    (accum, currAmount) => +accum + +currAmount,
    0
  );

  const totalExpenseTraval = totalTravalExpense.map((exp) => exp.ExpenseAmount);
  const travelSum = totalExpenseTraval.reduce(
    (accum, currAmount) => +accum + +currAmount,
    0
  );

  const totalExpenseBills = totalBillsExpense.map((exp) => exp.ExpenseAmount);
  const billSum = totalExpenseBills.reduce(
    (accum, currAmount) => +accum + +currAmount,
    0
  );

  const totalExpenseOthers = totalOthersExpense.map((exp) => exp.ExpenseAmount);
  const othersSum = totalExpenseOthers.reduce(
    (accum, currAmount) => +accum + +currAmount,
    0
  );

  const filterByExpense = expenses.filter((exp)=> exp.ExpenseName.includes(expenseName)) 

  return (
    <div className={` bg-gray-950 text-white `}>
      <div className="grid grid-cols-3 gap-4 lg:gap-6 w-[90%] mx-auto py-10">
        <div className="col-span-2 md:col-span-1 flex justify-start items-center gap-4 bg-gray-900 rounded-lg p-4 lg:p-6 shadow-md ">
          <div className="p-3 lg:p-4 bg-gray-800 rounded-full text-green-600">
            <Wallet />
          </div>
          <div className="flex flex-col justify-start items-start gap-1">
            <span className="text-base lg:text-lg font-bold ">
              Total Expense
            </span>
            <span>₹ {availableBalance.toFixed(2)}</span>
          </div>
        </div>

        <div className="col-span-3 md:col-span-2  flex justify-start items-center gap-4 bg-gray-900 rounded-lg p-6 md:p-4 lg:p-6 shadow-md ">
          <div className="p-3 lg:p-4 bg-gray-800 text-2xl rounded-full text-blue-700">
            <MdCategory />
          </div>
          <div className="flex flex-col justify-start items-start gap-1">
            <span className="text-base lg:text-lg font-bold">
              Total Category Expense
            </span>
            <ul className="flex flex-col sm:flex-row   sm:items-center text-sm gap-2 sm:gap-4 lg:gap-6 xl:text-base xl:gap-8 2xl:gap-14">
              <li className="flex flex-row md:flex-col items-start lg:flex-row gap-2 lg:gap-2">
                {" "}
                Food: <span>₹ {foodSum.toFixed(2)}</span>{" "}
              </li>
              <li className="flex flex-row md:flex-col items-start lg:flex-row gap-2 lg:gap-2">
                {" "}
                Travel: <span>₹ {travelSum.toFixed(2)}</span>{" "}
              </li>
              <li className="flex flex-row md:flex-col items-start lg:flex-row gap-2 lg:gap-2">
                {" "}
                Bills: <span>₹ {billSum.toFixed(2)}</span>{" "}
              </li>
              <li className="flex flex-row md:flex-col items-start lg:flex-row gap-2 lg:gap-2">
                {" "}
                Others: <span>₹ {othersSum.toFixed(2)}</span>{" "}
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 shadow-md col-span-3 md:col-span-2">
          <CategoryPieChart />
        </div>

        <div className="bg-gray-900 rounded-lg p-6 shadow-md col-span-3 md:col-span-1 ">
          <div className="container mx-auto bg-gray-900">
            <h2 className="text-base lg:text-lg font-bold mb-4">
              Recent Monthly Summary
            </h2>
            {Object.keys(monthlySummary).length === 0 ? (
              <p className="text-gray-500">No expenses to summarize.</p>
            ) : (
              <div className="flex flex-col sm:row md:flex-col justify-between ">
                {Object.entries(monthlySummary)
                  .slice()
                  .reverse()
                  .slice(0, 3)
                  .map(([monthYear, data]) => (
                    <div
                      key={monthYear}
                      className="mb-6 bg-gray-800/40 px-6 py-4 md:p-4 rounded-lg shadow-md"
                    >
                      <h3 className="text-base lg:text-lg font-semibold">
                        {monthYear}
                      </h3>
                      <p className="">Total: ₹ {data.total.toFixed(2)}</p>
                      <h4 className=" g:font-medium mt-2">By Category:</h4>
                      <ul className="list-disc pl-5 text-sm lg:text-base ">
                        {Object.entries(data.categories).map(
                          ([category, ExpenseAmount]) => (
                            <li key={category} className="lowercase">
                              {category}: ₹ {ExpenseAmount.toFixed(2)}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {expenses.length >= 1 ? (
          <div
            className={`w-full col-span-3 bg-gray-900 rounded-lg p-6 shadow-md space-y-2 `}
          >
            <div className="flex flex-col gap-2 sm:flex-row  sm:justify-between sm:items-center">
              <h1 className="text-base lg:text-lg font-bold">
                Recent 4 Expenses
              </h1>
              <div>
                <input onChange={e=> setExpenseName(e.target.value)} value={expenseName} type="text" className=" border border-gray-500 placeholder:text-gray-600 px-2 outline-none rounded-sm w-[50%] sm:w-full" placeholder="search by Expense" />
              </div>
            </div>
            <div className="overflow-x-scroll sm:overflow-x-hidden scrollbar-thin w-full">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-1 md:px-6 md:py-2 text-left tracking-wider">
                      {" "}
                      Date{" "}
                    </th>
                    <th className="px-4 py-1 md:px-6 md:py-2 text-left tracking-wider">
                      {" "}
                      Expense{" "}
                    </th>
                    <th className="px-4 py-1 md:px-6 md:py-2 text-left tracking-wider">
                      {" "}
                      Category{" "}
                    </th>
                    <th className="px-4 py-1 md:px-6 md:py-2 text-left tracking-wider">
                      {" "}
                      Amount{" "}
                    </th>
                    <th className="px-6 py-1 md:px-6 md:py-2 text-left tracking-wider">
                      {" "}
                      Action{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filterByExpense
                    .slice()
                    .reverse()
                    .slice(0, 4)
                    .map((currExpense) => (
                      <RecentExpenses
                        key={currExpense.id}
                        currExpense={currExpense}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div
            className={` flex-col col-span-3 bg-gray-900 rounded-lg p-6 shadow-md`}
          >
            <h1 className="text-base lg:text-lg">Recent Expenses</h1>
            <div className="overflow-x-scroll sm:overflow-x-hidden sm:overflow-y-hidden  scroll-smoot scrollbar-thin">
              <table className="min-w-full border-b border-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-2 text-left tracking-wider">
                      {" "}
                      Date{" "}
                    </th>
                    <th className="px-6 py-2 text-left tracking-wider">
                      {" "}
                      Expense{" "}
                    </th>
                    <th className="px-6 py-2 text-left tracking-wider">
                      {" "}
                      Category{" "}
                    </th>
                    <th className="px-6 py-2 text-left tracking-wider">
                      {" "}
                      Amount{" "}
                    </th>
                    <th className="px-6 py-2 text-left tracking-wider">
                      {" "}
                      Action{" "}
                    </th>
                  </tr>
                </thead>
              </table>
              <div className="flex flex-col justify-center items-center tracking-wider h-56">
                <h1> No Expenses Available</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

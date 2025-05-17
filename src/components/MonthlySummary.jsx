import { useContext, useState } from "react";
import { useExpense } from "../context/ExpenseContext";
import RecentExpenses from "./RecentExpenses";

function MonthlySummary() {
  const { monthlySummary, expenses } = useExpense();

  return (
    <div className="grid grid-cols-3 gap-6  w-[90%] mx-auto py-8">
      <div className="col-span-3 lg:col-span-1 lg:container lg:mx-auto p-6 bg-gray-900 rounded-lg shadow-md  ">
        <h2 className="text-lg font-bold mb-4">Monthly Spending Summary</h2>
        {Object.keys(monthlySummary).length === 0 ? (
          <p className="text-gray-500">No expenses to summarize.</p>
        ) : (
          <div className="sm:h-[90vh] overflow-y-scroll scroll-smooth scrollbar-thin">
            {Object.entries(monthlySummary).map(([monthYear, data]) => (
              <div
                key={monthYear}
                className="mb-6 bg-gray-800/40 p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold">{monthYear}</h3>
                <p className="">Total: ₹ {data.total.toFixed(2)}</p>
                <h4 className="font-medium mt-2">By Category:</h4>
                <ul className="list-disc pl-5">
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
      <div className="col-span-3 lg:col-span-2">
        {expenses.length >= 1 ? (
          <div
            className={`col-span-3 mt- p-6 bg-gray-900 rounded-lg shadow-md`}
          >
            <h1 className="text-lg font-bold"> Expenses History</h1>
            <div className="sm:h-[92vh] overflow-x-scroll sm:overflow-x-hidden overflow-y-hidden sm:overflow-y-scroll scroll-smoot scrollbar-thin">
              <table className="min-w-full divide-y divide-gray-700 bg-gray-900 rounded-lg shadow-md mt-4 ">
                <thead>
                  <tr>
                    <th className="px-4 py-1 md:px-6 md:py-2 text-left tracking-wider text-nowrap">
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
                    <th className="px-4 py-1 md:px-6 md:py-2 text-left tracking-wider">
                      {" "}
                      Action{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((currExpense) => (
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
            className={` sm:h-[90vh] flex-col col-span-3 bg-gray-900 rounded-lg p-6 shadow-md `}
          >
            <h1 className="text-lg">Recent Expenses</h1>
            <div className="overflow-x-scroll sm:overflow-x-hidden sm:overflow-y-hidden  scroll-smoot scrollbar-thin">
              <table className="min-w-full border-b border-gray-700">
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
                    <th className="px-4 py-1 md:px-6 md:py-2 text-left tracking-wider">
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
}

export default MonthlySummary;

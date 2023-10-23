import React, { useEffect, useState } from "react";
import axios from "axios";

const IncomeExpense = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://localhost:7151/api/Base/GetAllIncomeAndExpenses");
      const jsonData = response.data;
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter income data from the 'data' array
  const incomeData = data.filter((item) => item.type === 1);

  // Create an array to hold income values for each month
  const incomeByMonth = new Array(12).fill(0);

  // Create an array to hold cumulative income values
  const cumulativeIncome = new Array(12).fill(0);

  // Populate the income values by month and calculate cumulative income
  incomeData.forEach((item) => {
    const monthIndex = parseInt(item.yearMonth.split("-")[1]) - 1;
    incomeByMonth[monthIndex] += item.amount;
    if (monthIndex === 0) {
      cumulativeIncome[monthIndex] = incomeByMonth[monthIndex];
    } else {
      cumulativeIncome[monthIndex] = cumulativeIncome[monthIndex - 1] + incomeByMonth[monthIndex];
    }
  });

  return (
    <div>
      <table border="1">
        <caption><b>Year 2021</b></caption>
        <thead>
          <tr>
            <th>Month</th>
            <th>January</th>
            <th>February</th>
            <th>March</th>
            <th>April</th>
            <th>May</th>
            <th>June</th>
            <th>July</th>
            <th>August</th>
            <th>September</th>
            <th>October</th>
            <th>November</th>
            <th>December</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Income</td>
            {incomeByMonth.map((income, index) => (
              <td key={index}>{income}</td>
            ))}
          </tr>
          <tr>
            <td>Cumulative Income</td>
            {cumulativeIncome.map((cumulative, index) => (
              <td key={index}>{cumulative}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IncomeExpense;

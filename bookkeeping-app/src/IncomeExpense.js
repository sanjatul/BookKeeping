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

  const incomeData = data.filter((item) => item.type === 1);
  const costData = data.filter((item) => item.type === 2);

  const incomeByMonth = new Array(12).fill(0);
  const costByMonth = new Array(12).fill(0);

  const cumulativeIncome = new Array(12).fill(0);
  const cumulativeCost = new Array(12).fill(0);

  incomeData.forEach((item) => {
    const monthIndex = parseInt(item.yearMonth.split("-")[1]) - 1;
    incomeByMonth[monthIndex] += item.amount;
    if (monthIndex === 0) {
      cumulativeIncome[monthIndex] = incomeByMonth[monthIndex];
    } else {
      cumulativeIncome[monthIndex] = cumulativeIncome[monthIndex - 1] + incomeByMonth[monthIndex];
    }
  });

  costData.forEach((item) => {
    const monthIndex = parseInt(item.yearMonth.split("-")[1]) - 1;
    costByMonth[monthIndex] += item.amount;
    if (monthIndex === 0) {
      cumulativeCost[monthIndex] = costByMonth[monthIndex];
    } else {
      cumulativeCost[monthIndex] = cumulativeCost[monthIndex - 1] + costByMonth[monthIndex];
    }
  });

  // Calculate the "Result" row by subtracting cost from income for each month
  const resultByMonth = incomeByMonth.map((income, index) => income - costByMonth[index]);

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
          <tr>
            <td>Cost</td>
            {costByMonth.map((cost, index) => (
              <td key={index}>{cost}</td>
            ))}
          </tr>
          <tr>
            <td>Cumulative Cost</td>
            {cumulativeCost.map((cumulative, index) => (
              <td key={index}>{cumulative}</td>
            ))}
          </tr>
          <tr>
            <td>Result</td>
            {resultByMonth.map((result, index) => (
              <td key={index}>{result}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IncomeExpense;

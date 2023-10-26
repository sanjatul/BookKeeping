import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";

const IncomeExpense = ({onResultByMonthChange}) => {
  const [data, setData] = useState([]);
  const [monthData, setMonthData] = useState([])

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
  
  const prevResult = useRef(resultByMonth)

  function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    for (let i = 0; i < arr1.length; i++) {
      if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
        if (!areArraysEqual(arr1[i], arr2[i])) {
          return false;
        }
      } else if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
  
    return true;
  }
  

  useEffect(()=>{
    if(!areArraysEqual(resultByMonth,prevResult.current)){
      onResultByMonthChange(resultByMonth)
      prevResult.current=resultByMonth
    }
  },[resultByMonth,onResultByMonthChange])

  return (
    <div>
      <table style={{ border: "1px solid black" }}>
        <caption style={{ border: "1px solid black" }}><b>Year 2021</b></caption>
        <thead>
          <tr>
           <th style={{ border: "1px solid black", width: "77px" }}></th>
            <th style={{ border: "1px solid black", width: "78px" }}></th>
            <th style={{ border: "1px solid black", width: "78px" }}>January</th>
            <th style={{ border: "1px solid black", width: "78px" }}>February</th>
            <th style={{ border: "1px solid black", width: "78px" }}>March</th>
            <th style={{ border: "1px solid black", width: "78px" }}>April</th>
            <th style={{ border: "1px solid black", width: "78px" }}>May</th>
            <th style={{ border: "1px solid black", width: "78px" }}>June</th>
            <th style={{ border: "1px solid black", width: "78px" }}>July</th>
            <th style={{ border: "1px solid black", width: "78px" }}>August</th>
            <th style={{ border: "1px solid black", width: "78px" }}>September</th>
            <th style={{ border: "1px solid black", width: "78px" }}>October</th>
            <th style={{ border: "1px solid black", width: "78px" }}>November</th>
            <th style={{ border: "1px solid black", width: "78px" }}>December</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <th style={{ border: "1px solid black", width: "77px" }}></th>
            <td style={{ width: "78px", border: "1px solid black" }}><b>Income</b></td>
            {incomeByMonth.map((income, index) => (
              <td style={{ width: "78px", border: "1px solid black" }} key={index}>{income}</td>
            ))}
          </tr>
          <tr>
          <th style={{ border: "1px solid black", width: "77px" }}></th>
            <td style={{ width: "78px", border: "1px solid black" }}><b>Cumulative Income</b></td>
            {cumulativeIncome.map((cumulative, index) => (
              <td style={{ width: "78px", border: "1px solid black" }} key={index}>{cumulative}</td>
            ))}
          </tr>
          <tr>
          <th style={{ border: "1px solid black", width: "77px" }}></th>
            <td style={{ width: "78px", border: "1px solid black" }}><b>Cost</b></td>
            {costByMonth.map((cost, index) => (
              <td style={{ width: "78px", border: "1px solid black" }} key={index}>{cost}</td>
            ))}
          </tr>
          <tr>
          <th style={{ border: "1px solid black", width: "77px" }}></th>
            <td style={{ width: "78px", border: "1px solid black" }}><b>Cumulative Cost</b></td>
            {cumulativeCost.map((cumulative, index) => (
              <td style={{ width: "78px", border: "1px solid black" }} key={index}>{cumulative}</td>
            ))}
          </tr>
          <tr>
          <th style={{ border: "1px solid black", width: "77px" }}></th>
            <td style={{ width: "78px", border: "1px solid black" }}><b>Result</b></td>
            {resultByMonth.map((result, index) => (
              <td style={{ width: "78px", border: "1px solid black" }} key={index}>{result}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IncomeExpense;

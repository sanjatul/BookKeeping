import React, { useEffect, useState } from "react";
import axios from "axios";

const Reconciliation = ({ resultByMonth }) => {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("https://localhost:7151/api/Base/GetAllBookKeepingData");
      const jsonData = response.data;
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Organize the data by incomeOrExpenseTypeId and month
    const newData = {};
    data.forEach((item) => {
      if (!newData[item.incomeOrExpenseTypeId]) {
        newData[item.incomeOrExpenseTypeId] = {
          id: item.incomeOrExpenseTypeId,
          type: item.type,
          name: item.name,
          months: Array(12).fill(0),
        };
      }
      const month = new Date(item.yearMonth).getMonth(); // Extract the month index
      newData[item.incomeOrExpenseTypeId].months[month] = item.amount;
    });

    // Ensure that items with no associated id have id set to 0
    Object.values(newData).forEach((item) => {
      if (!item.id) {
        item.id = 0;
      }
    });

    setTableData(newData);
  }, [data]);

 
  const stringifyData = (data) => {
    // Helper function to recursively stringify all values in the data object
    for (const key in data) {
      if (typeof data[key] === "object") {
        stringifyData(data[key]);
      } else {
        data[key] = String(data[key]);
      }
    }
    return data;
  };
  
  const handleEdit = (updatedData) => {
    // Convert all values to strings
    const stringifiedData = stringifyData(updatedData);
  
    // Handle the edited data here
    //console.log("Edited Data (Stringified):", updatedData);
  
    // Assuming you have the axios instance set up, you can send a POST request
    axios.post("https://localhost:7151/api/Base/ModifyBookKeepingData", stringifiedData, {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        console.log("POST request successful:", response);
        // You can handle success, update state, or perform other actions here
      })
      .catch((error) => {
        console.error("POST request failed:", error);
        // Handle errors or display an error message to the user
      });
  };
  

  const handleInputKeyPress = (e, incomeOrExpenseTypeId, month, amount, id) => {
  if (e.key === "Enter") {
    // Check if the input value is not empty
    if (amount.trim() !== "") {
      // Call the handleEdit method with the updated data
      month = month + 1;
      handleEdit({
        incomeOrExpenseTypeId,
        month,
        amount,
        id,
      });
    } else {
      // Optionally, you can provide feedback to the user that the input is empty.
      console.log("Input field is empty. Please enter a valid value.");
    }
  }
};


  // Calculate the sum of income and expenses for each month
  const reconciliationResult = Array(12).fill(0);

  Object.values(tableData).forEach((item) => {
    item.months.forEach((value, index) => {
      reconciliationResult[index] += item.type === 1 ? value : -value;
    });
  });
// Calculate the total reconciliation result by adding reconciliationResult and resultByMonth
const totalResult = reconciliationResult.map((result, index) => result + resultByMonth[index]);

  const renderTable = () => {
  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const cumulativeFinalResult = Array(12).fill(0);
  
  return (
    <div>
      <table style={{ border: "1px solid black" }}>
        <caption style={{ border: "1px solid black" }}>
          <b>Reconciliation</b>
        </caption>
        <thead></thead>
        <tbody>
          {Object.values(tableData).map((item) => (
            <tr key={item.id}>
              <td style={{ width: "74px", border: "1px solid black" }}>
                {item.type === 1 ? "Income" : "Expense"}
              </td>
              <td style={{ width: "70px", border: "1px solid black" }}>
                {item.name}
              </td>
              {item.months.map((value, index) => {
                const cumulativeSum = item.type === 1 ? value : -value;
                cumulativeFinalResult[index] += cumulativeSum;
                return (
                  <td style={{ width: "70px", border: "1px solid black" }} key={index}>
                    <input
                      type="number"
                      value={value}
                      style={{ width: "70px" }}
                      onChange={(e) => {
                        // Create a copy of the table data
                        const updatedTableData = { ...tableData };

                        // Update the value in the copy
                        updatedTableData[item.id].months[index] = parseFloat(e.target.value);

                        // Update the state with the updated data
                        setTableData(updatedTableData);
                      }}
                      onKeyPress={(e) =>
                        handleInputKeyPress(e, item.id, index, e.target.value, data.find((itemData) =>
                          itemData.incomeOrExpenseTypeId === item.id &&
                          new Date(itemData.yearMonth).getMonth() === index
                        )?.id || 0)
                      }
                    />
                  </td>
                );
              })}
            </tr>
          ))}
          {/* Reconciliation Result Row */}
          <tr>
            <td style={{ width: "70px", border: "1px solid black" }}>
            </td>
            <td style={{ width: "70px", border: "1px solid black" }}>
              Reconciliation Result
            </td>
            {reconciliationResult.map((result, index) => (
              <td style={{ width: "70px", border: "1px solid black" }} key={index}>
                {result}
              </td>
            ))}
          </tr>
          {/* Final Result Row */}
          <tr>
            <td style={{ width: "70px", border: "1px solid black" }}>
            </td>
            <td style={{ width: "70px", border: "1px solid black" }}>
              Final Result
            </td>
            {totalResult.map((result, index) => (
              <td style={{ width: "70px", border: "1px solid black" }} key={index}>
                {result}
              </td>
            ))}
          </tr>
          {/* Cumulative Final Result Row */}
          <tr>
            <td style={{ width: "70px", border: "1px solid black" }}>
            </td>
            <td style={{ width: "70px", border: "1px solid black" }}>
              Cumulative Final Result
            </td>
            {cumulativeFinalResult.map((result, index) => (
              <td style={{ width: "70px", border: "1px solid black" }} key={index}>
                {result}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};


  return (
    <div>{renderTable()}</div>
  );
};

export default Reconciliation;


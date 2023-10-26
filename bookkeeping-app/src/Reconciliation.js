import React, { useEffect, useState } from "react";
import axios from "axios";

const Reconciliation = ({ resultByMonth }) => {
  //console.log(resultByMonth);
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

 
  const handleEdit = (updatedData) => {
    // Handle the edited data here
    console.log("Edited Data:", updatedData);
  
    // Assuming you have the axios instance set up, you can send a POST request
    axios.post("https://localhost:7151/api/Base/CreateBookKeepingData", JSON.stringify(updatedData), {
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
  

  const handleInputKeyPress = (e, incomeOrExpenseTypeId, month, value, id) => {
    if (e.key === "Enter") {
      // Call the handleEdit method with the updated data
      month=month+1;
      handleEdit({
        incomeOrExpenseTypeId,
        month,
        value,
        id,
      });
    }
  };

  // Calculate the sum of income and expenses for each month
  const reconciliationResult = Array(12).fill(0);

  Object.values(tableData).forEach((item) => {
    item.months.forEach((value, index) => {
      reconciliationResult[index] += item.type === 1 ? value : -value;
    });
  });

  const renderTable = () => {
    if (data.length === 0) {
      return <div>Loading...</div>;
    }

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
                <td style={{ width: "70px", border: "1px solid black" }}>
                  {item.type === 1 ? "Income" : "Expense"}
                </td>
                <td style={{ width: "70px", border: "1px solid black" }}>
                  {item.name}
                </td>
                {item.months.map((value, index) => (
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
                ))}
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


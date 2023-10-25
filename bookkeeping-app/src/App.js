import './App.css';
import IncomeExpense from './IncomeExpense';
import Reconciliation from './Reconciliation';
import React, { useState } from 'react';

function App() {
  const [resultByMonth, setResultByMonth] = useState([]);

  const handleResultByMonthChange = (resultData) => {
    console.log(resultData);
    setResultByMonth(resultData);
  }

  return (
    <div className="App">
      <IncomeExpense onResultByMonthChange={handleResultByMonthChange} />
      <Reconciliation />
    </div>
  );
}

export default App;

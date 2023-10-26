import './App.css';
import IncomeExpense from './IncomeExpense';
import Reconciliation from './Reconciliation';
import React, { useState } from 'react';

function App() {
  const [resultByMonth, setResultByMonth] = useState([]);

  const handleResultByMonthChange = (resultData) => {
    setResultByMonth(resultData);
  }

  return (
    <div className="App">
      <IncomeExpense onResultByMonthChange={handleResultByMonthChange} />
      <Reconciliation resultByMonth={resultByMonth}/>
    </div>
  );
}

export default App;

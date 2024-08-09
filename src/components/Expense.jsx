import React, { useState } from "react";
import "../components/Expense.css";

const Expense = () => {
  const [transactions, setTransactions] = useState([]);
  const [subjectText, setSubjectText] = useState("");
  const [incomeText, setIncomeText] = useState("");
  const [expenseText, setExpenseText] = useState("");

  let income = 0;
  transactions.forEach((item) => {
    if (item.amount > 0) {
      income += item.amount;
    }
  });

  income = income.toFixed(2);

  let expense = 0;
  transactions.forEach((item) => {
    if (item.amount < 0) {
      expense -= item.amount;
    }
  });

  expense = expense.toFixed(2);

  const balance = (income - expense).toFixed(2);

  const addTransaction = (e) => {
    e.preventDefault();
    const incomeAmount = parseFloat(incomeText);
    const expenseAmount = parseFloat(expenseText);
    if (!subjectText || (!incomeText && !expenseText)) {
      alert("Please enter a transaction subject and an amount.");
      return;
    }
    const amount = incomeAmount || -Math.abs(expenseAmount);

    const newTransaction = {
      id: transactions.length + 1,
      subject: subjectText,
      amount: amount,
    };
    setTransactions([...transactions, newTransaction]);
    setSubjectText("");
    setIncomeText("");
    setExpenseText("");
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <>
      <center>
        <h2>Expense Tracker</h2>
      </center>
      <div className="container">
        <h4>Current Balance</h4>
        <h1 id="balance">${balance}</h1>

        <div className="inc_exp-container">
          <div>
            <h4>Amount Credited</h4>
            <p id="money-plus" className="money-plus">
              +${income}
            </p>
          </div>
          <div>
            <h4>Amount Deducted</h4>
            <p id="money-minus" className="money-minus">
              -${expense}
            </p>
          </div>
        </div>

        <h3>Add New Transaction</h3>
        <form id="form" onSubmit={addTransaction}>
          <div className="form-control">
            <label htmlFor="text">Transaction Subject</label>
            <input
              type="text"
              id="text"
              value={subjectText}
              onChange={(e) => setSubjectText(e.target.value)}
              placeholder="Enter the Transaction Subject..."
            />
          </div>
          <div className="form-control">
            <label htmlFor="income-text">Amount Credited</label>
            <input
              type="number"
              id="income-text"
              value={incomeText}
              min={0}
              onChange={(e) => setIncomeText(e.target.value)}
              placeholder="Enter Amount Credited..."
            />
          </div>
          <div className="form-control">
            <label htmlFor="expense-text">Amount Deducted</label>
            <input
              type="number"
              id="expense-text"
              value={expenseText}
              min={0}
              onChange={(e) => setExpenseText(e.target.value)}
              placeholder="Enter Amount Deducted..."
            />
          </div>
          <button className="btn">Add Transaction</button>
        </form>

        <h3>Transactions</h3>
        <ul id="list" className="list">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className={transaction.amount < 0 ? "minus" : "plus"}
            >
              {transaction.subject}{" "}
              <span>
                {transaction.amount < 0 ? "-" : "+"}$
                {Math.abs(transaction.amount)}
              </span>
              <button
                onClick={() => deleteTransaction(transaction.id)}
                className="delete-btn"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Expense;

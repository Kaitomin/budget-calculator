import React, { useState, useEffect } from 'react'
import './App.css';
import { v4 as uuidv4 } from 'uuid'

import { ExpenseForm, ExpenseList, ExpenseItem, Alert } from './components'

// const initialExpenses = [
//   { id: uuidv4(), charge: 'rent', amount: 554 },
//   { id: uuidv4(), charge: 'car payment', amount: 147 },
//   { id: uuidv4(), charge: 'credit card bill', amount: 782 },
// ]

const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []

function App() {

  const [expenses, setExpenses] = useState(initialExpenses)
  const [charge, setCharge] = useState('')
  const [amount, setAmount] = useState('')
  const [alert, setAlert] = useState({ show: false })
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(0)

  const handleCharge = e => {
    setCharge(e.target.value)
  }
  const handleAmount = e => {
    setAmount(e.target.value)
  }
  const handleAlert = ({type, text}) => {
    setAlert({show: true, type, text})
    setTimeout(() => {
      setAlert({show: false})
    }, 3000)
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (charge !== '' && amount > 0) {
      if (edit) {
        let tmpExpenses = expenses.map(e => e.id === id ? {...e, charge, amount} : e)
        setExpenses(tmpExpenses)
        setEdit(false)
        handleAlert({type: 'success', text: 'Item edited'})
      } else {
        const singleExpense = { id: uuidv4(), charge, amount }
        setExpenses([...expenses, singleExpense])
        handleAlert({type: 'success', text: 'Succesfully added'})
      }

      setCharge('')
      setAmount('')
    } else {
      handleAlert({type: 'danger', text: 'Charge can not be empty - Amount must be positive'})
    }
  }

  const clearItems = () => {
    setExpenses([])
    handleAlert({type: 'danger', text: 'All items deleted'})
  }
  const handleEdit = id => {
    let expense = expenses.find(e => e.id === id)
    let {charge, ammount} = expense
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
  }
  const handleDelete = id => {
    let tmpExpenses = expenses.filter(e => e.id !== id)
    setExpenses(tmpExpenses)
    handleAlert({type: 'danger', text: 'Item deleted'})
  }

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className='App'>
        <ExpenseForm 
          charge={charge} 
          amount={amount} 
          handleCharge={handleCharge} 
          handleAmount={handleAmount} 
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList 
          expenses={expenses} 
          handleDelete={handleDelete} 
          handleEdit={handleEdit} 
          clearItems={clearItems} 
        />
      </main>
      <h1>
        Total Spending: <span className='total'>{expenses.reduce((prev, curr) => prev + +curr.amount, 0)}€</span>
      </h1>
    </>
  );
}

export default App;

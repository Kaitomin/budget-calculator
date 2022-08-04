import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'

const Item = ({ id, charge, amount, handleEdit, handleDelete }) => {

  return (
    <li className='item'>
      <div className='info'>
        <span className='expense'>{charge}</span>
        <span className='amount'>{amount}€</span>
      </div>
      <div>
        <button className='edit-btn' aria-label='Edit button' onClick={() => handleEdit(id)}><MdEdit /></button>
        <button className='clear-btn' aria-label='Delete button' onClick={() => handleDelete(id)}><MdDelete /></button>
      </div>
    </li>
  )
}

export default Item
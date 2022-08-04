import React from 'react'
import Item from './Item'
import { MdDelete } from 'react-icons/md'

const List = ({ expenses, handleEdit, handleDelete, clearItems }) => {
  return (
    <>
      <ul className='list'>
        {expenses.map(e => (
          <Item key={e.id} {...e} handleDelete={handleDelete} handleEdit={handleEdit} />
        ))}
      </ul>
      {
        expenses.length > 0 && 
        <button className='btn' onClick={clearItems}>
          Clear expenses
          <MdDelete className='btn-icon' />
        </button>
      }
    </>
  )
}

export default List
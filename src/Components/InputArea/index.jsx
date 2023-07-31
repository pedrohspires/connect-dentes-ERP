import React from 'react'

function InputArea({ children }) {
  return (
    <div className='p-2 my-2 bg-gray-200/75 rounded-md dark:bg-gray-900'>
      {children}
    </div>
  )
}

export default InputArea
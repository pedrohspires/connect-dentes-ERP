import React from 'react'

export function InputForm({ inputId, type, nome, placeholder, value, setValue, isRequired }) {
  return (
    <div className='flex flex-col pb-2'>
      <label htmlFor={inputId} className='font-bold dark:text-white dark:font-normal'>{nome} <b hidden={!isRequired} className='text-red-500'>*</b></label>
      <input 
        id={inputId} 
        type={type || "text"}
        placeholder={placeholder}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        value={value} 
        onChange={event => setValue(event.target.value)} 
      />
    </div>
  )
}

export function InputTextAreaForm({ inputId, nome, placeholder, value, setValue, isRequired }) {
  return (
    <div className='flex flex-col pb-2'>
      <label htmlFor={inputId} className='font-bold dark:text-white dark:font-normal'>{nome} <b hidden={!isRequired} className='text-red-500'>*</b></label>
      <textarea 
        id={inputId} 
        placeholder={placeholder}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        value={value} 
        onChange={event => setValue(event.target.value)} 
      />
    </div>
  )
}
import React from 'react'

export function InputForm({ inputId, type, nome, placeholder, value, setValue, isRequired }) {
  return (
    <div className='flex flex-col'>
      <label htmlFor={inputId} className='font-bold'>{nome} <b hidden={!isRequired} className='text-red-500'>*</b></label>
      <input 
        id={inputId} 
        type={type || "text"}
        placeholder={placeholder}
        className='w-full p-2 bg-paleta-500 text-white rounded-md'
        value={value} 
        onChange={event => setValue(event.target.value)} 
      />
    </div>
  )
}

export function InputTextAreaForm({ inputId, type, nome, placeholder, value, setValue, isRequired }) {
  return (
    <div className='flex flex-col'>
      <label htmlFor={inputId} className='font-bold'>{nome} <b hidden={!isRequired} className='text-red-500'>*</b></label>
      <textarea 
        id={inputId} 
        placeholder={placeholder}
        className='w-full p-2 bg-paleta-500 text-white rounded-md'
        value={value} 
        onChange={event => setValue(event.target.value)} 
      />
    </div>
  )
}
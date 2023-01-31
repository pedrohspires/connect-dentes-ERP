import React from 'react'

function InputLogin({ id, nome, type, placeholder, disabled, value, onChange }) {
  const inputChange = (event) => {
    onChange(event.target.value);
  }

  return (
    <div className="w-full flex flex-col place-items-center">
      <label className="mt-5 text-xl" htmlFor={id}>{nome}</label>
      <input 
        id={id} 
        className="p-4 rounded-2xl w-full bg-paleta-700 text-paleta-100"
        type={type} 
        placeholder={placeholder} 
        disabled={disabled}
        value={value} 
        onChange={inputChange} 
      />
    </div>
  )
}

export default InputLogin;
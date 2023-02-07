import React from 'react'

function InputCheckbox({ label, checked, onChange }) {
  return (
    <div>
      <input 
        className='w-8' 
        type="checkbox" 
        name={label} 
        id={label} 
        checked={checked}
        onChange={(event) => {
          onChange(event.target.checked, label)
        }}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  )
}

export default InputCheckbox
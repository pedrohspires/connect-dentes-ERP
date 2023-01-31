import React from 'react'

function FormButton({ texto }) {
  return (
    <button className="w-28 rounded-xl text-paleta-100 mt-4 p-4 border-2 bg-paleta-500 border-paleta-900 hover:bg-paleta-700 hover:border-paleta-500">
      {texto}
    </button>
  )
}

export default FormButton
import React from 'react'

function EmptyTable({ icon, text }) {
  return (
    <div className="h-96 bg-white border-b text-paleta-100 grid place-items-center dark:bg-gray-800 dark:border-gray-700">
      {icon || ''}
      {text || 'Sem dados'}
    </div>
  )
}

export default EmptyTable
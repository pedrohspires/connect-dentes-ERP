import React from 'react'

function Button({ texto, onClick, color, colorHover, textColor, textoColorHover, isSubmit }) {
  return (
    <button 
      type={isSubmit ? "submit" : "button"}
      className={`text-${textColor || "gray-100"}
                  bg-${color || "gray-600"} 
                  hover:bg-${colorHover || "gray-800"} 
                  hover:text-${textoColorHover || "gray-100"}
                  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-600`}
      onClick={onClick}
    >
      {texto}
    </button>
  )
}

export default Button
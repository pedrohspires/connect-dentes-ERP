import React from 'react'

function Button({ texto, onClick, color, colorHover, textColor, textoColorHover, isSubmit }) {
  return (
    <button 
      className={`w-28 rounded-xl mt-4 px-4 py-2 border-2
                 text-${textColor || "paleta-100"}  
                 bg-${color || "paleta-500"} border-paleta-900 hover:border-paleta-500 
                 hover:bg-${colorHover || "paleta-700"}
                 hover:text-${textoColorHover || "paleta-100"}`}
      onClick={onClick}
      type={isSubmit ? "submit" : "button"}
    >
      {texto}
    </button>
  )
}

export default Button
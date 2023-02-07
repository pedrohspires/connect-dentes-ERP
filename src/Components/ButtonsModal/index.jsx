import React from 'react'
import Button from '../Button'

function ButtonsModal({ textoBtnEsquerdo, textoBtnDireito, onClickEsquerdo, onClickDireito }) {
  return (
    <div className="flex justify-between w-full">
      {textoBtnEsquerdo && <Button 
        texto={textoBtnEsquerdo}
        color="paleta-100" 
        colorHover="paleta-500" 
        textColor="paleta-900" 
        onClick={onClickEsquerdo}
      />}
      
      {textoBtnDireito && <Button 
        texto={textoBtnDireito}
        onClick={onClickDireito}
        isSubmit
      />}
    </div>
  )
}

export default ButtonsModal
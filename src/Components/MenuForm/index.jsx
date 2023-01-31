import React from 'react'

function MenuForm(props) {
  const {onClickEntrar, onClickCadastrar, corBotao } = props;

  return (
    <div className="grid grid-cols-2">
      <button className={`p-2 rounded-l-xl ${corBotao("entrar")}`} onClick={onClickEntrar}>Entrar</button>
      <button className={`p-2 rounded-r-xl ${corBotao("cadastrar")}`} onClick={onClickCadastrar}>Cadastrar</button>
    </div>
  )
}

export default MenuForm
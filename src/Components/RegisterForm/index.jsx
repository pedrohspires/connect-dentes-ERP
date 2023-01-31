import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Register } from '../../Services/Auth';
import FormButton from '../FormButton';
import InputLogin from '../InputLogin';

function RegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("");

  const handleSpanSenhasDiferentes = (status) => {
    document.getElementById("senhas-diferentes").innerHTML = status ? "Senhas diferentes!" : "&nbsp;";
  }

  const handleSenha = (senha) => {
    setSenha(senha);
    handleSpanSenhasDiferentes((senha !== senhaConfirmacao) && (senhaConfirmacao !== ""))
  }

  const handleSenhaConfirmacao = (senhaConfirmacao) => {
    setSenhaConfirmacao(senhaConfirmacao);
    handleSpanSenhasDiferentes(senha !== senhaConfirmacao)
  }

  const inputsValidos = () => {
    if(senha !== senhaConfirmacao){
      toast.error("Senhas diferentes!");
      return false;
    }

    return true;
  }

  const realizaCadastro = async (event) => {
    event.preventDefault();
    if(inputsValidos()){
      const toastLoading = toast.loading("Realizando cadastro...");
      setLoading(true);
  
      let dadosRequisicao = { nome, email, senha, ativo: true }
      let response = await Register(dadosRequisicao);
      if(response.sucesso){
        localStorage.setItem("@token", response.data);
        navigate("/");
        toast.update(toastLoading, {
          render: "Cadastro realizado com sucesso",
          type: "success",
          isLoading: false,
          autoClose: 5000
        });
      } else {
        toast.update(toastLoading, {
          render: response.mensagem,
          type: "error",
          isLoading: false,
          autoClose: 5000
        });
      }
      setLoading(false);
    }
  }

  return (
    <form className="grid place-items-center" onSubmit={realizaCadastro}>
      <InputLogin 
        id="nome"
        nome="Nome completo"
        type="text"
        placeholder="Insira seu nome"
        disabled={loading}
        value={nome}
        onChange={setNome}
      />

      <InputLogin 
        id="email"
        nome="Email"
        type="email"
        placeholder="Insira seu email"
        disabled={loading}
        value={email}
        onChange={setEmail}
      />

      <InputLogin 
        id="senha"
        nome="Senha"
        type="password"
        placeholder="Insira sua senha"
        disabled={loading}
        value={senha}
        onChange={handleSenha}
      />

      <div className='w-full'>
        <InputLogin 
          id="senha-confirmacao"
          nome="Repita a senha"
          type="password"
          placeholder="Repita a senha"
          disabled={loading}
          value={senhaConfirmacao}
          onChange={handleSenhaConfirmacao}
        />
        <span id="senhas-diferentes" className='text-red-700'>&nbsp;</span>
      </div>

      <FormButton texto="Cadastrar" />
    </form>
  )
}

export default RegisterForm
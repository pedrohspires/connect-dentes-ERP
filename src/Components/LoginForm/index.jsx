import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputLogin from '../InputLogin';
import { Login } from '../../Services/Auth'
import { toast } from "react-toastify";
import FormButton from "../FormButton";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const realizaLogin = async (event) => {
    event.preventDefault();
    const toastLoading = toast.loading("Realizando login...");
    setLoading(true);

    let response = await Login({ email, senha});
    if(response.sucesso){
      localStorage.setItem("@token", response.data);
      navigate("/");
      toast.update(toastLoading, {
        render: "Login realizado com sucesso",
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

  return (
    <form className="grid place-items-center" onSubmit={realizaLogin}>
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
        onChange={setSenha}
      />

      <FormButton texto="Entrar" />
    </form>
  )
}

export default LoginForm
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputLogin from '../InputLogin';
import { Login } from '../../Services/Auth'
import { toast } from "react-toastify";

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
        isLoading: false
      });
    } else {
      toast.update(toastLoading, {
        render: response.mensagem,
        type: "error",
        isLoading: false
      });
    }

    setLoading(false);
  }

  return (
    <div className="login-form-content w-full">
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

        <button className="w-28 rounded-xl mt-4 p-4 border-2 bg-paleta-500 border-paleta-900 hover:bg-paleta-700 hover:border-paleta-500">
          Entrar
        </button>
      </form>
    </div>
  )
}

export default LoginForm
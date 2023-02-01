import LoginForm from "../../Components/LoginForm";
import RegisterForm from "../../Components/RegisterForm";
import logo from "../../Assets/Imagens/logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuForm from "../../Components/MenuForm";

function Login() {
  const navigate = useNavigate();
  const [tipoFormulario, setTipoFormulario] = useState("entrar");

  const verificaUsuarioLogado = () => {
    if(localStorage.getItem("@token"))
      navigate("/");
  }

  useEffect(verificaUsuarioLogado, []);

  return (
    <main className="relative w-screen h-screen bg-paleta-900 grid place-items-center text-paleta-100">
      <div className="login-form-container w-2/5 grid place-items-center">
        <img src={logo} alt="Logo do site" className="w-64"/>

        <div className="login-form-content w-full bg-paleta-300 p-5 rounded-xl text-paleta-900">
          <MenuForm 
            onClickEntrar={() => setTipoFormulario("entrar")}
            onClickCadastrar={() => setTipoFormulario("cadastrar")}
            corBotao={(tipoBotao) => tipoFormulario === tipoBotao ? "bg-paleta-500" : "bg-paleta-100"}
          />
          {tipoFormulario === "entrar" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </main>
  )
}

export default Login
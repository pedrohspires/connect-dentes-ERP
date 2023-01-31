import LoginForm from "../../Components/LoginForm";
import logo from "../../Assets/Imagens/logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  let navigate = useNavigate();

  const verificaUsuarioLogado = () => {
    if(localStorage.getItem("@token"))
      navigate("/");
  }

  useEffect(verificaUsuarioLogado, []);

  return (
    <main className="relative w-screen h-screen bg-paleta-900 grid place-items-center text-paleta-100">
      <div className="login-form-container w-2/5">
        <img src={logo} alt="Logo do site" />

        <LoginForm />
      </div>
    </main>
  )
}

export default Login
import instance from "../../configAxios";

export const Login = async (dadosRequest) => {
  const axios = await instance();

  try{
    const response = await axios.post('/Usuario/Entrar', dadosRequest);
    return {
      sucesso: true,
      data: response.data
    }
  } catch(error){
    if(!error.message){
      return {
        sucesso: false,
        mensagem: "Não foi possível conectar ao servidor!"
      }
    }

    return {
      sucesso: false,
      mensagem: error.response.data
    }
  }
}
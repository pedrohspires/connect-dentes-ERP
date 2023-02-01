import instance from "../../configAxios";

export const getItensMenu = async () => {
  const axios = await instance();

  try{
    const response = await axios.get('/Menu');
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
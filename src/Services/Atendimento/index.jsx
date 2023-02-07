import instance from "../../configAxios";

export const GetAtendimentos = async () => {
  const axios = await instance();

  try{
    const response = await axios.get('/Atendimento');
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

export const GetAtendimentoById = async (id) => {
  const axios = await instance();

  try{
    const response = await axios.get('/Atendimento/' + id);
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

export const GetMedicos = async () => {
  const axios = await instance();

  try{
    const response = await axios.get('/Usuario/Medico/select');
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

export const NovoAtendimento = async (dados) => {
  const axios = await instance();

  try{
    const response = await axios.post('/Atendimento', dados);
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

export const EditarAtendimento = async (dados, id) => {
  const axios = await instance();

  try{
    const response = await axios.put('/Atendimento/' + id, dados);
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

export const DeletarAtendimento = async (id) => {
  const axios = await instance();

  try{
    const response = await axios.delete('/Atendimento/' + id);
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
import instance from "../../configAxios";
import { getAxiosCustomUrl } from "../../configAxios";

export const GetClientes = async () => {
  const axios = await instance();

  try{
    const response = await axios.get('/Cliente');
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

export const GetClienteById = async (id) => {
  const axios = await instance();

  try{
    const response = await axios.get('/Cliente/' + id);
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

export const GetSelectUf = async () => {
  const axios = await getAxiosCustomUrl('https://servicodados.ibge.gov.br');

  try{
    const response = await axios.get('/api/v1/localidades/estados');
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

export const GetSelectCidades = async (uf) => {
  const axios = await getAxiosCustomUrl('https://servicodados.ibge.gov.br');

  try{
    const response = await axios.get('/api/v1/localidades/estados/' + uf + '/municipios');
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

export const NovoCliente = async (dados) => {
  const axios = await instance();

  try{
    const response = await axios.post('/Cliente', dados);
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

export const EditarCliente = async (dados, id) => {
  const axios = await instance();

  try{
    const response = await axios.put('/Cliente/' + id, dados);
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

export const DeletarCliente = async (id) => {
  const axios = await instance();

  try{
    const response = await axios.delete('/Cliente/' + id);
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
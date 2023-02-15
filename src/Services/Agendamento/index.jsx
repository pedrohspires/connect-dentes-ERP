import instance from "../../configAxios";

export const GetAgendamentos = async (filtros) => {
  const axios = await instance();

  try{
    const response = await axios.post('/Agendamento/Listar', filtros);
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

export const GetAgendamentoById = async (id) => {
  const axios = await instance();

  try{
    const response = await axios.get('/Agendamento/' + id);
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

export const GetClientes = async () => {
  const axios = await instance();

  try{
    const response = await axios.get('/Cliente/select');
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

export const GetHorarios = async (dados) => {
  const axios = await instance();

  try{
    const response = await axios.post('/Agendamento/HorariosDisponiveis', {dataAgendamento : dados});
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

export const NovoAgendamento = async (dados) => {
  const axios = await instance();

  try{
    const response = await axios.post('/Agendamento', dados);
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

export const EditarAgendamento = async (dados, id) => {
  const axios = await instance();

  try{
    const response = await axios.put('/Agendamento/' + id, dados);
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

export const DeletarAgendamento = async (id) => {
  const axios = await instance();

  try{
    const response = await axios.delete('/Agendamento/' + id);
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
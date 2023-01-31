import axios from 'axios';
import API_URL from './Utils/api';

const getAxios = async (timeout = 30000) => {
  try{
    const token = localStorage.getItem('@token');

    const instance = axios.create({
      baseURL: API_URL,
      timeout: timeout,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    return instance;
  } catch(error) {
    console.log(error);
  }
}

export default getAxios;
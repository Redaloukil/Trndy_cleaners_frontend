import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:8000/';

const encode = encodeURIComponent;
const responseBody = (res) => { 
  return res.body 
};

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

export const requests = {
    del: url =>
      superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    get: url =>
      superagent.get(`${API_ROOT}${url}`).use(tokenPlugin),
    put: (url, body) =>
      superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
      superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
  };

export const users = {
    getUsers : () =>
        requests.get('users/users/'),
    getUser :() => 
        requests.get('users/users/'),
    current : () => 
        requests.get('users/user/'),
    login : (username , password) => 
        requests.post('users/login/' , {username : username , password : password}),
    signup : (username , email , phone_number , password ) => 
        requests.post('users/signup/' , {username, email, phone_number, password}),
}

export const accounts = {
    getClients : () => 
      requests.get('accounts/clients/'),
    getClient : ( ) => 
      requests.get('accounts/clients/'),
    getAgents : () => 
      requests.get('accounts/clients/'),
    getAgent : () => 
      requests.get()
}


export const client = {
  getOrders : () => {
    requests.get('orders/clients/')
  },
  createOrder : () => {
    requests.get('orders/clients/create')
  }
}






import axiosRoot from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`; 
  } else {
    delete axios.defaults.headers['Authorization'];
  }
};

export async function getAll(url) { 
  const {
    data,
  } = await axios.get(`${baseUrl}/${url}`); 

  return data.items;
}
export const deleteById = async (url, { arg: id }) => {
  await axios.delete(`${baseUrl}/${url}/${id}`); 
};

export const save = async (url, { arg: body }) => {
  const { id, ...values } = body;
  console.log(body);
  await axios({
    method: id ? 'PUT' : 'POST',
    url: `${baseUrl}/${url}/${id ?? ''}`,
    data: values,
  });
};

export const getById = async (url) => {
  const {
    data,
  } = await axios.get(`${baseUrl}/${url}`);

  return data;
}

export const create = async (url, { arg: body }) => {
  const {id, voornaam, naam, afdeling, geboortedatum, ouder_id1, ouder_id2, leiding_id } = body;
  await axios.post(`${baseUrl}/${url}`,{
    voornaam: voornaam,
    naam: naam,
    afdeling: afdeling,
    geboortedatum: geboortedatum,
    ouder_id1 : ouder_id1,
    ouder_id2: ouder_id2,
    leiding_id: leiding_id
  }
  );
};

export const post = async (url, { arg }) => {
  const {
    data,
  } = await axios.post(url, arg);

  return data;
};



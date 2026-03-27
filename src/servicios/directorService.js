import axios from 'axios';

const BASE_URL = 'https://api-peliculas-backend.onrender.com/api/directores';

export const getDirectores = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
};

export const crearDirector = async (data) => {
    const res = await axios.post(BASE_URL, data);
    return res.data;
};

export const eliminarDirector = async (id) => {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
};

export const actualizarDirector = async (id, data) => {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    return res.data;
};

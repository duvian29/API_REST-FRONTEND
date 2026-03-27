import axios from 'axios';

const BASE_URL = 'https://api-peliculas-backend.onrender.com/api/generos';

export const getGeneros = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
};

export const crearGenero = async (data) => {
    const res = await axios.post(BASE_URL, data);
    return res.data;
};

export const eliminarGenero = async (id) => {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
};

export const actualizarGenero = async (id, data) => {
    const res = await axios.put(`${BASE_URL}/${id}`, data);
    return res.data;
};

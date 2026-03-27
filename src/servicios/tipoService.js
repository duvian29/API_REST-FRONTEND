import axios from 'axios';

const BASE_URL = 'https://api-peliculas-backend.onrender.com/api/tipos';

export const getTipos = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
};

export const crearTipo = async (data) => {
    const res = await axios.post(BASE_URL, data);
    return res.data;
};

export const eliminarTipo = async (id) => {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
};

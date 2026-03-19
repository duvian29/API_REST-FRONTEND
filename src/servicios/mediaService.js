import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/media';

export const getMedia = async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
};

export const crearMedia = async (data) => {
    const res = await axios.post(BASE_URL, data);
    return res.data;
};

export const eliminarMedia = async (id) => {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
};
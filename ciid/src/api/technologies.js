import api from './axios';

export const createTechnology = async (startupData) => {
    try {
        const response = await api.post('/technologies/create', startupData);
        return response.data;
    } catch (error) {
        console.error('Error creando la tecnologia:', error);
        throw error;
    }
};

export const getTechnologies = async () => {
    try {
        const response = await api.get('/technologies/read');
        return response.data;
    } catch (error) {
        console.error('Error obteniendo las tecnologias:', error);
        throw error;
    }
};

export const getTechnologyById = async (id) => {
    try {
        const response = await api.get(`/technologies/read/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo la tecnologia por ID:', error);
        throw error;
    }
};

export const updateTechnology = async (id, startupData) => {
    try {
        const response = await api.put(`/technologies/update/${id}`, startupData);
        return response.data;
    } catch (error) {
        console.error('Error actualizando la tecnologia:', error);
        throw error;
    }
};

export const deleteTechnology = async (id) => {
    try {
        const response = await api.delete(`/technologies/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error eliminando la tecnologia:', error);
        throw error;
    }
};




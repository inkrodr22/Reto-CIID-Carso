import api from './axios';

export const createStartup = async (startupData) => {
    try {
        const response = await api.post('/startups/create', startupData);
        return response.data;
    } catch (error) {
        console.error('Error creando la startup:', error);
        throw error;
    }
};

export const getStartups = async () => {
    try {
        const response = await api.get('/startups/read');
        return response.data;
    } catch (error) {
        console.error('Error obteniendo las startups:', error);
        throw error;
    }
};

export const getStartupById = async (id) => {
    try {
        const response = await api.get(`/startups/read/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo la startup por ID:', error);
        throw error;
    }
};

export const updateStartup = async (id, startupData) => {
    try {
        const response = await api.put(`/startups/update/${id}`, startupData);
        return response.data;
    } catch (error) {
        console.error('Error actualizando la startup:', error);
        throw error;
    }
};

export const deleteStartup = async (id) => {
    try {
        const response = await api.delete(`/startups/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error eliminando la startup:', error);
        throw error;
    }
};




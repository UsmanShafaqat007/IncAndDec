import axios from 'axios';

let url = 'https://swiftproperty.triolabz.com/apis/previousAuctions'

export async function getPreviousAuction(id) {
    try {
        const response = await axios.get(`${url}/previousAuction/${id}`);
        return response.data
    } catch (e) {
        return e;
    }
}

export async function getPreviousAuctions(page, offset=20) {
    try {
        const response = await axios.get(`${url}/`, {
            params: {page, offset}
        });
        return response.data
    } catch (e) {
        return e;
    }
}

export async function deletePreviousAuction(id) {
    try {
        const response = await axios.delete(`${url}/previousAuction/${id}`);
        return response.data
    } catch (e) {
        return e;
    }
}

export async function updatePreviousAuction(id, data) {
    try {
        const response = await axios.put(`${url}/previousAuction/${id}`, data);
        return response.data
    } catch (e) {
        return e;
    }
}

export async function addPreviousAuction(data) {
    try {
        const response = await axios.post(`${url}/previousAuction`, data);
        return response.data
    } catch (e) {
        return e;
    }
}
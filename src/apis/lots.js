import axios from 'axios';

// let lotsUrl = 'https://swiftproperty.triolabz.com/apis/lots'

let lotsUrl = 'http://localhost:4000/apis/lots'

export async function getLot(id) {
    try {
        const response = await axios.get(`${lotsUrl}/lot/${id}`);
        return response.data
    } catch (e) {
        return e;
    }
}

export async function getLots(page, offset=20) {
    try {
        const response = await axios.get(`${lotsUrl}/`, {
            params: {page, offset}
        });
        return response.data
    } catch (e) {
        return e;
    }
}

export async function deleteLot(id) {
    try {
        const response = await axios.delete(`${lotsUrl}/lot/${id}`);
        return response.data
    } catch (e) {
        return e;
    }
}

export async function updateLot(id, data) {
    try {
        const response = await axios.put(`${lotsUrl}/lot/${id}`, data);
        return response.data
    } catch (e) {
        return e;
    }
}

export async function addLot(data) {
    try {
        const response = await axios.post(`${lotsUrl}/lot`, data);
        return response.data
    } catch (e) {
        return e;
    }
}

export async function getSpecificLots(page, filter, offset=20) {
    try {
        const response = await axios.get(`${lotsUrl}/specificLots`, {
            params: {
                page,
                filter,
                offset
            }
        });
        return response.data
    } catch (e) {
        return e;
    }
}
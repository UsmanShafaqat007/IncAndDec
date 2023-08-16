import axios from 'axios';

let url = 'https://swiftproperty.triolabz.com/apis/upcomingAuctions'

export async function getUpcomingAuction(id) {

    try {
        const response = await axios.get(`${url}/upcomingAuction/${id}`);
        return response.data
    } catch (e) {
        console.log(e.message)
        return false;
    }
}

export async function getUpcomingAuctions(page, offset = 20) {
    try {
        const response = await axios.get(`${url}/`, {
            params: {page, offset}
        });
        return response.data
    } catch (e) {
        console.log(e.message)
        return false;
    }
}

export async function updateUpcomingAuction(data) {
    try {
        const response = await axios.get(`${url}/schedule/`, {
            params: {data}
        });

        window.open(response.data, '_blank');

        return response.data

    } catch (e) {
        console.log(e.message)
        return false;
    }
}

export async function deleteUpcomingAuction(data) {

    try {

        const response = await axios.get(`${url}/schedule/`, {
            params: {data}
        });

        window.open(response.data, '_blank');
        return response.data
    } catch (e) {
        console.log(e.message)
        return false;
    }

}

export async function addUpcomingAuction(data) {

    try {
        const response = await axios.get(`${url}/schedule/`, {
            params: {data}
        });

        window.open(response.data, '_blank');

        return true

        // return response.data
    } catch (e) {
        console.log(e.message)
        return false;
    }
}
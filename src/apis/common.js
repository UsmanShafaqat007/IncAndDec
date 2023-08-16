import axios from 'axios';

let url = 'https://swiftproperty.triolabz.com/apis'

export async function postFile(file) {
    try {

        let form = new FormData();

        form.append("file", file);

        const response = await axios.post(`${url}/upload`, form, {
            headers: {
                "Content-Type": `multipart/form-data`,
                'Access-Control-Allow-Origin': "*"
            },
        });

        return response.data
    } catch (e) {
        return e;
    }
}

export async function postMultipleFiles(files) {
    try {

        let form = new FormData();


        files.forEach(file => {
            form.append("files", file);
        })


        const response = await axios.post(`${url}/upload/multiple`, form, {
            headers: {
                "Content-Type": `multipart/form-data`,
                'Access-Control-Allow-Origin': "*"
            },
        });

        return response.data
    } catch (e) {
        return e;
    }
}

export async function signIn(data) {
    try {

        const response = await axios.post(`${url}/signin`, data);

        return response.data

    } catch (e) {
        return e;
    }
}

export async function sendEmail(data) {
    try {

        const response = await axios.post(`${url}/sendEmail`, data);

        return response.data

    } catch (e) {
        return e;
    }
}

export async function postAuctionRequest(data) {
    try {

        const response = await axios.post(`${url}/requestAuction`, data);

        return response.data

    } catch (e) {
        return e;
    }
}

export async function getAuctionRequests(page, offset = 20) {
    try {
        const response = await axios.get(`${url}/requestAuctions`, {
            params: {page, offset}
        });
        return response.data
    } catch (e) {
        return e;
    }
}
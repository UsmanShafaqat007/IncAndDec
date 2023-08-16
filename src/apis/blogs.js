import axios from 'axios';

let url = 'https://swiftproperty.triolabz.com/apis/blogs'

export async function getBlog(id) {
    try {
        const response = await axios.get(`${url}/blog/${id}`);
        return response.data
    } catch (e) {
        return e;
    }
}

export async function getBlogs(page, offset=20) {
    try {
        const response = await axios.get(`${url}/`, {
            params: {page, offset}
        });
        return response.data
    } catch (e) {
        return e;
    }
}

export async function deleteBlog(id) {
    try {
        const response = await axios.delete(`${url}/blog/${id}`);
        return response.data
    } catch (e) {
        return e;
    }
}

export async function updateBlog(id, data) {
    try {
        const response = await axios.put(`${url}/blog/${id}`, data);
        return response.data
    } catch (e) {
        return e;
    }
}

export async function addBlog(data) {
    try {
        const response = await axios.post(`${url}/blog`, data);
        return response.data
    } catch (e) {
        return e;
    }
}
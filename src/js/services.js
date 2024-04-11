const API_URL = import.meta.env.VITE_URL_API
async function login(data) {
    try {
        const url = `${API_URL}/api/login`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(data),
        });
        const result = await response.json();
        return {
            ok: result.ok,
            data: result.data,
            errortype: result.data.errortype
        }

    } catch (error) {
        return {
            ok: false,
            errortype: 'fetch'
        }
    }
}

async function register(data) {
    try {
        const url = `${API_URL}/api/register`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(data),
        });
        const result = await response.json();
        return {
            ok: result.ok,
            data: result.data,
            errortype: result.data.errortype
        }

    } catch (error) {
        return {
            ok: false,
            errortype: 'fetch'
        }
    }
}

async function refresh() {
    try {
        const token = window.localStorage.getItem('token')
        const url = `${API_URL}/api/refresh`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

        });
        const result = await response.json();
        return {
            ok: result.ok,
            data: result.data,
            errortype: result.data.errortype
        }

    } catch (error) {
        return {
            ok: false,
            errortype: 'fetch'
        }
    }
}

async function logout() {
    try {
        const token = window.localStorage.getItem('token')
        const url = `${API_URL}/api/logout`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

        });
        const result = await response.json();
        return {
            ok: result.ok,
            data: result.data,
            errortype: result.data.errortype
        }

    } catch (error) {
        return {
            ok: false,
            errortype: 'fetch'
        }
    }
}

async function getProducts() {
    try {
        const token = window.localStorage.getItem('token')
        const url = `${API_URL}/api/products`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const result = await response.json();
        return {
            ok: result.ok,
            data: result.data,
            errortype: result.data.errortype
        }

    } catch (error) {
        return {
            ok: false,
            errortype: 'fetch'
        }
    }
}
async function getCategories() {
    try {
        const token = window.localStorage.getItem('token')
        const url = `${API_URL}/api/categories`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const result = await response.json();
        return {
            ok: result.ok,
            data: result.data,
            errortype: result.data.errortype
        }

    } catch (error) {
        return {
            ok: false,
            errortype: 'fetch'
        }
    }
}

async function createProduct(data) {
    try {
        const token = window.localStorage.getItem('token')
        const url = `${API_URL}/api/products`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(data),
        });
        const result = await response.json();
        return {
            ok: result.ok,
            data: result.data,
            errortype: result.data.errortype
        }

    } catch (error) {
        return {
            ok: false,
            errortype: 'fetch'
        }
    }
}
async function editProduct(data, id) {
    try {
        const token = window.localStorage.getItem('token')
        const url = `${API_URL}/api/products/${id}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify(data),
        });
        const result = await response.json();
        return {
            ok: result.ok,
            data: result.data,
            errortype: result.data.errortype
        }

    } catch (error) {
        return {
            ok: false,
            errortype: 'fetch'
        }
    }
}

export {
    login,
    register,
    refresh,
    logout,
    getProducts,
    getCategories,
    createProduct,
    editProduct
}
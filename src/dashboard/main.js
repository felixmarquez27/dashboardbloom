// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import { setAlert, UnsetAlert, setSpinner, unSetSpinner } from '../js/utils'
import { getProducts, refresh, logout, getCategories, createProduct, editProduct } from '../js/services'
import imgUrl from '../../public/img/secundario.png'

document.getElementById('secundario').src = imgUrl
const tbodyProducts = document.getElementById('tbodyProducts');
const productSearch = document.getElementById('productSearch');
const btnLogout = document.getElementById('btnLogout');
//modal new product
const newProductName = document.getElementById('newProductName')
const newProductPrice = document.getElementById('newProductPrice')
const newProductCategory = document.getElementById('newProductCategory')
const newProduct_alert = document.getElementById('newProduct_alert')
const newProduct_spinner = document.getElementById('newProduct_spinner')
const formNewProduct = document.getElementById('formNewProduct')
const productModal = document.getElementById('productModal')
const productModalInstance = new bootstrap.Modal(productModal, {
    keyboard: false
})
//modal edit product
let currentEditID = null
let currentEditStatus = null
const editProductName = document.getElementById('editProductName')
const editProductPrice = document.getElementById('editProductPrice')
const editProductCategory = document.getElementById('editProductCategory')
const editProduct_alert = document.getElementById('editProduct_alert')
const editProduct_spinner = document.getElementById('editProduct_spinner')
const formEditProduct = document.getElementById('formEditProduct')
const modalEditProduct = document.getElementById('modalEditProduct')
const modalEditProductInstance = new bootstrap.Modal(modalEditProduct, {
    keyboard: false
})
let allProducts = []

const deleteProduct = async (id, name, price, category) => {
    const newProductData = {
        "name": name,
        "price": price,
        "category": category,
        "status": 'inactive'
    }

    getProductsMethod()
    const response = await editProduct(newProductData, id);
    if (response.ok) {
        getProductsMethod()
    } else {
        console.log('ocurrió un error')
    }
}

const openModalEdit = async (id, name, price, category) => {
    currentEditID = id
    editProductName.value = name
    editProductPrice.value = price
    editProductCategory.value = category
    modalEditProductInstance.show()
}

const renderTableProducts = (data) => {
    tbodyProducts.innerHTML = ''
    const rowTable = (product, index) => {
        const tr = document.createElement('tr');

        const th = document.createElement('th');
        th.setAttribute('scope', 'row');
        th.textContent = index + 1;
        tr.appendChild(th);

        const tdName = document.createElement('td');
        tdName.textContent = product.name;
        tr.appendChild(tdName);

        const tdCategory = document.createElement('td');
        tdCategory.textContent = product.category_name;
        tr.appendChild(tdCategory);

        const tdPrice = document.createElement('td');
        tdPrice.classList.add('text-end');
        tdPrice.textContent = `$${product.price}`;
        tr.appendChild(tdPrice);

        const tdButtons = document.createElement('td');
        tdButtons.classList.add('d-flex', 'justify-content-end', 'gap-2');

        const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.onclick = () => openModalEdit(product.id, product.name, product.price, product.category);
        editButton.classList.add('btn', 'btn-dark', 'btn-sm');
        editButton.insertAdjacentHTML('afterbegin', 'Editar');
        tdButtons.appendChild(editButton);
        // data-bs-toggle="modal" data-bs-target="#productModal"
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.onclick = () => deleteProduct(product.id, product.name, product.price, product.category);
        deleteButton.insertAdjacentHTML('afterbegin', 'Borrar');

        tdButtons.appendChild(deleteButton);

        tr.appendChild(tdButtons);

        return tr;
    }


    data.forEach((product, index) => {
        tbodyProducts.insertAdjacentElement("beforeend", rowTable(product, index))
    });


}

const renderOptionsCategory = (data) => {
    const option = (category) => {
        return `<option value="${category.id}">${category.name}</option>`
    }
    let options = ''
    data.forEach(category => {
        options = options + option(category)
    });

    newProductCategory.innerHTML = options
    editProductCategory.innerHTML = options

}

const getProductsMethod = async () => {
    const response = await getProducts();
    if (response.ok) {
        allProducts = response.data

        renderTableProducts(response.data)
    } else {

    }

}
const getCategoriesMethod = async () => {
    const response = await getCategories();
    if (response.ok) {
        renderOptionsCategory(response.data)
    } else {

    }

}

const refreshMethod = async () => {
    const response = await refresh();
    if (response.ok) {
        window.localStorage.setItem('token', response.data.token)
    } else {
        window.localStorage.removeItem('token')
        window.location.assign('/')
    }

}
const searchMethod = (txt) => {
    const newAllProducts = allProducts.filter((product) => {
        if (product.name.toLowerCase().indexOf(txt.toLowerCase()) === -1) {
            return false
        } else {
            return true
        }
    })

    renderTableProducts(newAllProducts)
}

const logoutMethod = async () => {
    const response = await logout();
    if (response.ok) {
        window.localStorage.removeItem('token')
        window.location.assign('/')
    } else {
        console.log('ocurrió un error')
    }
}


setInterval(() => {
    refreshMethod()
}, 1000 * 45)


const addNewProductMethod = async () => {

    setSpinner(newProduct_spinner)
    UnsetAlert(newProduct_alert)
    if (!newProductName.value) {
        unSetSpinner(newProduct_spinner)
        setAlert(newProduct_alert, 'alert-danger', 'El campo email no puede estar vacio')
        return
    }
    if (!newProductPrice.value) {
        unSetSpinner(newProduct_spinner)
        setAlert(newProduct_alert, 'alert-danger', 'El campo Password no puede estar vacio')
        return
    }
    const newProductData = {
        "name": newProductName.value,
        "price": newProductPrice.value,
        "category": newProductCategory.value
    }
    const response = await createProduct(newProductData);
    unSetSpinner(newProduct_spinner)
    if (response.ok) {
        productModalInstance.hide()
        getProductsMethod()
    } else {
        switch (response.errortype) {
            case 'fetch':
                setAlert(newProduct_alert, 'alert-danger', 'error en la solicitud')
                break;
            case 'validation':
                setAlert(newProduct_alert, 'alert-danger', Object.values(response.data.error)[0])
                break;
            case 'auth':
                setAlert(newProduct_alert, 'alert-danger', response.data.error)
                break;
            default:
                setAlert(newProduct_alert, 'alert-danger', 'Ocurrió un error desconocido')
                break;
        }

    }
}
const editProductMethod = async () => {

    setSpinner(editProduct_spinner)
    UnsetAlert(editProduct_alert)
    if (!editProductName.value) {
        unSetSpinner(editProduct_spinner)
        setAlert(editProduct_alert, 'alert-danger', 'El campo email no puede estar vacio')
        return
    }
    if (!editProductPrice.value) {
        unSetSpinner(editProduct_spinner)
        setAlert(editProduct_alert, 'alert-danger', 'El campo Password no puede estar vacio')
        return
    }
    const editProductData = {
        "name": editProductName.value,
        "price": editProductPrice.value,
        "category": editProductCategory.value,
        "status": 'active'
    }
    const response = await editProduct(editProductData, currentEditID);
    unSetSpinner(editProduct_spinner)
    if (response.ok) {
        modalEditProductInstance.hide()
        getProductsMethod()
    } else {
        switch (response.errortype) {
            case 'fetch':
                setAlert(editProduct_alert, 'alert-danger', 'error en la solicitud')
                break;
            case 'validation':
                setAlert(editProduct_alert, 'alert-danger', Object.values(response.data.error)[0])
                break;
            case 'auth':
                setAlert(editProduct_alert, 'alert-danger', response.data.error)
                break;
            default:
                setAlert(editProduct_alert, 'alert-danger', 'Ocurrió un error desconocido')
                break;
        }

    }
}

const initPage = () => {
    if (window.localStorage.getItem('token')) {
        getProductsMethod()
        getCategoriesMethod()
    } else {
        window.location.assign('/')
    }
}
initPage()
productSearch.addEventListener('input', (e) => {
    searchMethod(e.target.value)
})
btnLogout.addEventListener('click', () => {
    logoutMethod()
})
formNewProduct.addEventListener('submit', (e) => {
    e.preventDefault()
    addNewProductMethod()
})
formEditProduct.addEventListener('submit', (e) => {
    e.preventDefault()
    editProductMethod()
})
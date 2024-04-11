// Import our custom CSS
import '../scss/styles.scss'
import { login, register } from './services'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import { setAlert, UnsetAlert, setSpinner, unSetSpinner } from './utils'
import imgUrl from '../../public/img/logo.png'
document.getElementById('logo').src = imgUrl
//login const
const session_form = document.getElementById('session_form')
const session_mail = document.getElementById('session_mail')
const session_pass = document.getElementById('session_pass')
const session_alert = document.getElementById('session_alert')
const session_spinner = document.getElementById('session_spinner')

//register const
const registerModal = document.getElementById('registerModal')
const registerModalInstance = new bootstrap.Modal(registerModal, {
    keyboard: false
})

const register_form = document.getElementById('register_form')
const register_name = document.getElementById('register_name')
const register_mail = document.getElementById('register_mail')
const register_address = document.getElementById('register_address')
const register_pass = document.getElementById('register_pass')
const register_alert = document.getElementById('register_alert')
const register_spinner = document.getElementById('register_spinner')

var toastElList = [].slice.call(document.querySelectorAll('.toast'))
var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl, { animation: true })
})


const loginMethod = async () => {

    setSpinner(session_spinner)
    UnsetAlert(session_alert)
    if (!session_mail.value) {
        unSetSpinner(session_spinner)
        setAlert(session_alert, 'alert-danger', 'El campo email no puede estar vacio')
        return
    }
    if (!session_pass.value) {
        unSetSpinner(session_spinner)
        setAlert(session_alert, 'alert-danger', 'El campo Password no puede estar vacio')
        return
    }
    const sessionData = {
        "email": session_mail.value,
        "pass": session_pass.value
    }
    const response = await login(sessionData);
    unSetSpinner(session_spinner)
    if (response.ok) {
        window.localStorage.setItem('token', response.data.token)
        window.location.assign('/dashboard/')
    } else {
        switch (response.errortype) {
            case 'fetch':
                setAlert(session_alert, 'alert-danger', 'error en la solicitud')
                break;
            case 'validation':
                setAlert(session_alert, 'alert-danger', Object.values(response.data.error)[0])
                break;
            case 'auth':
                setAlert(session_alert, 'alert-danger', response.data.error)
                break;
            default:
                setAlert(session_alert, 'alert-danger', 'Ocurrió un error desconocido')
                break;
        }

    }
}
const registerMethod = async () => {
    setSpinner(register_spinner)
    UnsetAlert(register_alert)

    if (!register_name.value) {
        unSetSpinner(register_spinner)
        setAlert(register_alert, 'alert-danger', 'El campo nombre no puede estar vacio')
        return
    }
    if (!register_mail.value) {
        unSetSpinner(register_spinner)
        setAlert(register_alert, 'alert-danger', 'El campo email no puede estar vacio')
        return
    }
    if (!register_pass.value) {
        unSetSpinner(register_spinner)
        setAlert(register_alert, 'alert-danger', 'El campo Password no puede estar vacio')
        return
    }
    const registerData = {
        "name": register_name.value,
        "email": register_mail.value,
        "address": register_address.value,
        "pass": register_pass.value
    }
    const response = await register(registerData);
    unSetSpinner(register_spinner)
    if (response.ok) {
        registerModalInstance.hide()
        toastList[0].show()
    } else {
        switch (response.errortype) {
            case 'fetch':
                setAlert(register_alert, 'alert-danger', 'error en la solicitud')
                break;
            case 'validation':
                setAlert(register_alert, 'alert-danger', Object.values(response.data.error)[0])
                break;
            case 'auth':
                setAlert(register_alert, 'alert-danger', response.data.error)
                break;
            case 'database':
                setAlert(register_alert, 'alert-danger', response.data.error)
                break;
            default:
                setAlert(register_alert, 'alert-danger', 'Ocurrió un error desconocido')
                break;
        }

    }
}




session_form.addEventListener('submit', (e) => {
    e.preventDefault()
    loginMethod()
})
register_form.addEventListener('submit', (e) => {
    e.preventDefault()
    registerMethod()
})

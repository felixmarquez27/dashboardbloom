export const setAlert = (node, type, msj) => {
    node.textContent = msj
    node.classList.remove('d-none')
    node.classList.add('d-block', type)
}
export const UnsetAlert = (node) => {
    node.classList.add('d-none')
    node.classList.remove('d-block')
}
export const setSpinner = (node) => {
    node.classList.remove('d-none')
    node.classList.add('d-inline-block')
}
export const unSetSpinner = (node) => {
    node.classList.add('d-none')
    node.classList.remove('d-inline-block')
}


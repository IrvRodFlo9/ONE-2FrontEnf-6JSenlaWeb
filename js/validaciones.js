
export function valida(input){
    const tipoInput = input.dataset.tipo;
    if (validadores[tipoInput]){
        validadores[tipoInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = '';
    }
    else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarError(tipoInput, input);
    }
}

const tiposErrores = [
    'valueMissing', 
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensajesError = {
    nombre : {
        valueMissing: "Este campo no puede estar vacío",
    },
    email : {
        valueMissing: "Este campo no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },
    password : {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Entre 6 y 12 caracteres. Mínimo: 1 minúscula, 1 mayúscula, 1 número y sin caracteres especiales",
    },
    nacimiento : {
        valueMissing: "Este campo no puede estar vacío",
        customError: 'Se requiere un mínimo de 18 años'
    },
    phone : {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requierido es: XXXXXXXXXX"
    },
    address : {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Escriba entre 10 y 40 caracteres"
    },
    city : {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Ciudad inválida"
    },
    state : {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "Estado inválido"
    }
}

function mostrarError(tipoInput, input){
    let mensaje = '';

    tiposErrores.forEach(error => {
        if (input.validity[error]){
            mensaje = mensajesError[tipoInput][error];
        }
    })

    return mensaje
}

const validadores = {
    nacimiento: (input) => validarFecha(input),
}

function validarFecha(input) { 
    const fecha = new Date(input.value);
    let mensaje = '';

    if (!mayorEdad(fecha)){
        mensaje = 'Se requiere un mínimo de 18 años';
    }
    input.setCustomValidity(mensaje);
}

function mayorEdad(fecha) {
    const hoy = new Date();
    const fecha18Mas = new Date(fecha.getUTCFullYear()+18, fecha.getUTCMonth(), fecha.getUTCDate());
    let mayor = hoy >= fecha18Mas;
    return mayor
}


const form = document.getElementById('form')
const listar = document.getElementById('listarAgenda')
const btnBuscar = document.getElementById('btn-search')
const mostrarBusq = document.getElementById('mostrarBusq')
const nombre = document.getElementById('nombre')
const apellido = document.getElementById('apellido')
const correo = document.getElementById('correo')
const fecha = document.getElementById('fecha')
const hora = document.getElementById('hora')
const observacion = document.getElementById('obser')

let citaSustentacion= [];
let esEditar = false;
let indexEditar = 0; 


form.addEventListener('submit', e => {
    e.preventDefault()
    agendar()
    limpiarCampos()
})

const agendar = () => {    
    let agregarAgenda = {
        id: esEditar ? citaSustentacion[indexEditar].id : Math.round(Math.random() * (100 - 1) + 1),
        nombre: nombre.value,
        apellido: apellido.value,
        correo: correo.value,
        fecha: fecha.value,
        hora: hora.value,
        observacion: observacion.value,
    }
    
    if (esEditar === false) //Agregar
        citaSustentacion.unshift(agregarAgenda)
    else { //Editar
        citaSustentacion.map(obj => {
            /*obj.nombre = agregarAgenda.nombre;
            obj.apellido = agregarAgenda.apellido;
            obj.correo = agregarAgenda.correo;
            obj.fecha = agregarAgenda.fecha;
            obj.hora = agregarAgenda.hora;
            obj.observacion = agregarAgenda.observacion;*/
            if(obj.id === agregarAgenda.id)
                Object.assign(obj, agregarAgenda);
        });   
        esEditar = false;
        indexEditar = 0;
    }
    
    guardarYRenderizar()
}

function limpiarCampos(){
    nombre.value = "";
    apellido.value = "";
    correo.value = "";
    fecha.value = "";
    hora.value = "";
    observacion.value = "";
}

const redibujarTabla =()=>{

    listar.innerHTML = '';
    citaSustentacion.map(agenda =>{
        const {id, nombre, apellido, correo, fecha, hora, observacion}=agenda

        listar.innerHTML +=`
                    <td>${id}</td>
                    <td>${nombre}</td>
                    <td>${apellido}</td>
                    <td>${correo}</td>
                    <td>${fecha}</td>
                    <td>${hora}</td>
                    <td>${observacion}</td>
                    <td>
                    <button class="btn btn-success" onclick="editarItem(${id})"><img height= "20px" src="https://res.cloudinary.com/danimel/image/upload/v1646015685/edit_nh7sll.png" ></button>
                    <button class="btn btn-danger" onclick="eliminarItem(${id})"><img height= "20px" src="https://res.cloudinary.com/danimel/image/upload/v1646015682/trash_2_vcdean.png" ></button>
                    </td>
        `
    });
}

function eliminarItem(id) {
    indexEditar = citaSustentacion.findIndex((item) => item.id === Number(id))
    citaSustentacion.splice(indexEditar, 1)
    
    guardarYRenderizar()
}

function editarItem(id) {
    esEditar = true;
    indexEditar = citaSustentacion.findIndex((item) => item.id === Number(id))
    const item = citaSustentacion[indexEditar]
    nombre.value = item.nombre;
    apellido.value = item.apellido;
    correo.value = item.correo;
    fecha.value = item.fecha;
    hora.value = item.hora;
    observacion.value = item.observacion;
}

function guardarYRenderizar() {
    localStorage.setItem("Agenda", JSON.stringify(citaSustentacion))
    redibujarTabla()
}



//--------BUSCAR------//
btnBuscar.addEventListener('click', e =>{
    e.preventDefault()

    let buscar = document.getElementById('search').value
    console.log(buscar)
    let filtrarTodos = citaSustentacion.filter(toda => toda.nombre.toUpperCase().includes((buscar.toUpperCase())))

    mostrarBusq.innerHTML = ''
    !filtrarTodos.length ?
        alert('No existe el nombre')
    : 
    filtrarTodos.map(mostrar =>{
        const {nombre, apellido, fecha, hora, observacion} = mostrar

        mostrarBusq.innerHTML +=`
            <h1>${nombre} ${apellido}  </h1>
            <h3>${fecha}</h3>
            <h3>${hora}</h3>
            <h3>${observacion}</h3>
        `
    })
});

//Funcion anonima que inicializa citaSustentacion con lo que hay en el storage
(function(){
    citaSustentacion = JSON.parse(localStorage.getItem("Agenda"))
    redibujarTabla()
})()
//Constantes
const btnLogin = document.querySelector("#btn-login"),
  formLogin = document.querySelector("#form-login"),
  inputUser = document.querySelector("#user"),
  inputPass = document.querySelector("#pass"),
  inputCheck = document.querySelector("#check"),
  errorLogin = document.querySelector("#error"),
  btnSearch = document.querySelector("#btnSearch"),
  inputIngreso = document.querySelector("#ingreso"),
  errorSearch = document.querySelector("#errorSearch"),
  filtroShow = document.querySelector(".filtro"),
  cartWrapper = document.querySelector(".cart-wrapper"),
  btnComprar = document.querySelector("#comprar"),
  comprarAhora = document.querySelector(".comprar-ahora"),
  shoppingCart = document.querySelector("#shoppingCart"),
  sumaTotal = document.querySelector("#sumaTotal"),
  contenedor = document.querySelector("#contenedor");

let usuarioGuardado = "Mela",
  passGuardado = "123";

let validar = function (usuario, password) {
  //console.log(formLogin);
  if (usuarioGuardado === usuario && password === passGuardado) {
    ingreso = true;
    bienvenida.innerHTML = `<h2>Bienvenido a Rainforest Lab ${inputUser.value}</h2>`;
    filtroShow.classList.remove("d-none");
    if (inputCheck.checked) {
      guardar("localStorage");
    } else {
      guardar("sessionStorage");
    }
    formLogin.classList.add("d-none");
  } else {
    errorLogin.innerHTML =
      "El usuario o contrasena esta incorrecto favor intentar de nuevo.";
  }
};

function guardar(valor) {
  let user = { usuario: inputUser.value, password: inputPass.value };
  if (user.usuario === "" || user.password === "") {
    error.innerHTML = "Todos los campos son requeridos";
  } else {
    valor === "sessionStorage" &&
      sessionStorage.setItem("item", JSON.stringify(user));
    valor === "localStorage" &&
      localStorage.setItem("item", JSON.stringify(user));
  }
  return user;
}

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  validar(inputUser.value, inputPass.value);
});

// mostrar valores de local storage en los inputs de login
let usuarioLS = JSON.parse(localStorage.getItem("item"));
console.log("usuario en LS: " + usuarioLS.usuario);
console.log("pw en LS: " + usuarioLS.password);
inputUser.value = usuarioLS.usuario;
inputPass.value = usuarioLS.password;

//Array de productos ofrecidos por la tienda -lista de objetos, array original
let cantidad = 0;
const prodOfrecidos = [
  {
    nombre: "Shampoo Carica",
    propiedad: "antigrasa",
    precio: 6000,
    img: "shampoo-carica.png",
    id: "1",
  },
  {
    nombre: "Rinse Carica",
    propiedad: "antigrasa",
    precio: 5000,
    img: "rinse-carica.png",
    id: "2",
  },
  {
    nombre: "Shampoo Monteverde",
    propiedad: "anticaspa",
    precio: 6500,
    img: "shampoo-monteverde.png",
    id: "3",
  },
  {
    nombre: "Rinse Monteverde",
    propiedad: "anticaspa",
    precio: 6500,
    img: "rinse-monteverde.png",
    id: "4",
  },
  {
    nombre: "Shampoo Guaria",
    propiedad: "crecimiento",
    precio: 6000,
    img: "shampoo-guaria.png",
    id: "5",
  },
  {
    nombre: "Rinse Guaria",
    propiedad: "crecimiento",
    precio: 5500,
    img: "rinse-guaria.png",
    id: "6",
  },
  {
    nombre: "Shampoo Vainilla",
    propiedad: "humectante",
    precio: 7000,
    img: "shampoo-vainilla.png",
    id: "7",
  },
  {
    nombre: "Rinse Vainilla",
    propiedad: "humectante",
    precio: 7000,
    img: "rinse-vainilla.png",
    id: "8",
  },
  {
    nombre: "Shampoo Tangerine",
    propiedad: "detox",
    precio: 6500,
    img: "shampoo-tangerine.png",
    id: "9",
  },
  {
    nombre: "Rinse Tangerine",
    propiedad: "detox",
    precio: 6000,
    img: "rinse-tangerine.png",
    id: "10",
  },
];

//array que voy a rellenar con todo lo que agreguen
const carrito = [];

//Bucle para que pregunte al usuario varias veces hasta que él diga que no quiere agregar mas productos
let confirmacion = true;

btnComprar.addEventListener("click", () => {
  completarCompra(carrito);
});

//conclusion de la compra si o no y adios
function completarCompra(carrito) {
  comprarAhora.classList.add("d-none");
  shoppingCart.innerHTML = `
              <div id="confirmacion">
                <h3>Deseas llevar a cabo la compra por un total de $${calcPrecioTotal(
                  carrito
                )}?</h3>
                <button id="btnNo" class="btn btn-secondary">No</button>
                <button id="btnSi" class="btn btn-success">Si</button>
              </div>`;
  let btnNo = document.querySelector("#btnNo");
  btnNo.addEventListener("click", () => {
    //comprarAhora.classList.remove("d-none");
    // limpia el shoppingcart HTML
    shoppingCart.innerHTML = "adios";
    carrito = [];
    const calcPrecioTotal = 0;
    /*  for (const prodEscogido of carrito) {
      carritoHTML(prodEscogido);
    } */
  });
  let btnSi = document.querySelector("#btnSi");
  btnSi.addEventListener("click", () => {
    shoppingCart.innerHTML =
      "<h3>Gracias por tu compra! Te enviaremos tus productos a la dirección registrada.</h3>";
  });
}

//funcion que calcula el precio total delos articulos carrito
const calcPrecioTotal = (carrito) => {
  let precioTotal = 0;
  for (let i = 0; i < carrito.length; i++) {
    precioTotal += carrito[i].precioSeleccion;
  }
  //console.log("Precio Total:" + precioTotal);
  return precioTotal;
};

//Filtro
function buscarServicio(arr, filtro) {
  const encontrado = arr.find((el) => {
    return el.nombre.includes(filtro);
  });
  return encontrado;
}

// limpiar valores
function limpiar() {
  inputIngreso.value = "";
  errorSearch.innerHTML = "";
}

//muestro lo eocontrado
btnSearch.addEventListener("click", () => {
  if (inputIngreso.value != "") {
    let encontrado = buscarServicio(prodOfrecidos, inputIngreso.value);
    if (encontrado != undefined) {
      crearHtml(encontrado);
      limpiar();
    } else {
      errorSearch.innerHTML = `El producto <strong>"${inputIngreso.value}"</strong> no existe en nuestro inventario.`;
    }
  } else {
    errorSearch.innerHTML = `Debes ingresar algún producto.`;
  }
});

//crear el HTML para lo eocntrado
function crearHtml(card) {
  //creo una variable con un estructura html
  let html = `<div class="card">
                <img src=" ./img/${card.img}" alt="${card.nombre}">
                <hr>
                <h3>${card.nombre}</h3>
                <p>Precio: $${card.precio} </p>
                <div class="card-footer d-flex align-items-center">
                  <div class="card-action">
                    <button class="boton-agregar btn btn-secondary btn-sm" id="${card.id}">Agregar</button>
                  </div>
                  <div class="cantidad">
                    <span class="ps-4 pe-1">Cantidad</span>
                    <select name="cantidad" id="selectCantidad${card.id}">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                </div>
              </div>`;
  //se la agrego al contenedor
  contenedor.innerHTML += html;
  let cantSeleccionada = document.querySelector(`#selectCantidad${card.id}`);
  const botonAgregar = document.querySelectorAll(".boton-agregar");
  botonAgregar.forEach((btn) => {
    btn.addEventListener("click", () => {
      let prodEscogido = new Producto(
        card.nombre,
        card.precio,
        cantSeleccionada.value
      );
      carrito.push(prodEscogido);
      //console.log(carrito);
      cartWrapper.classList.remove("d-none");
      sumaTotal.innerHTML = calcPrecioTotal(carrito);
      carritoHTML(prodEscogido);
    });
  });
}

function carritoHTML(escogido) {
  let html2 = `<div class="chosen-item">
                <h3>Producto: ${escogido.nombre}</h3>
                <p>Precio: $${escogido.precio} </p>
                <p>Cantidad: ${escogido.cantidad} </p>
                <p>Precio seleccion: $${escogido.precioSeleccion} </p>
              </div>`;
  shoppingCart.innerHTML += html2;
}

//carrito-menu de seleccion- objeto constructor
class Producto {
  constructor(nombre, precio, cantidad) {
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.cantidad = parseInt(cantidad);
    this.precioSeleccion = this.precio * this.cantidad;
    //this.img = img;
  }
}

//Esto es para mostrar todos los cards en pantalla pero queda para la entrega final porque no me dio tiempo de arreglarlo
/* for (const card of prodOfrecidos) {
  crearHtml(card);
} */

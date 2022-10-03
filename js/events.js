// 2) Declaración de variables para agregar al carrito

const carro = new Carrito();
const carrito = document.getElementById("carrito");
const productos = document.getElementById("lista-productos");
const listaProductos = document.querySelector("#lista-carrito tbody")

// 9) Declaro Variable (el botón) para vaciar el carrito 

const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

// 21) Variable para el botón procesar-pedido e ingresar a la página compra.html

const procesarPedidoBtn = document.getElementById("procesar-pedido");

// 3) Función: cargarEventos

cargarEventos();

function cargarEventos() {

    // Botón comprar, agrega producto al carrito
    productos.addEventListener("click", (e) => {
        carro.comprarProducto(e);
    });

    // 7) Botón X, elimina producto del carrito
    carrito.addEventListener("click", (e) => {
        carro.eliminarProducto(e);
    });

    // 10) Botón Vaciar Carrito
    vaciarCarritoBtn.addEventListener("click", (e) => {
        carro.vaciarCarrito(e);
    })

    // 17) Muestro lo almacenado en el LS
    document.addEventListener("DOMContentLoaded", () => {
        carro.leerLocalStorage();

        // Muestro los productos del fetch
        fetchProductos();
    })

	// 22) Enviar pedido a la otra página
	procesarPedidoBtn.addEventListener("click", (e) => {
		carro.procesarPedido(e);
	});


}


















/* ----------------------------------- Fetch ----------------------------------- */

async function fetchProductos() {
	let res = await fetch("../data/productos.json");
	let data = await res.json();
	let html = "";
	data.forEach((producto, index) => {
		curr = `
		<div class="card mb-4 shadow-sm">
			<div class="card-header">
				<h4 class="my-0 font-weight-bold">${producto.marca}</h4>
			</div>
			<div class="card-body">
				<img src=${producto.imagen} class="card-img-top" alt=${producto.marca}>
				<h1 class="card-title pricing-card-title precio">USD <span class="">${
					producto.precio
				}</span></h1>

				<ul class="list-unstyled mt-3 mb-4">
				${producto.detalles
					.map(
						(ele) => `
						<li>${ele}</li>
					`
					)
					.join("")}
				</ul>
				<a href="" class="btn btn-block btn-primary agregar-carrito" data-id=${producto.id}>Comprar</a>
			</div>
		</div>
		`;
		if(index === 0){
			html += `<div class="card-deck mb-3 text-center md:w-10">${curr}`
		}else if(index % 3 === 0 && index !== 0){
			html += `</div><div class="card-deck mb-3 text-center md:w-10">${curr}`
		}else{
			html += curr
		}
	});
	productos.innerHTML = html;
}
class Carrito {

    // 1) Método: Agregar producto al carrito

    comprarProducto(e) {
        e.preventDefault();
        if (e.target.classList.contains("agregar-carrito")) {
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);
        }
    }

    // 4) Método: Leer datos del producto

    leerDatosProducto(producto) {
        const infoProducto = {
            imagen : producto.querySelector("img").src,
            titulo : producto.querySelector("h4").textContent,
            precio : producto.querySelector(".precio span").textContent,
            id: producto.querySelector('a').getAttribute('data-id'),
            cantidad : 1,
        }

        // 20) Le digo que compare y no agregue dos productos iguales al carrito, desde el LS; muestro el alert

        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS) {
            if (productoLS.id === infoProducto.id) {
                productosLS = productoLS.id
            }
        });

        if (productosLS === infoProducto.id) {
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'El producto ya está agregado',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            this.insertarCarrito(infoProducto);
        }


    }

    // 5) Método: Insertar y mostrar producto en el carrito

    insertarCarrito(producto) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
            <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
        `;
        listaProductos.appendChild(row);

        // 13) Guardo producto en el LS
        this.guardarProductosLocalStorage(producto);
    }

    // 6) Método: Eliminar producto del carrito (del DOM)

    eliminarProducto(e) {
        e.preventDefault();
        let producto, productoID;
        if (e.target.classList.contains("borrar-producto")) {
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector("a").getAttribute("data-id");
        }

        // 15) Llamo al método de eliminar productos del LS; elimina por ID
        this.eliminarProductoLocalStorage(productoID);

        //
    }

    // 8) Método: Vaciar carrito (elimina todos los productos)

    vaciarCarrito(e) {
        e.preventDefault();
        while (listaProductos.firstChild) {
            listaProductos.removeChild(listaProductos.firstChild);
        }

        // 19) Le indico al método que también vacíe el LS
        this.vaciarLocalStorage();

        return false
    }

    // 11) Método: Guardar productos en el LS

    guardarProductosLocalStorage(producto) {
        let productos;
        productos = this.obtenerProductosLocalStorage();

        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    // 12) Método: Obtener productos LS

    obtenerProductosLocalStorage() {
        let productoLS;

        // Leo y verifico si hay productos en el LS
        if (localStorage.getItem("productos") === null) {
            productoLS = [];
        }
        else {
            productoLS = JSON.parse(localStorage.getItem("productos"));
        }
        return productoLS;
    }

    // 16) Método: Leo y muestro los productos guardados en el LS

    leerLocalStorage() {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>
            `;
            listaProductos.appendChild(row);
        });
    }

    // 14) Método: Eliminar producto del LS

    eliminarProductoLocalStorage(productoID) {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();

        productosLS.forEach(function(productoLS, index) {
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });
        localStorage.setItem("productos", JSON.stringify(productosLS));
    }

    // 18) Método: Vaciar el LS

    vaciarLocalStorage() {
        localStorage.clear();
    }

    // 23) Chequeo si hay productos en el carrito, y en caso positivo, proceso el pedido

    procesarPedido(e){
        e.preventDefault();

        // Chequeo si hay productos en el carrito para procesar el pedido
        if(this.obtenerProductosLocalStorage().length === 0){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'El carrito está vacío, agrega algún producto',
                showConfirmButton: false,
                timer: 2000
            })
        }
        else {
            location.href = "compra.html";
        }
    }

}
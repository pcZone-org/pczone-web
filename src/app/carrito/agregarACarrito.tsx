
export default function addCarrito(id: number, nombre: string, precio: number, imagen_url?: string){
    const nuevoProducto = {
        id: id || 1, 
        nombre: nombre || "Producto de ejemplo",
        precio: precio || 0,
        imagen: imagen_url || "https://via.placeholder.com/150",
        cantidad: 1,
    };

    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const existe = carrito.find((p: any) => p.id === nuevoProducto.id);

    if (!existe) {
        carrito.push(nuevoProducto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert("Producto agregado al carrito");
    }
}
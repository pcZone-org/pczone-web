
export default function addCarrito(id: number, nombre: string, precio: number, imagen_url?: string){
    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("Debés iniciar sesión para agregar productos al carrito");
        return;
    }
    
    const nuevoProducto = {
        id: id || 1, 
        nombre: nombre || "Producto de ejemplo",
        precio: precio || 0,
        imagen: imagen_url || "",
        cantidad: 1,
    };

    const carrito = JSON.parse(localStorage.getItem("carrito_" + userId) || "[]");
    const existe = carrito.find((p: any) => p.id === nuevoProducto.id);

    if (!existe) {
        carrito.push(nuevoProducto);
        localStorage.setItem("carrito_" + userId, JSON.stringify(carrito));
        
    }
}
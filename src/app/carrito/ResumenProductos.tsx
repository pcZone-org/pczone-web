import Image from "next/image";
import { useState, useEffect } from "react";
import { div } from "three/tsl";

const mockProductos = [
    {
        id: 1,
        nombre: "Producto x",
        precio: 1234,
        imagen: "https://pcsupptnitvozhbhfxiu.supabase.co/storage/v1/object/public/cpus//AMD%20Ryzen%205%201500X.webp",
        cantidad: 1,
    },
    {
    id: 2,
    nombre: "Placa de Video RTX 3060",
    precio: 1234,
    imagen: "https://pcsupptnitvozhbhfxiu.supabase.co/storage/v1/object/public/graficas//NVIDIA%20GeForce%20RTX%203060.png",
    cantidad: 2,
    },
  // agregá más si querés
];
type Producto = {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    cantidad: number;
};

type ResumenProductosProps = {
    onTotalChange: (total: number) => void;
};

export default function ResumenProductos({ onTotalChange }: ResumenProductosProps) {
    
    const [productos, setProductos] = useState<Producto[]>([]);

    
    useEffect(() => {
        const guardados = localStorage.getItem("carrito");
        if (guardados) {
            setProductos(JSON.parse(guardados));
        }
    }, []);

    useEffect(() => {
        const total = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
        onTotalChange(total);
    }, [productos, onTotalChange]);

    // Guardar en localStorage cada vez que se modifica el carrito
    /*
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(productos));
    }, [productos]);
    */

    const aumentarCantidad = (id: number) => {
        setProductos((prev) =>
        prev.map((p) =>
            p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
        )
        );
    };

    const disminuirCantidad = (id: number) => {
        setProductos((prev) =>
        prev.map((p) =>
            p.id === id && p.cantidad > 1
            ? { ...p, cantidad: p.cantidad - 1 }
            : p
        )
        );
    };

    const eliminarProducto = (id: number) => {
        setProductos((prev) => prev.filter((p) => p.id !== id));
    };

    if (productos.length === 0) {
        return (
        <div className="relative basis-1/3 min-h-80 bg-white rounded-lg shadow-lg p-4 m-4 text-black">
            <h2 className="text-2xl font-semibold mb-4 border-b border-black">Productos</h2>
            <p className="text-center text-gray-500">No hay productos en el carrito.</p>
        </div>
        )
    } 
    return (
        <div className="relative basis-1/3 min-h-100 bg-white rounded-lg shadow-lg p-4 m-4 text-black"> 
            <h2 className="text-2xl font-semibold mb-4 border-b border-black">Productos</h2>
            <ul className="space-y-4">
                {productos.map((prod) => (
                <li key={prod.id} className="flex items-center gap-3">
                    <Image src={prod.imagen} alt={prod.nombre} width={60} height={60} />
                    <div className="flex-1">
                    <p>{prod.nombre}</p>
                    <p className="text-blue-600 font-bold">${prod.precio}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {prod.cantidad === 1 ? (
                            <button
                                onClick={() => eliminarProducto(prod.id)}
                                className="text-red-500 text-sm cursor-pointer hover:underline"
                                >
                                Eliminar
                                </button>
                            ) : (
                                <button
                                onClick={() => disminuirCantidad(prod.id)}
                                className="px-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
                                >
                                −
                                </button>
                            )}
                        <span>{prod.cantidad}</span>
                        <button
                            onClick={() => aumentarCantidad(prod.id)}
                            className="px-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300">
                                    +
                        </button>
                    </div>
                </li>
                ))}
            </ul>
            <div className="mt-4 border-t pt-4">
                <p className="text-lg font-semibold">Total de Productos: 
                    <span className="text-blue-600 ml-2">
                        ${productos.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)}
                    </span>
                </p>
                <p className="text-sm text-gray-600">Este total no cuenta con el envio</p>
            </div>
        </div>
    );
}

'use client';
import { useEffect, useState } from 'react';

export default function SelectorComponente({ tipo, nombre, seleccionado, onSelect }: any) {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch(`/api/productos?componente=${tipo}`)
        .then((res) => res.json())
        .then((data) => setProductos(data.productos));
    }, [tipo]);

    return (
        <div>
        <h2 className="text-xl font-semibold mb-2">{nombre}</h2>
        <div className="grid md:grid-cols-6 gap-4">
            {productos.map((p: any) => (
            <div
                key={p.id}
                onClick={() => onSelect(tipo, p)}
                className={`cursor-pointer rounded border-2 bg-white transition hover:bg-blue-800 ${
                seleccionado?.id === p.id ? 'border-blue-400 bg-blue-900' : 'border-white-200'
                }`}
            >
                <img src={p.imagen_url || '/imagenes/fallback.png'} className="w-full h-32 object-contain mb-2" />
                <p className="text-black text-center text-sm font-bold">{p.name}</p>
                <p className="text-blue-500 bold text-center">${p.price}</p>
            </div>
            ))}
        </div>
        </div>
    );
}

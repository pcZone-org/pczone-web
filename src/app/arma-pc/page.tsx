"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import SelectorComponente from '@/app/arma-pc/SelectorComponente';
import ResumenBuild from '@/app/arma-pc/ResumenBuild';
import addCarrito from "@/app/carrito/agregarACarrito";

export default function ArmaTuPcPage() {
    const [build, setBuild] = useState<{ [key: string]: any }>({});
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = localStorage.getItem("userId");

    const pasoActual = searchParams.get('paso') || 'cpus';

    const CATEGORIAS = [
        { tipo: 'cpus', nombre: 'Procesador' },
        { tipo: 'mothers', nombre: 'Motherboard' },
        { tipo: 'rams', nombre: 'Memoria RAM' },
        { tipo: 'graficas', nombre: 'Placa de video' },
        { tipo: 'fuentes', nombre: 'Fuente' },
        { tipo: 'coolers', nombre: 'Cooler' },
        { tipo: 'memorias_internas', nombre: 'Disco interno' },
        { tipo: 'memorias_externas', nombre: 'Disco externo' },
        { tipo: 'gabinetes', nombre: 'Gabinete' },
    ];

    const handleSeleccionar = (tipo: string, producto: any) => {
        setBuild((prev) => ({ ...prev, [tipo]: producto }));


        const index = CATEGORIAS.findIndex((c) => c.tipo === tipo);
        const siguiente = CATEGORIAS[index + 1];
        if (siguiente) {
            router.push(`/arma-pc?paso=${siguiente.tipo}`);
        }
    }; 

    const seleccionados = Object.keys(build).length;
    const puedeIrAlCarrito = seleccionados >= 2;
    const productosBuild = Object.entries(build);

    const handleAgregarTodosAlCarrito = (e: React.FormEvent) => {
        e.preventDefault();

        const carrito = JSON.parse(localStorage.getItem("carrito_" + userId) || "[]");

        productosBuild.forEach(([_, prod]: any) => {
            console.log("Producto:", prod);
            if (!carrito.find((p: any) => p.id === prod.id)) {

                carrito.push({
                id: prod.id,
                nombre: prod.name,
                precio: prod.price,
                imagen: prod.imagen_url,
                cantidad: 1
            });
            }
        });

        localStorage.setItem("carrito_" + userId, JSON.stringify(carrito));
        router.push("/carrito");
    };

    return (
    <div className="flex min-h-screen text-white">
      {/* ASIDE */}
            <aside className="bg-[#0E1C2F] p-4 w-28 flex flex-col items-center gap-4">
            {CATEGORIAS.map((cat) => (
            <Link key={cat.tipo} href={`/arma-pc?paso=${cat.tipo}`}>
                <Image
                src={`https://pcsupptnitvozhbhfxiu.supabase.co/storage/v1/object/public/imagenes/iconosComponentes/${mapIcon(cat.tipo)}.png`}
                alt={cat.nombre}
                width={48}
                height={48}
                className={`transition ${
                    pasoActual === cat.tipo ? 'rounded-lg' : 'grayscale hover:scale-110'
                }`}
                />
            </Link>
            ))}
            </aside>

        {/* CONTENIDO */}
        <main className="flex-1 p-6">
            <h1 className="text-3xl font-bold mb-4 text-center">Armá tu PC paso a paso</h1>
            <p className="text-center mb-6">Seleccioná cada componente para armar tu PC ideal</p>

            {CATEGORIAS.map(
            (cat) =>
                cat.tipo === pasoActual && (
                <SelectorComponente
                    key={cat.tipo}
                    tipo={cat.tipo}
                    nombre={cat.nombre}
                    seleccionado={build[cat.tipo]}
                    onSelect={handleSeleccionar}
                />
                )
            )}

            <ResumenBuild build={build} />
            

            {Object.keys(build).length >= 2 && (
                    <form onSubmit={handleAgregarTodosAlCarrito}>
                    <button type='submit'
                    className="bg-white text-blue-500 hover:bg-blue-600 hover:text-white rounded-full px-4 py-2 mt-6 flex items-center gap-2 transition-colors cursor-pointer" >
                        <Image 
                        src={"https://pcsupptnitvozhbhfxiu.supabase.co/storage/v1/object/public/imagenes//carritoIcon.svg"} 
                        alt='carrito' 
                        width={24} 
                        height={24} />

                        Ir al carrito
                    </button>
                </form>
                )}
            
        </main>
        </div>
    );
}

// Mapea tipo de componente al nombre del ícono
function mapIcon(tipo: string) {
    const map: Record<string, string> = {
        cpus: 'cpu',
        mothers: 'mother',
        rams: 'ram',
        graficas: 'gpu',
        fuentes: 'power',
        coolers: 'cooler',
        memorias_internas: 'hdd',
        memorias_externas: 'hdd',
        gabinetes: 'case',
    };
    return map[tipo] || tipo;
}

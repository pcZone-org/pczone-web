"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import logo_movile from "@/imagenes/logo-pcZone.png";
import logo from "@/imagenes/PCZone_Horizntal.png";
import carritoIcon from "@/imagenes/Icons/carritoIcon.svg";


export default function Header() {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState('');
  const [sugerencias, setSugerencias] = useState<any[]>([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (busqueda.trim().length > 1) {
        fetch(`/api/productos?nombre=${encodeURIComponent(busqueda)}&limit=5`)
          .then((res) => res.json())
          .then((data) => {
            setSugerencias(data.productos || []);
            setMostrarSugerencias(true);
          });
      } else {
        setSugerencias([]);
        setMostrarSugerencias(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [busqueda]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (busqueda.trim() !== '') {
      router.push(`/busqueda?nombre=${encodeURIComponent(busqueda)}&orden=precio_asc`);
      setBusqueda('');
    }
  };

  const handleClickSugerencia = (nombre: string) => {
    router.push(`/busqueda?nombre=${encodeURIComponent(nombre)}`);
    setBusqueda('');
    setMostrarSugerencias(false);
  };
  
  function handleProfileClick(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <header className="bg-[#0E1C2F] text-white px-6 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Image
              src={logo_movile}
              alt="PCZone Logo movile"
              width={70}
              height={40}
              className="md:hidden rounded-2xl"
            />
            <Image
              src={logo}
              alt="PCZone Logo"
              width={100}
              height={40}
              className="hidden md:block rounded-full"
            />
          </Link>
          <nav className="hidden md:flex gap-10 font-medium">
            <Link href="/">INICIO</Link>
            <Link href="/productos">PRODUCTOS</Link>
            <Link href="/arma-pc">ARMA TU PC</Link>
            <Link href="/compra-x-zona">COMPRA EN TU ZONA</Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 bg-white rounded-full px-4 py-1">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              placeholder="Buscar nombre del producto"
              aria-label="Buscar"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="rounded-full px-4 py-1 text-black text-sm focus:outline-none w-32 md:w-48"
            />
            <button type="submit" className="bg-white rounded-full p-1 cursor-pointer hover:bg-gray-200" >
              🔍
            </button>
          </form>
          
        </div>
          {mostrarSugerencias && sugerencias.length > 0 && (
            <ul className="absolute bg-white text-black rounded-lg shadow-lg z-10 top-11 left-1/2 -translate-x-1/2  max-h-60 overflow-y-auto">
              {sugerencias.map((sug) => (
                <li
                  key={`${sug.tipo}-${sug.id}`}
                  onClick={() => handleClickSugerencia(sug.name)}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {sug.name} - <span className="font-semibold capitalize">{sug.tipo.replace("_", " ")}</span>
                </li>
              ))}
            </ul>
          )}

        <div className="flex items-center gap-10 font-medium">
          <Link href="/guias">GUIAS</Link>
          <Link href="/carrito" className="flex items-center gap-1">
            <Image src={carritoIcon} alt="Carrito" width={18} height={18} className="invert" />
            CARRITO
          </Link>
          <Link href="/faq">FAQ</Link>
        </div>

        <button
          onClick={handleProfileClick}
          className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center"
        >
          👤
        </button>
      </div>
    </header>
  );
}

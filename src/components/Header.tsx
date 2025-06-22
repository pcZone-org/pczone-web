"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import logo_movile from "@/imagenes/logo-pcZone.png";
import logo from "@/imagenes/PCZone_Horizntal.png";
import carritoIcon from "@/imagenes/Icons/carritoIcon.svg";

export default function Header() {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (busqueda.trim()) {
      router.push(`/busqueda?nombre=${encodeURIComponent(busqueda)}&orden=precio_asc`);
    }
  };

  const handleProfileClick = () => {
    const role = localStorage.getItem("role");
    if (role === "usuario") router.push("/perfil-user");
    else if (role === "vendedor") router.push("/perfil-vendedor");
    else router.push("/login");
  };

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
          <input
            type="text"
            placeholder="Buscar..."
            aria-label="Buscar"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-32 md:w-48 px-4 py-1 rounded-full text-black focus:outline-none text-sm"
          />
          <button
            onClick={handleSubmit}
            className="bg-white p-1 rounded-full hover:bg-gray-200"
          >
            🔍
          </button>
        </div>

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

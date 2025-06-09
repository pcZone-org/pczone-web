'use client';
import Link from "next/link";

export default function SidebarMenu() {
    return (
        <aside className="w-64 p-4 text-white border-r border-white/30">
            <h2 className="text-lg mb-4">Categorías</h2>
            <div className="ml-2">
                <p className="text-red-500 hover:underline"><Link href={"busqueda?componente=cpus"}>Procesadores</Link></p>
                <ul className="ml-4 text-sm space-y-1">
                    <li className="hover:underline"><Link href={"busqueda?componente=cpus&nombre=amd"}>Procesadores AMD</Link></li>
                    <li className="hover:underline"><Link href={"busqueda?componente=cpus&nombre=intel"}>Procesadores Intel</Link></li>
                </ul>
                <p className="text-red-500 mt-4 hover:underline"><Link href={"busqueda?componente=mothers"}>Mothers</Link></p>
                <ul className="ml-4 text-sm space-y-1">
                    <li className="hover:underline"><Link href={"busqueda?componente=mothers&nombre=asus"}>Mothers Asus</Link></li>
                    <li className="hover:underline"><Link href={"busqueda?componente=mothers&nombre=msi"}>Mothers MSI</Link></li>
                    <li className="hover:underline"><Link href={"busqueda?componente=mothers&nombre=gigabyte"}>Mothers Gigabyte</Link></li>
                </ul>
                <p className="text-red-500 mt-4 hover:underline"><Link href={"busqueda?componente=graficas"}>Placas de Video</Link></p>
                <ul className="ml-4 text-sm space-y-1">
                    <li className="hover:underline"><Link href={"busqueda?componente=graficas&nombre=geforce"}>GeForce</Link></li>
                    <li className="hover:underline"><Link href={"busqueda?componente=graficas&nombre=radeon"}>Radeon</Link></li>
                </ul>
                <p className="text-red-500 mt-4 hover:underline"><Link href={"busqueda?componente=rams"}>Memoias RAM</Link></p>
                <p className="text-red-500 mt-4">Almacenaminto</p>
                <ul className="ml-4 text-sm space-y-1">
                    <li className="hover:underline"><Link href={"busqueda?componente=memorias_externas"}>Discos Externos</Link></li>
                    <li className="hover:underline"><Link href={"busqueda?componente=memorias_internas"}>Discos Intenos</Link></li>
                </ul>
                <p className="text-red-500 mt-4 hover:underline"><Link href={"busqueda?componente=coolers"}>Refrigeracion</Link></p>
                <p className="text-red-500 mt-4 hover:underline"><Link href={"busqueda?componente=sounds"}>Placa de Sonido</Link></p>
                <p className="text-red-500 mt-4 hover:underline"><Link href={"busqueda?componente=gabinetes"}>Gabinetes</Link></p>
                <p className="text-red-500 mt-4 hover:underline"><Link href={"busqueda?componente=fuentes"}>Fuentes</Link></p>
            </div>
        </aside>
    );
}

'use client';
import Link from "next/link";

export default function SidebarMenu() {
    return (
        <aside className="w-64 p-4 text-white border-r border-white/30">
            <h2 className="text-lg mb-4">Categorías</h2>
            <div className="ml-2">
                <p className="text-red-500 hover:underline"><Link href={"busqueda?nombre=cpus"}>Procesadores</Link></p>
                <ul className="ml-4 text-sm space-y-1">
                    <li>Procesadores AMD</li>
                    <li>Procesadores Intel</li>
                </ul>
                <p className="text-red-500 mt-4 hover:underline"><Link href={"busqueda?nombre=mothers"}>Mothers</Link></p>
                <ul className="ml-4 text-sm space-y-1">
                    <li>Mothers AMD</li>
                    <li>Mothers Intel</li>
                </ul>
                <p className="text-red-500 mt-4 hover:underline"><Link href={"busqueda?nombre=graficas"}>Placas de Video</Link></p>
                <ul className="ml-4 text-sm space-y-1">
                    <li>GeForce</li>
                    <li>Radeon</li>
                    <li>ARC</li>
                </ul>
                <p className="text-red-500 mt-4 hover:underline"><Link href={"busqueda?nombre=ram"}>Memoias RAM</Link></p>
                <p className="text-red-500 mt-4">Almacenaminto</p>
                <ul className="ml-4 text-sm space-y-1">
                    <li className="hover:underline"><Link href={"busqueda?nombre=memorias_externas"}>Discos Externos</Link></li>
                    <li>Discos Duros HDD</li>
                    <li>Discos Solidos SSD</li>
                </ul>
                <p className="text-red-500 mt-4 hover:underline"><Link href={"busqueda?nombre=coolers"}>Refrigeracion</Link></p>
                <p className="text-red-500 mt-4 hover:underline"><Link href={"busqueda?nombre=gabinetes"}>Gabinetes</Link></p>
                <p className="text-red-500 mt-4 hover:underline"><Link href={"busqueda?nombre=fuentes"}>Fuentes</Link></p>
            </div>
        </aside>
    );
}

"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ResumenProductos from '@/app/carrito/ResumenProductos';


export default function Carrito() {
    const [codigoPostal, setCodigoPostal] = useState('');
    const [costoEnvio, setCostoEnvio] = useState<number | null>(null);
    const router = useRouter();
    const [totalProductos, setTotalProductos] = useState(0);

    const calcularEnvio = () => {
        const codigoPostalTrim = Number(codigoPostal.trim());
        if (codigoPostalTrim % 2 === 0 && codigoPostalTrim > 0  ) {
            const costo = Number(codigoPostal.trim()) * 0.03; 
            setCostoEnvio(costo);
        } else {
            const costo = Number(codigoPostal.trim()) * 0.05; 
            setCostoEnvio(costo);
        }
    };

    const totalFinal = totalProductos + (costoEnvio ?? 0);
    
    return(
        <main className="min-h-screen p-6">
            <h1 className="text-5xl font-bold mb-4 text-center underline">Carrito</h1>
            <div className="flex flex-row items-center">
                <div className="static basis-2/3  rounded-lg bg-[#102647] shadow-lg p-4 m-4 ">
                    <div className="relative min-h-80 text-black bg-white rounded-lg p-3">
                        <h2 className="font-semibold text-2xl mb-4 border-b border-black">Envio</h2>
                            
                        <div className="relative mb-2">
                            <input
                                type="text"
                                placeholder="Código postal"
                                value={codigoPostal}
                                onChange={(e) => setCodigoPostal(e.target.value)}
                                className="w-full border rounded-full px-4 py-2"
                            />
                            <button
                                onClick={calcularEnvio}
                                className="absolute cursor-pointer bg-blue-400 rounded-r-full right-2 top-1/2 px-3 mr-[-10px] m h-full -translate-y-1/2"
                            >
                                Calcular
                            </button>
                        </div>

                        <p className="tracking-tight text-sm text-gray-500 mb-4">Ingresa tu Codigo postal, para calcular costo de envio.</p>
                        <h4 className="block text-gray-700 font-semibold mb-1 underline">Costo de Envio</h4>
                        <span className="text-blue-600">
                            {costoEnvio !== null ? `$${costoEnvio}` : "$0"}
                        </span>

                        <h4 className="block text-gray-700 font-semibold mb-1 underline">Direccion de envio</h4>
                        <div className="grid grid-cols-2 gap-4 px-3 py-2">
                            <select className="bg-gray-200 p-2 rounded"> <option>Provincia</option> </select>
                            <select className="bg-gray-200 p-2 rounded"> <option>Ciudad</option> </select>
                            <select className="bg-gray-200 p-2 rounded col-span-1"> <option>Calle</option> </select>
                            <input className="border border-grey-300 rounded-lg placeholder:text-gray-500 p-2" placeholder="Altura" type="text" />
                        </div>
                    </div>
                </div>
                
                <ResumenProductos onTotalChange={setTotalProductos}/>
                
            </div>
            
            <div className="flex flex-row justify-center gap-4 mt-8">
                <button
                type="submit"
                className="bg-blue-500 px-4 py-2 w-50 h-auto rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
                onClick={() => router.push("/pago?monto=" + totalFinal)}>
                    Ir a Pagar (${totalFinal.toFixed(2)})
                </button>
            </div>
        </main>
    )
}
"use client"
import { useSearchParams } from 'next/navigation';
import {
    Check,
    Shield, 
    Truck,
    CheckCircle
} from "lucide-react";
import addCarrito from "@/app/carrito/agregarACarrito";
import Image from 'next/image';
import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

export default function ProductoIndividual(){
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const userName = typeof window !== "undefined" ? localStorage.getItem("userName") : "";
    //const user = JSON.parse(localStorage.getItem("role") || "")

    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setTimeout(() => {
            if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
                setCurrent(0);
                api.scrollTo(0);
            } else {
                api.scrollNext();
                setCurrent(current + 1);
            }
            }, 5000);
    }, [api, current]);

    return(
        <div className='min-h-screen mx-5'>
            <div className='flex gap-4 columns-2 items-center justify-center m-5'>
                <div className='flex flex-col gap-2 items-center justify-center mt-5 w-3/4 pb-5 border-b border-white/30 border-dashed'>
                    <Image
                    className=''
                    src={"https://pcsupptnitvozhbhfxiu.supabase.co/storage/v1/object/public/fuentes//Corsair%20RM650,%2080+%20Gold%20650W.jpg"} alt={"fuente"} width={500} height={500} />
                    <br />
                    <button className='rounded-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4' /*onClick={() => addCarrito()}*/>
                        Agregar al carrito
                    </button>
                </div>


                <div className='flex flex-col gap-4 bg-white text-black p-4 w-1/4 min-h-[65vh] rounded-xl'>
                    <p className='border-b border-black/30 border-dashed'>Categoria {">"} Producto</p>

                    <br className='border-b border-white/30'/>

                    <h1 className='text-3xl border-b border-black/30 border-dashed'>Nombre del Producto</h1>

                    <div className='flex flex-row gap-4 border-b border-black/30 border-dashed'>
                        <div className='grow'>
                            <h2 className='text-blue-500 text-2xl'>Precio Total</h2>
                            <span className='text-sm text-gray-500'>Precio en un pago</span>
                        </div>
                        <h3>12 cuotas fijas de <br /><span className='text-blue-700'>Precio en cuotas</span></h3>
                    </div>

                    
                    <div className='grow text-xl border-b border-black/30 border-dashed'>
                        <div className='flex flex-row gap-2 items-center'>
                            <Shield/>
                            <p>
                                Garantia Oficial - 36 Meses
                            </p>
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <Check/>
                            <p>
                                Stock disponible
                            </p>
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <Truck/>
                            <p>
                                Envio disponible a todo el pais
                            </p>
                        </div>
                    </div>
                    
                    <h3 className='text-md'>Vendido por <span className='text-blue-500 font-bold'>{userName || "Usuario"}</span></h3>
                    <br className='border-2 border-sky-500 border-dashed'/>
                </div>
            </div>

            <br className='after:border-b after:border-red-500'/>

            <div>
                <h1 className='flex justify-start m-5 text-3xl'>Productos relacionados</h1>
                <Carousel setApi={setApi} className="w-3/4">
                <CarouselContent>
                    {Array.from({ length: 10 }).map((_, index) => (
                        <CarouselItem className="basis-1/4 lg:basis-1/6" key={index}>
                        <div className="flex rounded-md aspect-square bg-blue-800/30 border border-blue-500 items-center justify-center p-6 mx-6">
                            <span className="text-sm">Logo {index + 1}</span>
                        </div>
                        <h4 className='flex justify-center'>Producto {index + 1}</h4>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            </div>

            <br/>
            
            <section className='grid grid-cols-2 gap-4 justify-center bg-[#102647] w-3/4 p-5 mb-6 rounded-xl'>
                <div>
                    <h1 className='text-md border-b border-blue-500'>CARACTERISTICAS GENERALES</h1>
                    <div className='flex flex-row gap-2'>
                        <span>Modelo:</span>
                        <span className='grow'>tipo de modelo</span>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <span>Socket:</span>
                        <span className='grow'>tipo de modelo</span>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <span>Chipset Gpu:</span>
                        <span className='grow'>tipo de modelo</span>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <span>Familia:</span>
                        <span className='grow'>tipo de modelo</span>
                    </div>
                </div>
                <div>
                    <h1 className='text-md border-b border-blue-500'>ESPECIFICACIONES</h1>
                    <div className='flex flex-row gap-2'>
                        <span>Núcleos:</span>
                        <span className='grow'>tipo de modelo</span>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <span>Frecuencia:</span>
                        <span className='grow'>tipo de modelo</span>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <span>Hilos:</span>
                        <span className='grow'>tipo de modelo</span>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <span>Frecuencia Turbo:</span>
                        <span className='grow'>tipo de modelo</span>
                    </div>
                </div>
            </section>
            <br />
        </div>
    )
}
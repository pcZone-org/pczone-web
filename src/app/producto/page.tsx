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
import Link from "next/link";
import CaracteristicasDinamicas from "./caracteristicasDinamicas";



export default function ProductoIndividual(){
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const componente = searchParams.get('componente');
    const [producto, setProducto] = useState<any>(null);
    const [recomendados, setRecomendados] = useState<any[]>([]);

    useEffect(() => {
    if (!id || !componente) return;

    fetch(`/api/productos?componente=${componente}&id=${id}`)
        .then((res) => res.json())
        .then((data) => {
            setProducto(data);
        });

    fetch(`/api/productos?componente=${componente}&id=${id}&relacionados=true`)
        .then(res => res.json())
        .then(data => {
            setRecomendados(data);
        });
    }, [id, componente]);

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
            {producto && producto.imagen_url && (
                <>
                <div className='flex gap-4 columns-2 items-center justify-center m-5'>
                    <div className='flex flex-col gap-2 items-center justify-center mt-5 w-3/4 pb-5 border-b border-white/30 border-dashed'>
                    {/*
                        <Image
                        className=''
                        src={"https://pcsupptnitvozhbhfxiu.supabase.co/storage/v1/object/public/cpus//AMD%20Ryzen%205%201500X.webp"} alt={"producto"} width={500} height={500} />
                        <br />
                        <button className='rounded-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4' onClick={() => addCarrito()}>
                            Agregar al carrito
                        </button> 
                        <button className='rounded-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4'>
                            Agregar al carrito
                        </button>*/}
                        
                        <Image
                            src={producto.imagen_url}
                            alt={producto.name}
                            width={500}
                            height={500}
                        />

                        <button  
                        className='rounded-xl bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer'
                        onClick={() =>
                            addCarrito(producto.id, producto.name, producto.price, producto.imagen_url)
                        }>
                            Agregar al carrito
                        </button>
                    </div>


                    <div className='flex flex-col gap-4 bg-white text-black p-4 w-1/4 min-h-[65vh] rounded-xl'>
                        <p className='border-b border-black/30 border-dashed capitalize'> {componente + " > " +  producto.name} </p>

                        <br className='border-b border-white/30'/>

                        <h1 className='text-3xl border-b border-black/30 border-dashed'>{producto.name}</h1>

                        <div className='flex flex-row gap-4 border-b border-black/30 border-dashed'>
                            <div className='grow'>
                                <h2 className='text-blue-500 text-2xl'>USD${producto.price}</h2>
                                <span className='text-sm text-gray-500'>Precio en un pago</span>
                            </div>
                            <h3>12 cuotas fijas de <br /><span className='text-blue-700'>USD${(producto.price * 0.10).toFixed(2)}</span></h3>
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
            </>
            )}

            <br className='after:border-b after:border-red-500'/>

            <div>
                <h1 className='flex justify-start m-5 text-3xl'>Productos relacionados</h1>
                <Carousel setApi={setApi} className="w-3/4">
                    <CarouselContent>
                        {recomendados.map((prod) => (
                            <CarouselItem className="basis-1/4 lg:basis-1/6" key={prod.id}>
                                <Link href={`/producto?componente=${componente}&id=${prod.id}`}>
                                    <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition">
                                    <Image
                                        src={prod.imagen_url || "/imagenes/producto-ejemplo.png"}
                                        alt={prod.name}
                                        width={100}
                                        height={100}
                                        className="object-contain rounded-md border border-gray-300 p-2 bg-white"
                                    />
                                    <h4 className='text-sm text-center mt-2 line-clamp-2'>{prod.name}</h4>
                                    <p className='text-blue-500 font-bold'>${prod.price}</p>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            <br/>
            
            {/*<section className='grid grid-cols-2 gap-4 justify-center bg-[#102647] w-3/4 p-5 mb-6 rounded-xl'>
            {producto && (
                <>
                <div>
                    <h1 className='text-md border-b border-blue-500'>CARACTERISTICAS GENERALES</h1>
                    <div className='flex flex-row gap-2'>
                        <span>Modelo:</span>
                        <span className='grow'>{}</span>
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
                </>
                )}
            </section>*/}
            {producto && componente && (
                <CaracteristicasDinamicas producto={producto} tipo={componente} />
            )}
            <br />
        </div>
    )
}
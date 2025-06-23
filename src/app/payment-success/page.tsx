"use client"
import { useRouter } from 'next/navigation';

export default function PaymentSuccess({
        searchParams: { amount },
    }: {
        searchParams: { amount: string };
    }) {
        const router = useRouter();
    return (
        <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-blue-800">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold mb-2">¡Muchas Gracias!</h1>
                <h2 className="text-2xl">Has enviado correctamente</h2>

                <div className="bg-white p-2 rounded-md text-blue-800 mt-5 text-4xl font-bold">
                ${amount}
                </div>
            </div>
            <button onClick={() => router.push("/")} className='rounded-md bg-white text-black cursor-pointer border  hover:bg-blue-500 hover:text-white p-2 m-2'>
                Volver al Inicio
            </button>
        </main>
    );
}
'use client';

import { useState } from 'react';

const preguntas = [
    {
        pregunta: '¿Qué tipo de componentes se venden en PCZone?',
        respuesta: 'Vendemos tanto componentes nuevos como usados: procesadores, placas de video, fuentes, memorias, discos, gabinetes y más.',
    },
    {
        pregunta: '¿Cómo puedo saber si un producto es nuevo o usado?',
        respuesta: 'Cada producto tiene una etiqueta que indica su estado. Además, podés ver el perfil del vendedor si se trata de un componente usado.',
    },
    {
        pregunta: '¿Puedo publicar mis propios productos?',
        respuesta: 'Sí. Solo necesitás tener una cuenta y completar el formulario de publicación desde tu perfil.',
    },
    {
        pregunta: '¿PCZone arma PC por mí?',
        respuesta: 'No directamente, pero en nuestra sección de armado paso a paso te guiamos para que lo hagas vos mismo.',
    },
    {
        pregunta: '¿Tienen soporte técnico?',
        respuesta: 'Sí, contamos con un sistema de soporte vía chat o email para consultas técnicas sobre tus compras.',
    },
];

export default function FAQPage() {
    const [abierta, setAbierta] = useState<number | null>(null);

    return (
        <div className="min-h-screen text-white px-6 py-12">
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Preguntas Frecuentes</h1>

            <div className="space-y-4">
            {preguntas.map((item, i) => (
                <div key={i} className="border border-white/30 rounded-lg overflow-hidden">
                <button
                    className="w-full text-left p-4 bg-blue-800 hover:bg-blue-700 transition"
                    onClick={() => setAbierta(abierta === i ? null : i)}
                >
                    <div className="flex justify-between items-center">
                    <span className="font-semibold">{item.pregunta}</span>
                    <span>{abierta === i ? '−' : '+'}</span>
                    </div>
                </button>
                {abierta === i && (
                    <div className="p-4 bg-blue-900 border-t border-white/20 text-gray-200">
                    {item.respuesta}
                    </div>
                )}
                </div>
            ))}
            </div>
        </div>
        </div>
    );
}

'use client';
import {
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Send,
    Github
} from "lucide-react";
import { useState, useRef } from 'react';
import emailjs from "@emailjs/browser";
import { useToast } from "../../components/hooks/use-toast";

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
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    
    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formRef.current) {
        setIsSubmitting(false);
        toast({
            title: "Error",
            description: "No se pudo enviar tu mensaje. Intenta nuevamente más tarde.",
        });
        return;
    }
    
    emailjs
        .sendForm(
            "default_service",     
            "template_oz4l4ir",    
            formRef.current,
            "jLT0e7lEuu-v2DUqm"      
        )
        .then(() => {
            toast({
                title: "¡Mensaje enviado!",
                description: "Gracias por contactarme, me pondré en contacto contigo lo antes posible.",
            });
            setIsSubmitting(false);
            formRef.current?.reset();
        })
        .catch((error) => {
            console.error("Error al enviar mensaje:", error);
            toast({
                title: "Error",
                description: "No se pudo enviar tu mensaje. Intenta nuevamente más tarde.",
            });
            setIsSubmitting(false);
        });
    };

    return (
        <>
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
        
            <section className="py-24 px-4 relative bg-secondary/30">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                        ¡Pongase en Contacto con Nosotros!
                    </h2>

                    <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                        ¿Tiene algúna idea en mente o quiere colaborar con nosotros? No dudes en ponerte
                        en contacto. Siempre estamos dispuestos a hablar de nuevas
                        oportunidades.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <h3 className="text-2xl font-semibold mb-6">Información de Contacto</h3>

                            <div className="space-y-6 justify-center">

                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-full bg-primary/10">
                                        <Phone className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Teléfono</h4>
                                        <a
                                            href="https://api.whatsapp.com/send?phone=2257635213"
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                            target="_blank"
                                        >
                                            +54 (2257) 635213
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-full bg-primary/10">
                                        <MapPin className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Ubicación</h4>
                                        <p className="text-muted-foreground flex items-center gap-2">
                                            Buenos Aires, Argentina
                                            <img
                                                src="https://flagcdn.com/w40/ar.png"
                                                alt="Bandera de Argentina"
                                                className="inline w-5 h-5 rounded-sm"
                                            />
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-full bg-primary/10">
                                        <Mail className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Email (CEOs)</h4>
                                        <div className="flex flex-col space-y-2">
                                            <a
                                                href="mailto:tobiasalfonso2301@gmail.com"
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                tobiasalfonso2301@gmail.com
                                            </a>
                                            <a
                                                href="mailto:domingogaby8@gmail.com"
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                domingogaby8@gmail.com
                                            </a>
                                            <a
                                                href="mailto:chuconeitor123@gmail.com"
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                chuconeitor123@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <h4 className="font-medium mb-4">Conecta con Nosotros</h4>
                                <div className="flex space-x-6 justify-center">
                                    <a href="https://www.linkedin.com/in/tobias-alfonso-37a51926b/" target="_blank">
                                        <Linkedin /> Tobias Alfonso
                                    </a>
                                    <a href="https://www.linkedin.com/in/gabydomingo" target="_blank">
                                        <Linkedin /> Gabriel Domingo
                                    </a>
                                    <a href="https://www.linkedin.com/in/gabydomingo" target="_blank">
                                        <Linkedin /> Lautaro Papaianni
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-lg shadow-xs">
                            <h3 className="text-2xl font-semibold mb-6">Envia un mensaje</h3>

                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Tu nombre
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                        placeholder="Tobias Alfonso..."
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Tu correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                        placeholder="ejemplo@ejemplo.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2 ">
                                        Tu mensaje
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                                        placeholder="Hola me gustaria contactarme con ustedes para..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center justify-center gap-2 bg-white hover:bg-blue-200 text-black font-semibold rounded-xl text-center p-3"
                                    
                                >
                                    {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
}

import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram, Twitter, PhoneIcon, Users } from "lucide-react";
import logo_movile from "@/imagenes/logo-pcZone.png";

export default function Footer() {
    return (
        <footer className="bg-[#0B1C3A] text-white px-6 py-2">
            <div className="flex items-center justify-around w-full flex-wrap gap-6">
                {/* FOOTER: logo */}
                <div className="flex justify-start my-4">
                    <Link href="/">
                        <Image src={logo_movile} alt="logo PCZone footer" width={120} height={120} className="rounded-2x1" />
                    </Link>
                </div>

                {/* FOOTER: Botones centrales */}
                <div className="flex flex-row gap-10 justify-center my-4">
                    <Link href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} className="font-bold">
                        Boton Sorpresa
                    </Link>
                    <Link href={"/faq"} className="font-bold">
                        Preguntas Frecuentes
                    </Link>
                </div>

                {/* FOOTER: Redes sociales */}
                <div className="grid grid-cols-2 gap-4 my-4">
                    <Link href="https://www.instagram.com/pczoneoficial/">
                        <Instagram />
                    </Link>
                    <Link href="https://x.com/PCZoneOficial">
                        <Twitter />
                    </Link>
                    <Link href="https://api.whatsapp.com/send?phone=2257635213">
                        <PhoneIcon />
                    </Link>
                    <Link href="https://www.linkedin.com/in/tobias-alfonso-37a51926b/">
                        <Linkedin />
                    </Link>
                </div>

                {/* FOOTER: Portfolios */}
                <div className="flex flex-col items-center gap-2 my-4">
                    <Users className="text-white" size={24} />
                    <div className="flex flex-col items-center text-sm">
                        <Link href="https://porfolio-neon-kappa.vercel.app/" target="_blank" className="hover:underline">
                            Portfolio de gabriel
                        </Link>
                        <Link href="https://portfolio-rose-six-76.vercel.app/" target="_blank" className="hover:underline">
                            Portfolio de tobias
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
// components/Placa3D.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import PlacaModel from "@/components/PlacaModel";

type Part = {
  objects: string[];
  titulo: string;
  descripcion: string;
  imagen?: string;
};

const partes: Part[] = [
  {
    objects: ["Object_35", "Object_34_1", "Object_63", "Object_62_1"],
    titulo: "Socket del CPU",
    descripcion:
      "Levanta la palanca, alinea la marca dorada del procesador con la muesca del socket y baja la palanca para fijar.",
    imagen: "/models/guias/socket_cpu.png",
  },
  {
    objects: ["Object_159_1"],
    titulo: "Enganche del Cooler",
    descripcion:
      "Puntos de fijación del disipador; asegurate de anclar el cooler con los clips incluidos.",
    imagen: "/models/guias/enganche_cooler.png",
  },
  {
    objects: ["Object_33_1"],
    titulo: "Slot de RAM",
    descripcion:
      "Inserta el módulo en 45° y presiona hasta oír el clic de los seguros laterales.",
    imagen: "/models/guias/slot_ram.png",
  },
  {
    objects: ["Object_28"],
    titulo: "Conector 24 pines para fuente",
    descripcion:
      "Conecta aquí el cable principal de alimentación ATX de la fuente.",
    imagen: "/models/guias/24pines_fuente.png",
  },
  {
    objects: ["Object_135_1"],
    titulo: "Conector de alimentación para el CPU",
    descripcion:
      "Enchufa el cable EPS de 4 u 8 pines que alimenta el CPU y el disipador.",
    imagen: "/models/guias/eps_cpu.png",
  },
  {
    objects: ["Object_39_1"],
    titulo: "Slot de Tarjeta Gráfica",
    descripcion:
      "Inserta la GPU en el PCIe x16 hasta que los seguros laterales encajen.",
    imagen: "/models/guias/slot_gpu.png",
  },
  {
    objects: ["Object_131_1"],
    titulo: "Pila de BIOS",
    descripcion:
      "Batería CR2032 que mantiene la configuración de la BIOS cuando la placa está apagada.",
    imagen: "/models/guias/pila_bios.png",
  },
  {
    objects: ["Object_49_1", "object_47_1", "Object_44_1"],
    titulo: "Slot M.2",
    descripcion:
      "Conector para SSD NVMe; asegúrate de usar el tornillo corto para fijar el módulo.",
    imagen: "/models/guias/slot_m2.png",
  },
  {
    objects: ["Object_41"],
    titulo: "Slot de 2da Gráfica",
    descripcion:
      "Segundo puerto PCIe x16 para configuraciones multi-GPU.",
    imagen: "/models/guias/slot_2da_gpu.png",
  },
  {
    objects: ["Object_130"],
    titulo: "Conector SATA",
    descripcion:
      "Usa estos puertos para discos duros y SSD SATA con cables SATA.",
    imagen: "/models/guias/sata.png",
  },
  {
    objects: ["Object_53", "object_52_1", "Object_55_1", "Object_54_1"],
    titulo: "Conector del Panel Frontal",
    descripcion:
      "Pines para conectar power switch, reset switch, LEDs y buzzer del chasis.",
    imagen: "/models/guias/panel_frontal.png",
  },
  {
    objects: ["Object_137"],
    titulo: "Conector de corriente de los coolers",
    descripcion:
      "Header(s) de 3 o 4 pines para ventiladores de chasis y CPU.",
    imagen: "/models/guias/conector_coolers.png",
  },
  {
    objects: ["Object_139_1", "Object_141_1"],
    titulo: "USB 2.0",
    descripcion:
      "Header interno para puertos USB 2.0 del panel frontal o lectores de tarjetas.",
    imagen: "/models/guias/usb2.png",
  },
  {
    objects: ["Object_138_1"],
    titulo: "USB-C",
    descripcion:
      "Header para puertos USB-C del frontal del gabinete.",
    imagen: "/models/guias/usb_c.png",
  },
  {
    objects: ["Object_148_1"],
    titulo: "USB 3.0",
    descripcion:
      "Header para puertos USB 3.0 (USB 3.1 Gen1) del panel frontal.",
    imagen: "/models/guias/usb3.png",
  },
  {
    objects: ["Object_144_1"],
    titulo: "Conector Ethernet",
    descripcion: "Puerto RJ-45 para conexión de red cableada.",
    imagen: "/models/guias/ethernet.png",
  },
  {
    objects: ["Object_143"],
    titulo: "HDMI / DisplayPort",
    descripcion:
      "Salida de video HDMI y DisplayPort integradas al chipset de la placa.",
    imagen: "/models/guias/hdmi.png",
  },
  {
    objects: ["Object_146"],
    titulo: "Antena WiFi",
    descripcion: "Conexiones RP-SMA para antenas inalámbricas.",
    imagen: "/models/guias/antena_wifi.png",
  },
  {
    objects: ["Object_154_1"],
    titulo: "Conector Multimedia",
    descripcion: "Pines para audio HD frontal o trasero del chasis.",
    imagen: "/models/guias/multimedia.png",
  },
];

export default function Placa3D() {
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  function handleSeleccion(nombre: string) {
    const part = partes.find((p) => p.objects.includes(nombre)) || null;
    setSelectedPart(part);
  }

  return (
    <div className="relative w-full h-[700px]">
      <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Suspense fallback={null}>
          <PlacaModel onSeleccion={handleSeleccion} />
        </Suspense>

        <OrbitControls
          enableZoom
          enablePan
          enableRotate
          target={[0, 0, 0]}
        />
      </Canvas>

      {selectedPart && (
        <div className="absolute top-16 left-16 bg-white p-4 rounded shadow-md max-w-sm z-20 text-black">
          <h2 className="text-xl font-bold mb-2">
            {selectedPart.titulo}
          </h2>
          {selectedPart.imagen && (
            <img
              src={selectedPart.imagen}
              alt={selectedPart.titulo}
              className="mb-2 w-full h-auto"
            />
          )}
          <p className="text-sm mb-2">{selectedPart.descripcion}</p>
          <button
            onClick={() => setSelectedPart(null)}
            className="mt-2 text-red-600 hover:underline"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}

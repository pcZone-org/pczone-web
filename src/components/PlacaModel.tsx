"use client";


import { ThreeEvent } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";


export type PlacaModelProps = {
  onSeleccion: (nombre: string) => void;
};


export default function PlacaModel({ onSeleccion }: PlacaModelProps) {
  const { scene } = useGLTF(
    "https://pcsupptnitvozhbhfxiu.supabase.co/storage/v1/object/public/placa-interactiva//moder.glb"
  );


  // posicion de la placa en la pantalla
  scene.position.set(-5, -15, -20);


  // posicion de la placa en el giroscopio
  scene.rotation.set(-Math.PI / 2, Math.PI, -10);


  // Escala uniforme
  scene.scale.set(2.5, 2.5, 2.5);


  return (
    <primitive
      object={scene}
      onPointerDown={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        const name = e.object.name || "sin-nombre";
        onSeleccion(name);
      }}
    />
  );
}


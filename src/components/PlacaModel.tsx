// components/PlacaModel.tsx
"use client";

import { ThreeEvent } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export type PlacaModelProps = {
  onSeleccion: (nombre: string) => void;
};

export default function PlacaModel({ onSeleccion }: PlacaModelProps) {
  const { scene } = useGLTF("https://pcsupptnitvozhbhfxiu.supabase.co/storage/v1/object/public/placa-interactiva//moder.glb");

  // Ajustes de posición, rotación y escala
  scene.position.set(0, -1.2, 0);
  // Girar sobre X para que la placa quede de frente al iniciar
  scene.rotation.set(-Math.PI / 2, 0, 0);
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

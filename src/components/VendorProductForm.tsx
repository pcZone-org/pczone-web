"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const COMPONENTS = [
  "coolers", "cpus", "fuentes", "gabinetes", "graficas",
  "memorias_externas", "memorias_internas", "mothers", "rams", "sounds",
] as const;

type ComponentType = typeof COMPONENTS[number];
type FieldDef = { name: string; label: string; type: "text" | "number" | "boolean" };

const FIELDS_MAP: Record<ComponentType, FieldDef[]> = {
  coolers: [
    { name: "marca", label: "Marca", type: "text" },
    { name: "modelo", label: "Modelo", type: "text" },
    { name: "rgb", label: "¿Tiene RGB?", type: "boolean" },
  ],
  cpus: [
    { name: "marca", label: "Marca", type: "text" },
    { name: "modelo", label: "Modelo", type: "text" },
    { name: "nucleos", label: "Núcleos", type: "number" },
    { name: "hilos", label: "Hilos", type: "number" },
  ],
  fuentes: [
    { name: "marca", label: "Marca", type: "text" },
    { name: "potencia", label: "Potencia (W)", type: "number" },
    { name: "certificacion", label: "Certificación", type: "text" },
  ],
  gabinetes: [
    { name: "marca", label: "Marca", type: "text" },
    { name: "formato", label: "Formato", type: "text" },
    { name: "rgb", label: "¿Tiene RGB?", type: "boolean" },
  ],
  graficas: [
    { name: "marca", label: "Marca", type: "text" },
    { name: "modelo", label: "Modelo", type: "text" },
    { name: "memoria", label: "Memoria (GB)", type: "number" },
  ],
  memorias_externas: [
    { name: "marca", label: "Marca", type: "text" },
    { name: "capacidad", label: "Capacidad (GB)", type: "number" },
    { name: "tipo", label: "Tipo", type: "text" },
  ],
  memorias_internas: [
    { name: "marca", label: "Marca", type: "text" },
    { name: "capacidad", label: "Capacidad (GB)", type: "number" },
    { name: "tipo", label: "Tipo", type: "text" },
  ],
  mothers: [
    { name: "marca", label: "Marca", type: "text" },
    { name: "socket", label: "Socket", type: "text" },
    { name: "factor_forma", label: "Factor de forma", type: "text" },
  ],
  rams: [
    { name: "marca", label: "Marca", type: "text" },
    { name: "capacidad", label: "Capacidad (GB)", type: "number" },
    { name: "tipo", label: "Tipo", type: "text" },
    { name: "rgb", label: "¿Tiene RGB?", type: "boolean" },
  ],
  sounds: [
    { name: "marca", label: "Marca", type: "text" },
    { name: "tipo", label: "Tipo", type: "text" },
    { name: "canales", label: "Canales", type: "number" },
  ],
} as const;

export default function VendorProductForm() {
  const router = useRouter();
  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const [tipoProducto, setTipoProducto] = useState<ComponentType | "">("");
  const [formData, setFormData] = useState<Record<string, any>>({ name: "", price: "" });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setError("");
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Debug: variables de entorno y cliente
    console.log("NEXT_PUBLIC_SUPABASE_URL =", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY =", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    console.log("supabase instance:", supabase);

    if (!tipoProducto) { setError("Debes elegir un tipo de componente"); return; }
    if (!role || !userId) { setError("No se detectó tu rol o sesión"); return; }
    if (!formData.name.trim()) { setError("El nombre es obligatorio"); return; }
    if (!file) { setError("Debes seleccionar una imagen"); return; }

    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `productos/${fileName}`;

    // Subida de imagen
    const { data: uploadData, error: uploadError } = await supabase
      .storage.from("imagenes")
      .upload(filePath, file, { upsert: false });

    console.log("uploadData:", uploadData);
    console.log("uploadError:", uploadError);

    if (uploadError || !uploadData) {
      setError("Error subiendo imagen: " + uploadError?.message);
      return;
    }

    // Obtener URL pública
    const { data: { publicUrl }, error: publicUrlError } = supabase
      .storage.from("imagenes")
      .getPublicUrl(uploadData.path);

    console.log("publicUrl:", publicUrl, "error:", publicUrlError);

    if (publicUrlError) { setError("No se pudo obtener la URL pública: " + publicUrlError.message); return; }

    // Armar payload
    const payload: Record<string, any> = {
      tipo_producto: tipoProducto,
      name: formData.name.trim(),
      price: formData.price !== "" ? Number(formData.price) : undefined,
      imagen_url: publicUrl,
    };
    FIELDS_MAP[tipoProducto].forEach(({ name, type }) => {
      const val = formData[name];
      if (type === 'boolean') payload[name] = !!val;
      else if (val !== undefined && val !== '') payload[name] = type === 'number' ? Number(val) : (val as string).trim();
    });
    if (role === 'usuario') payload.usuario_id = Number(userId);
    else payload.vendedor_id = Number(userId);

    try {
      const res = await fetch("/api/publicaciones-producto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al publicar");
      router.push(`/productos/${tipoProducto}/${data.producto.id}`);
    } catch (err: any) { setError(err.message); }
  };

  const dynamicFields = tipoProducto ? FIELDS_MAP[tipoProducto] : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded shadow text-black">
      {error && <p className="text-red-600">{error}</p>}

      {/* Selector de componente */}
      <div>
        <label className="block mb-1">Componente</label>
        <select
          value={tipoProducto}
          onChange={e => { setTipoProducto(e.target.value as ComponentType); setFormData({ name: "", price: "" }); setError(""); }}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Selecciona un componente --</option>
          {COMPONENTS.map(c => (
            <option key={c} value={c}>{c.replace(/_/g, ' ').toUpperCase()}</option>
          ))}
        </select>
      </div>

      {/* Campos comunes */}
      <div>
        <label className="block mb-1">Nombre</label>
        <input name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>
      <div>
        <label className="block mb-1">Precio</label>
        <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      {/* Input real de archivo */}
      <div>
        <label className="block mb-1">Imagen</label>
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" required />
      </div>

      {/* Campos dinámicos */}
      {dynamicFields.map(({ name, label, type }) => (
        <div key={name}>
          <label className="block mb-1">{label}</label>
          {type === 'boolean' ? (
            <input name={name} type="checkbox" checked={!!formData[name]} onChange={handleChange} />
          ) : (
            <input name={name} type={type} value={formData[name] ?? ''} onChange={handleChange} className="w-full p-2 border rounded" />
          )}
        </div>
      ))}

      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
        Publicar producto
      </button>
    </form>
  );
}

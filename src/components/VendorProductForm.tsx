"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// 1) Lista de tipos soportados
const COMPONENTS = [
  "coolers",
  "cpus",
  "fuentes",
  "gabinetes",
  "graficas",
  "memorias_externas",
  "memorias_internas",
  "mothers",
  "rams",
  "sounds",
] as const;

// 2) Mapeo de campos dinámicos por tipo
type ComponentType = typeof COMPONENTS[number];
type FieldDef = {
  name: string;
  label: string;
  type: "text" | "number" | "boolean";
};

const FIELDS_MAP: Record<ComponentType, FieldDef[]> = {
  coolers: [
    { name: "rpm", label: "RPM", type: "number" },
    { name: "noise", label: "Nivel de ruido (dB)", type: "number" },
    { name: "size", label: "Tamaño (mm)", type: "number" },
    { name: "color", label: "Color", type: "text" },
  ],
  cpus: [
    { name: "core_count", label: "Núcleos", type: "number" },
    { name: "core_clock", label: "Frecuencia base (GHz)", type: "number" },
    { name: "boost_clock", label: "Frecuencia boost (GHz)", type: "number" },
    { name: "tdp", label: "TDP (W)", type: "number" },
    { name: "graphics", label: "Gráficos integrados", type: "text" },
    { name: "smt", label: "SMT (Hyperthreading)", type: "boolean" },
  ],
  fuentes: [
    { name: "type", label: "Tipo (ATX/...)", type: "text" },
    { name: "efficiency", label: "Eficiencia", type: "text" },
    { name: "wattage", label: "Wattaje (W)", type: "number" },
    { name: "modular", label: "Modularidad", type: "text" },
  ],
  gabinetes: [
    { name: "type", label: "Tipo (Torre/...)", type: "text" },
    { name: "psu", label: "Ubicación PSU", type: "text" },
    { name: "side_panel", label: "Panel lateral", type: "text" },
    { name: "external_volume", label: "Volumen externo (L)", type: "number" },
    { name: "internal_35_bays", label: "Bahías 3.5”", type: "number" },
  ],
  graficas: [
    { name: "chipset", label: "Chipset", type: "text" },
    { name: "memory", label: "Memoria (GB)", type: "number" },
    { name: "core_clock", label: "Core clock (MHz)", type: "number" },
    { name: "boost_clock", label: "Boost clock (MHz)", type: "number" },
    { name: "length", label: "Largo (mm)", type: "number" },
  ],
  memorias_externas: [
    { name: "type", label: "Tipo (USB/...)", type: "text" },
    { name: "interface", label: "Interfaz", type: "text" },
    { name: "capacity", label: "Capacidad (GB)", type: "number" },
    { name: "price_per_gb", label: "Precio/GB", type: "number" },
  ],
  memorias_internas: [
    { name: "capacity", label: "Capacidad (GB)", type: "number" },
    { name: "price_per_gb", label: "Precio/GB", type: "number" },
    { name: "cache", label: "Caché (MB)", type: "number" },
    { name: "form_factor", label: "Form factor", type: "text" },
    { name: "interface", label: "Interfaz", type: "text" },
  ],
  mothers: [
    { name: "socket", label: "Socket", type: "text" },
    { name: "form_factor", label: "Formato", type: "text" },
    { name: "max_memory", label: "Memoria máx. (GB)", type: "number" },
    { name: "memory_slots", label: "Slots RAM", type: "number" },
  ],
  rams: [
    { name: "speed_channels", label: "Canales", type: "number" },
    { name: "speed_mhz", label: "Frecuencia (MHz)", type: "number" },
    { name: "modules_qty", label: "Módulos", type: "number" },
    { name: "module_capacity", label: "Capacidad por módulo (GB)", type: "number" },
    { name: "first_word_latency", label: "1st Word Latency", type: "number" },
    { name: "cas_latency", label: "CAS Latency", type: "number" },
  ],
  sounds: [
    { name: "channels", label: "Canales", type: "text" },
    { name: "digital_audio", label: "Digital Audio (bits)", type: "number" },
    { name: "snr", label: "SNR (dB)", type: "number" },
    { name: "sample_rate", label: "Sample rate (kHz)", type: "number" },
    { name: "chipset", label: "Chipset", type: "text" },
    { name: "interface", label: "Interfaz", type: "text" },
  ],
};

export default function VendorProductForm() {
  const router = useRouter();
  const role   = typeof window !== "undefined" ? localStorage.getItem("role")   : null;
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const [tipoProducto, setTipoProducto] = useState<ComponentType | "">("");
  const [formData, setFormData] = useState<Record<string, any>>({
    name: "",
    price: "",
    imagen_url: "",
  });
  const [error, setError] = useState<string>("");

  // Limpia error al cambiar cualquier campo
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setError("");
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!tipoProducto) {
      setError("Debes elegir un tipo de componente");
      return;
    }
    if (!role || !userId) {
      setError("No se detectó tu rol o sesión");
      return;
    }
    if (!formData.name.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    // Armo payload
    const payload: Record<string, any> = {
      tipo_producto: tipoProducto,
      name: formData.name.trim(),
      price: formData.price !== "" ? Number(formData.price) : undefined,
      imagen_url: formData.imagen_url.trim() || undefined,
    };

    // Campos dinámicos
    FIELDS_MAP[tipoProducto].forEach(({ name, type }) => {
      const val = formData[name];
      if (type === "boolean") {
        payload[name] = !!val;
      } else if (val !== undefined && val !== "") {
        payload[name] = type === "number" ? Number(val) : val.trim();
      }
    });

    // Dueño
    if (role === "usuario") {
      payload.usuario_id = Number(userId);
    } else {
      payload.vendedor_id = Number(userId);
    }

    try {
      const res = await fetch("/api/publicaciones-producto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al publicar");
      router.push(`/productos/${tipoProducto}/${data.producto.id}`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const dynamicFields = tipoProducto ? FIELDS_MAP[tipoProducto] : [];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white rounded shadow text-black"
    >
      {error && <p className="text-red-600">{error}</p>}

      {/* Selector de componente */}
      <div>
        <label className="block mb-1">Componente</label>
        <select
          value={tipoProducto}
          onChange={(e) => {
            setTipoProducto(e.target.value as ComponentType);
            setFormData({ name: "", price: "", imagen_url: "" });
            setError("");
          }}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Selecciona un componente --</option>
          {COMPONENTS.map((c) => (
            <option key={c} value={c}>
              {c.replace(/_/g, " ").toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Campos comunes */}
      <div>
        <label className="block mb-1">Nombre</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Precio</label>
        <input
          name="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">URL imagen</label>
        <input
          name="imagen_url"
          type="text"
          value={formData.imagen_url}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Campos dinámicos */}
      {dynamicFields.map(({ name, label, type }) => (
        <div key={name}>
          <label className="block mb-1">{label}</label>
          {type === "boolean" ? (
            <input
              name={name}
              type="checkbox"
              checked={!!formData[name]}
              onChange={handleChange}
            />
          ) : (
            <input
              name={name}
              type={type}
              value={formData[name] ?? ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        Publicar producto
      </button>
    </form>
  );
}

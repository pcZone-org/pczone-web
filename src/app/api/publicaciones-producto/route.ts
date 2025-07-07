// src/app/api/publicaciones-producto/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Mapas de tablas y campos permitidos
const modeloMap: Record<string, any> = {
  coolers: prisma.coolers,
  cpus: prisma.cpus,
  fuentes: prisma.fuentes,
  gabinetes: prisma.gabinetes,
  graficas: prisma.graficas,
  memorias_externas: prisma.memorias_externas,
  memorias_internas: prisma.memorias_internas,
  mothers: prisma.mothers,
  rams: prisma.rams,
  sounds: prisma.sounds,
};

// Campos válidos por tipo de componente
const fieldsMap: Record<string, string[]> = {
  coolers: ["name","price","imagen_url","rpm","noise","size","color","tipo"],
  cpus: ["name","price","imagen_url","core_count","core_clock","boost_clock","tdp","graphics","smt","tipo"],
  fuentes: ["name","price","imagen_url","type","efficiency","wattage","modular","color","tipo"],
  gabinetes: ["name","price","imagen_url","type","psu","side_panel","external_volume","internal_35_bays","color","tipo"],
  graficas: ["name","price","imagen_url","chipset","memory","core_clock","boost_clock","color","length","tipo"],
  memorias_externas: ["name","price","imagen_url","type","interface","capacity","price_per_gb","color","tipo"],
  memorias_internas: ["name","price","imagen_url","capacity","price_per_gb","type","cache","form_factor","interface","tipo"],
  mothers: ["name","price","imagen_url","socket","form_factor","max_memory","memory_slots","color","tipo"],
  rams: ["name","price","imagen_url","speed_channels","speed_mhz","modules_qty","module_capacity","first_word_latency","cas_latency","color","tipo"],
  sounds: ["name","price","imagen_url","channels","digital_audio","snr","sample_rate","chipset","interface","tipo"],
};

// Clave foránea por tipo
const fkMap: Record<string, string> = {
  coolers: "cooler_id",
  cpus: "cpu_id",
  fuentes: "fuente_id",
  gabinetes: "gabinete_id",
  graficas: "grafica_id",
  memorias_externas: "memoria_externa_id",
  memorias_internas: "memoria_interna_id",
  mothers: "mother_id",
  rams: "ram_id",
  sounds: "sound_id",
};

// ——————————————————— POST ————————————————————
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tipo_producto, usuario_id, vendedor_id, ...rest } = body;

    // Validaciones básicas
    if (!tipo_producto || !(tipo_producto in modeloMap)) {
      return NextResponse.json(
        { ok: false, error: "Tipo de producto inválido" },
        { status: 400 }
      );
    }
    const tieneUsuario = usuario_id != null;
    const tieneVendedor = vendedor_id != null;
    if (tieneUsuario === tieneVendedor) {
      return NextResponse.json(
        { ok: false, error: "Debes enviar usuario_id o vendedor_id, no ambos" },
        { status: 400 }
      );
    }
    if (tieneUsuario && typeof usuario_id !== "number") {
      return NextResponse.json(
        { ok: false, error: "usuario_id debe ser un número" },
        { status: 400 }
      );
    }
    if (tieneVendedor && typeof vendedor_id !== "number") {
      return NextResponse.json(
        { ok: false, error: "vendedor_id debe ser un número" },
        { status: 400 }
      );
    }

    // Construir datos solo con campos permitidos
    const allowedFields = fieldsMap[tipo_producto];
    const dataProducto: Record<string, any> = {};
    for (const key of allowedFields) {
      const val = (rest as any)[key];
      if (val !== undefined && val !== "") {
        // Convertir precio y campos numéricos
        if (["price","rpm","noise","size","core_count","core_clock","boost_clock","tdp","memory","length","capacity","price_per_gb","external_volume","internal_35_bays","speed_channels","speed_mhz","modules_qty","module_capacity","first_word_latency","cas_latency","digital_audio","snr","sample_rate"].includes(key)) {
          dataProducto[key] = Number(val);
        } else {
          dataProducto[key] = val;
        }
      }
    }

    // Crear componente
    const creado = await (modeloMap as any)[tipo_producto].create({ data: dataProducto });

    // Crear publicación (sin producto_id)
    const productoIdField = fkMap[tipo_producto];
    const tipo_duenio = usuario_id ? "usuario" : "vendedor";
    const publicacionData = {
      tipo_producto,
      tipo_duenio,
      usuario_id: usuario_id ?? null,
      vendedor_id: vendedor_id ?? null,
      [productoIdField]: creado.id,
    };
    const publicacion = await prisma.publicacionProducto.create({ data: publicacionData });

    return NextResponse.json(
      { ok: true, producto: creado, publicacion },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error en POST /api/publicaciones-producto:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Error interno" },
      { status: 500 }
    );
  }
}

// ——————————————————— GET ————————————————————
export async function GET() {
  const publicaciones = await prisma.publicacionProducto.findMany({
    include: {
      usuario: { select: { id_user: true, nombre: true, apellido: true } },
      vendedor: { select: { id_vendedor: true, nombre: true, apellido: true } },
    },
    orderBy: { creado_en: "desc" },
  });

  const result = publicaciones.map((p) => {
    const duenio = p.usuario ?? p.vendedor ?? null;
    const duenioTipo = p.usuario ? "usuario" : p.vendedor ? "vendedor" : null;
    const productoIdField = Object.keys(p).find(
      (key) => key.endsWith("_id") && !["id","usuario_id","vendedor_id"].includes(key)
    );
    return {
      id: p.id,
      tipo_producto: p.tipo_producto,
      producto_id: productoIdField ? (p as any)[productoIdField] : null,
      creado_en: p.creado_en,
      duenio,
      duenioTipo,
    };
  });

  return NextResponse.json({ ok: true, publicaciones: result });
}

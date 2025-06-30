// src/app/api/publicaciones-producto/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

// ——————————————————— POST ————————————————————
export async function POST(request: Request) {
  const body = await request.json();
  const { tipo_producto, usuario_id, vendedor_id, ...rest } = body;

  // 1) Validaciones básicas
  if (!tipo_producto || !(tipo_producto in modeloMap)) {
    return NextResponse.json(
      { error: "Tipo de producto inválido" },
      { status: 400 }
    );
  }
  const tieneUsuario = usuario_id != null;
  const tieneVendedor = vendedor_id != null;
  if (tieneUsuario === tieneVendedor) {
    return NextResponse.json(
      { error: "Debes enviar exactamente uno de usuario_id o vendedor_id" },
      { status: 400 }
    );
  }
  if (tieneUsuario && typeof usuario_id !== "number") {
    return NextResponse.json(
      { error: "usuario_id debe ser un número" },
      { status: 400 }
    );
  }
  if (tieneVendedor && typeof vendedor_id !== "number") {
    return NextResponse.json(
      { error: "vendedor_id debe ser un número" },
      { status: 400 }
    );
  }

  // 2) Crear en la tabla específica de componentes
  const dataProducto = Object.fromEntries(
    Object.entries(rest)
      .filter(([, v]) => v !== undefined && v !== "")
      .map(([k, v]) => [k, k === "price" ? Number(v) : v])
  );
  const creado = await (modeloMap as any)[tipo_producto].create({
    data: dataProducto,
  });

  // 3) Crear la publicación
  // Determinar el nombre correcto del campo de producto según el tipo
  const productoIdField = (() => {
    switch (tipo_producto) {
      case "coolers": return "cooler_id";
      case "cpus": return "cpu_id";
      case "fuentes": return "fuente_id";
      case "gabinetes": return "gabinete_id";
      case "graficas": return "grafica_id";
      case "memorias_externas": return "memoria_externa_id";
      case "memorias_internas": return "memoria_interna_id";
      case "mothers": return "mother_id";
      case "rams": return "ram_id";
      case "sounds": return "sound_id";
      default:
        throw new Error("Tipo de producto inválido");
    }
  })();

  // Construyo dinámicamente el objeto de datos para Prisma
  const publicacionData: Record<string, unknown> = {
    tipo_producto,
    usuario_id: usuario_id ?? null,
    vendedor_id: vendedor_id ?? null,
  };
  // asigno el FK específico
  publicacionData[productoIdField] = creado.id;

  const publicacion = await prisma.publicacionProducto.create({
    // casteo a any para que Prisma acepte la clave dinámica
    data: publicacionData as any,
  });

  return NextResponse.json(
    { ok: true, producto: creado, publicacion },
    { status: 201 }
  );
}

// ——————————————————— GET ————————————————————
export async function GET() {
  const publicaciones = await prisma.publicacionProducto.findMany({
    include: {
      usuario:  { select: { id_user: true, nombre: true, apellido: true } },
      vendedor: { select: { id_vendedor: true, nombre: true, apellido: true } },
    },
    orderBy: { creado_en: "desc" },
  });

  const result = publicaciones.map((p) => {
    const duenio = p.usuario ?? p.vendedor ?? null;
    const duenioTipo = p.usuario ? "usuario" : p.vendedor ? "vendedor" : null;
    // Busco el campo *_id que no sea usuario_id ni vendedor_id
    const productoIdField = Object.keys(p).find(
      (key) =>
        key.endsWith("_id") &&
        key !== "id" &&
        key !== "usuario_id" &&
        key !== "vendedor_id"
    );
    return {
      id:            p.id,
      tipo_producto: p.tipo_producto,
      producto_id:   productoIdField ? (p as any)[productoIdField] : null,
      creado_en:     p.creado_en,
      duenio,
      duenioTipo,
    };
  });

  return NextResponse.json({ ok: true, publicaciones: result });
}

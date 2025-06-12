import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const nuevoVendedor = await prisma.vendedores.create({
  data: {
    nombre_comercio: body.nombre_comercio?.trim() || null,
    nombre: body.nombre.trim(),
    apellido: body.apellido.trim(),
    mail: body.mail.trim(),
    contrasenia: body.contrasenia.trim(),
    cuil: Number(body.cuil), 
    direccion: body.direccion.trim(),
    descripcion: body.descripcion?.trim() || null,
    fecha_nacimiento: new Date(body.fecha_nacimiento),
  },
});


    return NextResponse.json({ ok: true, vendedor: nuevoVendedor });
  } catch (error) {
    console.error("Error al registrar comercio:", error);
    return NextResponse.json(
      { ok: false, error: "Registro de comercio fallido" },
      { status: 500 }
    );
  }
}

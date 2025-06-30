// src/app/api/login/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { email, contrasenia } = await request.json();

  // 1) Limpiar
  const cleanedEmail = (email ?? "").trim();
  const cleanedPassword = (contrasenia ?? "").trim();

  try {
    // 2) Buscamos en usuarios
    const usuario = await prisma.ususarios.findFirst({
      where: { mail: cleanedEmail },
    });

    if (usuario && usuario.contrasenia.trim() === cleanedPassword) {
      return NextResponse.json(
        {
          ok: true,
          tipo: "usuario",
          userId: usuario.id_user,
          userName: usuario.nombre,
        },
        { status: 200 }
      );
    }

    // 3) Buscamos en vendedores
    const vendedor = await prisma.vendedores.findFirst({
      where: { mail: cleanedEmail },
    });

    if (vendedor && vendedor.contrasenia.trim() === cleanedPassword) {
      return NextResponse.json(
        {
          ok: true,
          tipo: "vendedor",
          userId: vendedor.id_vendedor,
          userName: vendedor.nombre,
        },
        { status: 200 }
      );
    }

    // 4) No existe
    return NextResponse.json(
      { ok: false, error: "Credenciales incorrectas" },
      { status: 401 }
    );
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}

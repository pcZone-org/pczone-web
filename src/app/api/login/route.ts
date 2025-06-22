// src/app/api/login/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { email, contrasenia } = await request.json();

  // 1) Limpiar espacios extra
  const cleanedEmail = (email ?? "").trim();
  const cleanedPassword = (contrasenia ?? "").trim();

  try {
    // 2) Intentar encontrar en tabla usuarios
    const usuario = await prisma.ususarios.findFirst({
      where: { mail: cleanedEmail }
    });

    if (usuario && usuario.contrasenia.trim() === cleanedPassword) {
      // OK → usuario normal
      return NextResponse.json(
        { ok: true, user: { id: usuario.id_user, nombre: usuario.nombre }, tipo: "usuario" },
        { status: 200 }
      );
    }

    // 3) Intentar encontrar en tabla vendedores
    const vendedor = await prisma.vendedores.findFirst({
      where: { mail: cleanedEmail }
    });

    if (vendedor && vendedor.contrasenia.trim() === cleanedPassword) {
      // OK → vendedor
      return NextResponse.json(
        { ok: true, user: { id: vendedor.id_vendedor, nombre: vendedor.nombre }, tipo: "vendedor" },
        { status: 200 }
      );
    }

    // 4) No encontrado en ninguna → credenciales incorrectas
    return NextResponse.json(
      { ok: false, error: "Credenciales incorrectas" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}

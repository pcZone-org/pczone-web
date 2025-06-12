import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { email, contrasenia } = await request.json();

  // Limpiar espacios extra
  const cleanedEmail = email.trim();
  const cleanedPassword = contrasenia.trim();

  try {
    // Buscar en usuarios
    const usuario = await prisma.ususarios.findFirst({
      where: { mail: cleanedEmail }
    });

    if (usuario && usuario.contrasenia.trim() === cleanedPassword) {
      // Podrías guardar en sessionStorage o similar el tipo si querés
      return NextResponse.json({ ok: true, user: usuario, tipo: "usuario" });
    }

    // Buscar en vendedores
    const vendedor = await prisma.vendedores.findFirst({
      where: { mail: cleanedEmail }
    });

    if (vendedor && vendedor.contrasenia.trim() === cleanedPassword) {
      return NextResponse.json({ ok: true, user: vendedor, tipo: "vendedor" });
    }

  
    // Si no encontró en ninguna tabla
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

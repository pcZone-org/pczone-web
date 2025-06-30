// src/app/api/login/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { email, contrasenia } = await request.json();

  // 1) Limpiar y normalizar
  const cleanedEmail = (email ?? "").trim().toLowerCase();
  const cleanedPassword = (contrasenia ?? "").trim();

  try {
    // 2) Intentamos autenticar como usuario
    const usuario = await prisma.ususarios.findFirst({
      where: { mail: cleanedEmail },
    });

    if (usuario) {
      const isUserMatch = await bcrypt.compare(
        cleanedPassword,
        usuario.contrasenia
      );
      if (isUserMatch) {
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
    }

    // 3) Si no fue usuario o falló la contraseña, intentamos vendedor
    const vendedor = await prisma.vendedores.findFirst({
      where: { mail: cleanedEmail },
    });

    if (vendedor) {
      const isVendorMatch = await bcrypt.compare(
        cleanedPassword,
        vendedor.contrasenia
      );
      if (isVendorMatch) {
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
    }

    // 4) Ninguno coincidió
    return NextResponse.json(
      { ok: false, error: "Email o contraseña incorrectos" },
      { status: 401 }
    );
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno de autenticación" },
      { status: 500 }
    );
  }
}

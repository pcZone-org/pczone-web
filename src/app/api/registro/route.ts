// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function POST(request: Request) {
  try {
    const { nombre, apellido, email, contrasenia, fecha_nacimiento } = await request.json();

    // 1) Validación básica
    if (
      typeof nombre !== "string" ||
      typeof apellido !== "string" ||
      typeof email !== "string" ||
      typeof contrasenia !== "string" ||
      typeof fecha_nacimiento !== "string" ||
      !nombre.trim() ||
      !apellido.trim() ||
      !email.trim() ||
      !contrasenia.trim() ||
      !fecha_nacimiento.trim()
    ) {
      return NextResponse.json(
        { ok: false, error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // 2) Limpieza y normalización
    const cleanedEmail = email.trim().toLowerCase();
    const cleanedNombre = nombre.trim();
    const cleanedApellido = apellido.trim();
    const dob = new Date(fecha_nacimiento.trim());

    if (isNaN(dob.getTime())) {
      return NextResponse.json(
        { ok: false, error: "Fecha de nacimiento inválida" },
        { status: 400 }
      );
    }

    // 3) Hash de la contraseña
    const hashedPassword = await bcrypt.hash(contrasenia.trim(), SALT_ROUNDS);

    // 4) Creación en la base de datos
    const nuevoUsuario = await prisma.ususarios.create({
      data: {
        nombre: cleanedNombre,
        apellido: cleanedApellido,
        mail: cleanedEmail,
        contrasenia: hashedPassword,
        fecha_nacimiento: dob,
        permisos: false,
      },
      select: {
        id_user: true,
        nombre: true,
        apellido: true,
        mail: true,
        fecha_nacimiento: true,
        permisos: true,
        imagen_url: true,
        direccion: true,
      },
    });

    return NextResponse.json(
      { ok: true, usuario: nuevoUsuario },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error al registrar usuario:", error);

    // Manejo de unique constraint (correo duplicado)
    if (error.code === "P2002" && error.meta?.target?.includes("mail")) {
      return NextResponse.json(
        { ok: false, error: "Ya existe un usuario con ese email" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "Registro fallido" },
      { status: 500 }
    );
  }
}

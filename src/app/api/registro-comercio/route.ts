// src/app/api/register-vendedor/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function POST(request: Request) {
  try {
    const {
      nombre_comercio,
      nombre,
      apellido,
      email,
      contrasenia,
      fecha_nacimiento,
      cuil,
      direccion,
      descripcion,
    } = await request.json();

    // 1) Validación básica de obligatorios
    if (
      !nombre?.trim() ||
      !apellido?.trim() ||
      !email?.trim() ||
      !contrasenia?.trim() ||
      !fecha_nacimiento?.trim() ||
      !direccion?.trim()
    ) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // 2) Limpieza y normalización
    const cleanedNombreComercio = nombre_comercio?.trim() || null;
    const cleanedNombre = nombre.trim();
    const cleanedApellido = apellido.trim();
    const cleanedEmail = email.trim().toLowerCase();
    const cleanedDireccion = direccion.trim();
    const cleanedDescripcion = descripcion?.trim() || null;

    const dob = new Date(fecha_nacimiento.trim());
    if (isNaN(dob.getTime())) {
      return NextResponse.json(
        { ok: false, error: "Fecha de nacimiento inválida" },
        { status: 400 }
      );
    }

    // 3) Parseo y validación del CUIL (opcional)
    let parsedCuil: bigint | null = null;
    if (cuil != null && String(cuil).trim() !== "") {
      const cuilStr = String(cuil).trim();
      if (!/^\d+$/.test(cuilStr)) {
        return NextResponse.json(
          { ok: false, error: "CUIL debe ser un número válido" },
          { status: 400 }
        );
      }
      parsedCuil = BigInt(cuilStr);
    }

    // 4) Hash de la contraseña
    const hashedPassword = await bcrypt.hash(contrasenia.trim(), SALT_ROUNDS);

    // 5) Inserción en la base de datos
    const nuevoVendedor = await prisma.vendedores.create({
      data: {
        nombre_comercio: cleanedNombreComercio,
        nombre: cleanedNombre,
        apellido: cleanedApellido,
        mail: cleanedEmail,
        contrasenia: hashedPassword,
        fecha_nacimiento: dob,
        cuil: parsedCuil,
        direccion: cleanedDireccion,
        descripcion: cleanedDescripcion,
      },
      select: {
        id_vendedor: true,
        nombre_comercio: true,
        nombre: true,
        apellido: true,
        mail: true,
        fecha_nacimiento: true,
        cuil: true,
        direccion: true,
        descripcion: true,
      },
    });

    return NextResponse.json(
      { ok: true, vendedor: nuevoVendedor },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error al registrar vendedor:", error);

    // Manejo de unique constraint (email duplicado)
    if (error.code === "P2002" && error.meta?.target?.includes("mail")) {
      return NextResponse.json(
        { ok: false, error: "Ya existe un vendedor con ese email" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "Registro de comercio fallido" },
      { status: 500 }
    );
  }
}

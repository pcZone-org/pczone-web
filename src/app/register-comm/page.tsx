"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo_movile from "@/imagenes/logo-pcZone.png";

const RegistroComercio = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre_comercio: "",
    nombre: "",
    apellido: "",
    email: "",
    contrasenia: "",
    cuil: "",
    direccion: "",
    descripcion: "",
    fecha_nacimiento: "",
  });

  const [cuilError, setCuilError] = useState<string | null>(null);
  const [formGeneralError, setFormGeneralError] = useState<string | null>(null);

  // Modal animado
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormGeneralError(null);
  };

  // Solo para CUIL
  const handleCuilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    setFormData({ ...formData, cuil: value });

    if (value.length === 0) {
      setCuilError(null);
    } else if (value.length !== 11) {
      setCuilError("El CUIL/CUIT debe tener exactamente 11 números (sin guiones).");
    } else {
      setCuilError(null);
    }
    setFormGeneralError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar CUIL antes que nada
    if (formData.cuil.length !== 11) {
      setCuilError("El CUIL/CUIT debe tener exactamente 11 números (sin guiones).");
      setFormGeneralError(null);
      return;
    }

    // Validación de campos obligatorios
    for (const key of ["nombre_comercio", "nombre", "apellido", "email", "contrasenia", "cuil", "direccion"]) {
      if (!formData[key as keyof typeof formData].trim()) {
        setFormGeneralError("Por favor complete todos los campos obligatorios.");
        return;
      }
    }

    setFormGeneralError(null);

    const res = await fetch("/api/registro-comercio", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setShowModal(true);
      setFormData({
        nombre_comercio: "",
        nombre: "",
        apellido: "",
        email: "",
        contrasenia: "",
        cuil: "",
        direccion: "",
        descripcion: "",
        fecha_nacimiento: "",
      });
    } else {
      const data = await res.json();
      setFormGeneralError(data?.error || "No se pudo registrar el comercio");
    }
  };

  // Al cerrar el modal, redirige al login
  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/login"); // Cambia a "/" si querés ir al home
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#0c2e63] to-[#0b1c3b] text-black">
      {/* Modal animado */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 transition-all animate-fadeIn">
          <div className="bg-white p-8 rounded-2xl shadow-xl animate-fadeIn flex flex-col items-center">
            {/* Icono de check animado */}
            <svg width="70" height="70" fill="none" className="mb-4 animate-bounce">
              <circle cx="35" cy="35" r="35" fill="#4f8ef7" />
              <path d="M22 38l10 10 18-18" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h2 className="text-2xl font-bold text-center mb-2 text-[#0c2e63]">¡Comercio registrado con éxito!</h2>
            <p className="text-center mb-5 text-gray-700">Ahora podés iniciar sesión para acceder a PCZone.</p>
            <button
              className="mt-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
              onClick={handleCloseModal}
            >
              Ir al login
            </button>
          </div>
        </div>
      )}

      <div className="relative bg-white rounded-xl shadow-md p-10 w-full max-w-4xl mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src={logo_movile}
            alt="PCZone Logo"
            className="w-40 h-auto rounded-2xl"
          />
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4" onSubmit={handleSubmit} autoComplete="off">
          {/* Nombre del comercio */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">
              Nombre del comercio <span className="text-red-500">*</span>
            </label>
            <input
              name="nombre_comercio"
              type="text"
              value={formData.nombre_comercio}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              required
            />
          </div>
          {/* Nombre */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              required
            />
          </div>
          {/* Contraseña */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <input
              name="contrasenia"
              type="password"
              value={formData.contrasenia}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              required
            />
          </div>
          {/* Apellido */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Apellido <span className="text-red-500">*</span>
            </label>
            <input
              name="apellido"
              type="text"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              required
            />
          </div>
          {/* CUIL/CUIT */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              CUIL / CUIT <span className="text-red-500">*</span>
            </label>
            <input
              name="cuil"
              type="text"
              value={formData.cuil}
              onChange={handleCuilChange}
              placeholder="Ej: 20123456789 (sin guiones ni puntos)"
              className={`w-full px-4 py-2 border rounded-lg bg-gray-100 ${cuilError ? "border-red-500" : ""}`}
              required
              maxLength={11}
              pattern="\d{11}"
              inputMode="numeric"
              autoComplete="off"
            />
            <p className="text-xs text-gray-500">
              Ingresá solo los 11 números, <span className="text-red-500">sin guiones ni puntos</span>.
            </p>
            {cuilError && (
              <p className="text-xs text-red-500">{cuilError}</p>
            )}
          </div>
          {/* Correo electrónico */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Correo electrónico <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              required
            />
          </div>
          {/* fecha de nacimiento */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Fecha de nacimiento <span className="text-red-500">*</span>
            </label>
            <input
              name="fecha_nacimiento"
              type="date"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              required
            />
          </div>
          {/* Dirección del comercio */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Dirección del comercio <span className="text-red-500">*</span>
            </label>
            <input
              name="direccion"
              type="text"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              required
            />
          </div>
          {/* Descripción del comercio */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-1">
              Descripción del comercio
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              rows={4}
              placeholder="Breve descripción del comercio..."
            ></textarea>
          </div>
          {/* Botones y errores */}
          <div className="flex flex-col items-center md:flex-row justify-center mt-8 gap-3 md:col-span-2">
            <Link href="register-user" passHref>
              <button
                className="bg-blue-100 text-blue-600 px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-200"
                type="button"
              >
                Registrarse como comprador
              </button>
            </Link>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
            >
              Registrar comercio
            </button>
          </div>
          {/* Error general del form */}
          {formGeneralError && (
            <div className="md:col-span-2 flex justify-center">
              <p className="text-red-500 text-sm mt-2">{formGeneralError}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistroComercio;

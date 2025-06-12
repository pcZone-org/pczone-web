"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo_movile from "@/imagenes/logo-pcZone.png";

const RegistroForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasenia: "",
    fecha_nacimiento: "",
  });

  // Estado para mostrar el modal
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/registro", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setShowModal(true); // Mostrar modal animado
      setFormData({
        nombre: "",
        apellido: "",
        email: "",
        contrasenia: "",
        fecha_nacimiento: "",
      });
    } else {
      alert("Hubo un error al crear la cuenta.");
    }
  };

  // Al cerrar el modal, te redirige al login
  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/login");
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
            <h2 className="text-2xl font-bold text-center mb-2 text-[#0c2e63]">¡Cuenta creada con éxito!</h2>
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
        <div className="relative mb-6">
          <Image
            src={logo_movile}
            alt="PCZone Logo"
            className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 -translate-y-1/2 h-auto w-40 rounded-2xl"
          />
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
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

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Fecha de nacimiento
            </label>
            <input
              name="fecha_nacimiento"
              type="date"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

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
        </form>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
          >
            Crear cuenta
          </button>
          <Link
            href="register-comm"
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-2 rounded-lg transition"
          >
            Registrarse como comercio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistroForm;

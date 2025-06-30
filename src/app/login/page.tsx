"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import logo from "@/imagenes/logo-pcZone.png";
import banner2 from "@/imagenes/20210803041200.webp";
import "@/app/globals.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const cleanedEmail = email.trim();
    const cleanedPassword = contrasenia.trim();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanedEmail,
          contrasenia: cleanedPassword,
        }),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        // Guardamos rol, id y nombre
        localStorage.setItem("role", data.tipo);
        localStorage.setItem("userId", String(data.userId));
        localStorage.setItem("userName", data.userName);
        router.push("/");
      } else {
        setError(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error de red al iniciar sesión:", err);
      setError("Error de red, por favor inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:block w-[80%] relative h-screen overflow-hidden">
        <Image
          src={banner2}
          alt="Componentes"
          fill
          className="object-cover clip-diagonal"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 z-12 ">
        <Image
          src={logo}
          alt="PCZone Logo"
          className="w-60 mb-12 rounded-2xl shadow-lg"
        />
        <form
          className="w-full max-w-sm space-y-4"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => {
              setError("");
              setEmail(e.target.value);
            }}
            className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasenia}
            onChange={(e) => {
              setError("");
              setContrasenia(e.target.value);
            }}
            className="w-full p-3 rounded-md bg-white text-black placeholder-gray-500"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white font-semibold py-2 rounded-md transition`}
          >
            {loading ? "Entrando..." : "Iniciar sesión"}
          </button>
          <div className="text-center text-white">¿Aún no tienes cuenta?</div>
          <Link
            href="/register-user"
            className="w-full block text-center border border-white text-white py-2 rounded-md hover:bg-white hover:text-blue-800 transition"
          >
            Registrarse
          </Link>
        </form>
      </div>
    </div>
  );
}

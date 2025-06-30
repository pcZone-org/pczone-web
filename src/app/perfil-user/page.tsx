// src/app/perfil-user/page.tsx  (o donde tengas tu ruta)
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserProductForm from "@/components/VendorProductForm";

export default function PerfilUserPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedName = localStorage.getItem("userName");

    if (!storedRole) {
      router.push("/login");
      return;
    }

    setRole(storedRole);
    setUserName(storedName ?? "");
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  return (
    <main className="p-8 min-h-screen max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          ¡Hola, {userName || "Usuario"}!
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Cerrar sesión
        </button>
      </div>

      {role === "usuario" ? (
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Publicar nuevo producto
          </h2>
          {/* Aquí incluimos el formulario de carga para usuarios */}
          <UserProductForm />
        </section>
      ) : (
        <p className="text-red-600">
          No tienes permisos para acceder a esta página.
        </p>
      )}
    </main>
  );
}

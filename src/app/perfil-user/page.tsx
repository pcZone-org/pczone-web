"use client";
import { useRouter } from "next/navigation";

export default function PerfilUserPage() {
  const router = useRouter();
  const userName = typeof window !== "undefined" ? localStorage.getItem("userName") : "";

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    router.push("/login");
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">¡Hola, {userName || "Usuario"}!</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        Cerrar sesión
      </button>
    </main>
  );
}

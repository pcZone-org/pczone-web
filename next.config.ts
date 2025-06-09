import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pcsupptnitvozhbhfxiu.supabase.co',
        port: '',
        // asegúrate de ajustar el patrón a tus rutas
        pathname: '/storage/v1/object/public/placa-interactiva/**',
      },
    ],
  },
};

module.exports = nextConfig;
export default nextConfig;

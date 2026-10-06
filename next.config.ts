import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: let any host load the dev server's /_next assets and HMR socket
  // (LAN IPs, phones on the same Wi-Fi, tunnels). Next rejects a bare "*" or "**",
  // so "**.*" is the widest pattern it accepts: any hostname with two or more
  // labels, which covers every IP address and domain. Has no effect in production.
  allowedDevOrigins: ["**.*", "192.168.1.35"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 85],
  },
};

export default nextConfig;

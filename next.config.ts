import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/studio", permanent: true },
      { source: "/our-services", destination: "/services", permanent: true },
      { source: "/blog", destination: "/journal", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-of-service", destination: "/terms", permanent: true },
      {
        source: "/2025/10/03/maximize-your-living-smart-space-saving-designs-for-modern-homes-by-koncept-werk",
        destination: "/journal/maximize-your-living",
        permanent: true
      },
      {
        source: "/2025/10/03/beyond-aesthetics-designing-high-performance-commercial-interiors-with-koncept-werk",
        destination: "/journal/beyond-aesthetics",
        permanent: true
      },
      {
        source: "/2025/10/03/from-concept-to-masterpiece-the-koncept-werk-journey-to-your-dream-space",
        destination: "/journal/from-concept-to-masterpiece",
        permanent: true
      }
    ];
  }
};

export default nextConfig;

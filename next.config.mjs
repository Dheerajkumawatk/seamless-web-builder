/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  output: "standalone",
  agentRules: false,
  outputFileTracingIncludes: {
    "/api/admin/data": ["./src/assets/fonts/**/*", "./src/assets/vikas-mitra-id-card.png"],
  },
  serverExternalPackages: ["sequelize", "mysql2", "sharp"],
};

export default nextConfig;

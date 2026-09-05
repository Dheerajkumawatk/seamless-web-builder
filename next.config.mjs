/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  output: "standalone",
  agentRules: false,
  serverExternalPackages: ["sequelize", "mysql2"],
};

export default nextConfig;

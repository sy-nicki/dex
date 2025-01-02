import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    ignoreDuringBuilds: false, // Next.js 在构建时会运行 ESLint 检查
    reactStrictMode: true,     // 启用了 React 的严格模式
    swcMinify: true,           // SWC 是一个用 Rust 编写的快速的下一代 JavaScript/TypeScript 编译器。相比传统的 Terser 压缩器，SWC 通常能提供更快的构建速度。
    images: {
        domains: ['cdn.moralis.io'],  // 添加允许的域名
    },
};

export default nextConfig;

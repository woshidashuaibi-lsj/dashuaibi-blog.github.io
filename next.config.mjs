/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // 启用静态导出
    basePath: '', // 如果部署到子路径
    assetPrefix: process.env.NODE_ENV === 'production' ? 'https://woshidashuaibi-lsj.github.io' : '', // 生产环境使用完整URL
    images: {
        unoptimized: true, // 静态导出时禁用图片优化
    },
    // 确保所有资源都使用正确的路径
    trailingSlash: true,
};

export default nextConfig;

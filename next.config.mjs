/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // 启用静态导出
    basePath: '', // 如果部署到子路径
    assetPrefix: '/', // 静态资源路径
    images: {
        unoptimized: true, // 静态导出时禁用图片优化
    },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // 启用静态导出
    basePath: process.env.NODE_ENV === 'production' ? '/dashuaibi-blog.github.io' : '', // 根据环境设置基础路径
    assetPrefix: process.env.NODE_ENV === 'production' ? '/dashuaibi-blog.github.io' : '', // 根据环境设置资源路径
    images: {
        unoptimized: true, // 静态导出时禁用图片优化
    },
};

export default nextConfig;

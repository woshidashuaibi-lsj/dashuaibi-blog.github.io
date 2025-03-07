'use client'
import { usePathname } from 'next/navigation';
import Image from "next/image";

export default function AvatarImage() {
  const pathname = usePathname();
  // 判断是否在生产环境
  const isProd = process.env.NODE_ENV === 'production';
  // GitHub Pages 的基础路径
  const basePath = isProd ? '/dashuaibi-blog.github.io' : '';
  
  return (
    <Image
      className='avatar-image'
      src={`${basePath}/avatar.png`}
      alt="avatar"
      width={180}
      height={38}
      priority
    />
  );
}
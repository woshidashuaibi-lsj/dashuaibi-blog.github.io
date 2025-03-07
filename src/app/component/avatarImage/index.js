'use client'
import { usePathname } from 'next/navigation';
import Image from "next/image";

export default function AvatarImage() {
  const pathname = usePathname();
  
  return (
    <Image
      className='avatar-image'
      src={`${pathname === '/' ? '' : pathname}/avatar.png`}
      alt="avatar"
      width={180}
      height={38}
      priority
    />
  );
}
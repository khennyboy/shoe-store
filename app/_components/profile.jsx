"use client";

import Image from "next/image";
import avatar from "@/public/image-avatar.png";
import Link from "next/link";
import { useSession } from "../hooks/handleSession";

export default function Profile() {
  const { session } = useSession();
  
  const userImage = session?.session?.user?.user_metadata?.avatar_url || avatar;
  
  return (
    <Link href='/profile' className="flex-[0_0_2.8rem] cursor-pointer">
      <Image 
        src={userImage} 
        width={20} 
        height={20} 
        alt="user" 
        className="w-full rounded-[50%]" 
      />
    </Link>
  );
}

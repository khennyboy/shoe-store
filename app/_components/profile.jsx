"use client";

import Image from "next/image";
import avatar from "@/public/image-avatar.png";
import Link from "next/link";
import { useUser } from "../hooks/handleUser";

export default function Profile() {
  const { user } = useUser();
  const userImage = user?.user?.user_metadata?.avatar_url || avatar;
  return (
    <Link href='/profile' className="flex-[0_0_2.6rem] max-sm:flex-[0_0_2.2rem] cursor-pointer">
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

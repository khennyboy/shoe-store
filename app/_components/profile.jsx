"use client";

import Image from "next/image";
import avatar from "@/public/image-avatar.png";
import Link from "next/link";

export default function Profile() {
  return (
    <Link href = '/profile' className="flex-[0_0_2.8rem] cursor-pointer">
      <Image src={avatar} alt="user" className="w-full rounded-[50%]" />
    </Link>
  );
}

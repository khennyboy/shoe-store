import Link from "next/link";
import { IoCart } from "react-icons/io5";
export default function Cart() {
  return (
    <Link href='/cart' className="cursor-pointer">
      <IoCart className="size-7 fill-orange-500" />
    </Link>
  );
}

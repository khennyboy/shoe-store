import Image from "next/image";
import produt1 from "@/public/image-product-2.jpg";

export default function Detail1() {
  return (
    <div className="mx-auto mb-8 flex max-w-md flex-col gap-6 md:mb-0">
      <Image
        src={produt1}
        alt="product-image"
        className="h-[20rem] w-full cursor-zoom-in rounded-[12px] object-cover"
      />
      <div className="hidden gap-4 *:cursor-pointer md:flex">
        <div>
          <Image src={produt1} alt="product-image" className="rounded-lg" />
        </div>
        <div>
          <Image src={produt1} alt="product-image" className="rounded-lg" />
        </div>
        <div>
          <Image src={produt1} alt="product-image" className="rounded-lg" />
        </div>
        <div>
          <Image src={produt1} alt="product-image" className="rounded-lg" />
        </div>
      </div>
    </div>
  );
}

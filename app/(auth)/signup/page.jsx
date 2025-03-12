import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="relative w-[400px] h-[500px] border-amber-600 border-2 rounded-2xl">
      <Image src='/sheriff.jpg'
      className="w-[400px] h-[400px] object-cover"
      width={400} 
      height={400} 
      alt="my_photo"/>
    </div>
  );
}

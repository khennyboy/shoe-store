import Detail1 from "@/app/_components/detail1";
import Detail2 from "@/app/_components/detail2";

export default function Product() {
  return (
    <div className="grid-cols-2 items-center justify-center gap-8 md:grid lg:gap-12">
      <Detail1 />
      <Detail2 />
    </div>
  );
}

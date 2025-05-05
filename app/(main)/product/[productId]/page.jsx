import Detail1 from "@/app/_components/detail1";
import Detail2 from "@/app/_components/detail2";
import supabase from "@/app/_lib/supabase";

export default async function Product({ params }) {
  const { productId } = await params;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();
  console.log(data);
  
  if (!data) {
    return (
      <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
        {error?.message || "An error occurred"} Product can&#39;t be loaded
      </div>
    );
  }

  return (
    <div className="grid-cols-2 items-center justify-center gap-8 md:grid lg:gap-12">
      <Detail1 data={data} />
      <Detail2 data={data} />
    </div>
  );
}

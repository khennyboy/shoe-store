import AuthGuard from "@/app/_components/authguard";
import Payment from "@/app/_components/payment";

export default function PaymentPage() {
  return (
    <AuthGuard>
      <Payment />
    </AuthGuard>
  );
}

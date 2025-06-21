export default function PaymentDotsLoader() {
  const colors = ["bg-blue-600", "bg-green-500", "bg-yellow-500", "bg-red-500"];

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex space-x-2">
        {colors.map((color, i) => (
          <span
            key={i}
            className={`block h-3 w-3 rounded-full ${color} animate-bounce`}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "0.6s",
            }}
          ></span>
        ))}
      </div>
    </div>
  );
}

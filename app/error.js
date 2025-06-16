"use client";

export default function Error({ error, reset }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h1>

      <p className="text-lg text-gray-700 mb-6">{error.message}</p>

      <button
        onClick={reset}
        className="rounded-md bg-orange-500 px-6 py-3 text-white text-lg font-medium hover:bg-orange-600 shadow transition duration-200 cursor-pointer"
      >
        Try Again
      </button>
    </main>
  );
}

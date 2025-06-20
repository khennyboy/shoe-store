import { HiOutlineLogout } from "react-icons/hi";

export default function LogoutConfirmModal({
  onCancel,
  onConfirm,
  isLoggingOut,
}) {
  return (
    <div className="relative w-full max-w-md rounded-2xl  px-6 py-8 shadow-xl transition-all duration-300">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
          <HiOutlineLogout className="h-6 w-6 text-red-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          Log out of your account?
        </h2>
      </div>

      <p className="text-sm leading-relaxed text-gray-600">
        You’re about to log out. Are you sure you want to proceed?
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          disabled={isLoggingOut}
          onClick={onConfirm}
          className={`cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed`}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

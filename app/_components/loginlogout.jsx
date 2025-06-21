"use client";

import Link from "next/link";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { useUser } from "../hooks/handleUser";
import useLoginLogout from "../hooks/handleLoginLogout";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Modal from "./modal";
import LogoutConfirmModal from "./loginconfirm";

export default function Login() {
  const { user } = useUser();
  const [openModal, setOpenModal] = useState(false);

  const { logout, isLoggingOut, logoutError, isLogoutError, isLogoutSuccess } =
    useLoginLogout();

  const onCancel = useCallback(() => setOpenModal(false), []);
  const onConfirm = useCallback(() => logout(), []);

  useEffect(() => {
    if (isLogoutSuccess) {
      toast.success("Logout successful!");
      setOpenModal(false);
    }
    if (isLogoutError) {
      toast.error(logoutError.message);
    }
  }, [isLogoutSuccess, isLogoutError, logoutError]);

  return (
    <>
      {user ? (
        <>
          <button
            onClick={() => setOpenModal(true)}
            title="Logout"
            className="cursor-pointer"
          >
            <IoLogOutOutline className="size-7 stroke-orange-500" />
          </button>

          <Modal openModal={openModal} onCancel={onCancel}>
            <LogoutConfirmModal
              onCancel={onCancel}
              onConfirm={onConfirm}
              isLoggingOut={isLoggingOut}
            />
          </Modal>
        </>
      ) : (
        <Link href="/auth/login" title="Login">
          <IoLogInOutline className="size-8 stroke-orange-500" />
        </Link>
      )}
    </>
  );
}

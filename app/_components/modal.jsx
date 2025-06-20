"use client";

import { cloneElement } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

function Modal({ children, openModal, onCancel }) {
  if (!openModal) return null;

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all">
      <div className="relative w-full max-w-md rounded-lg bg-white shadow-lg transition-all duration-500">
        <div>{cloneElement(children)}</div>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;

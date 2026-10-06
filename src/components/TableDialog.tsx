"use client";

import { useRef } from "react";
import BookingForm from "./BookingForm";

/** "Hold a table" opens the request form in a dialog, so the Visit section stays calm. */
export default function TableDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className="inline-flex min-h-12 items-center gap-3 rounded-full border border-cinnamon/40 px-7 font-sign text-sm uppercase tracking-[0.2em] text-cinnamon transition-colors duration-500 hover:border-cinnamon hover:bg-cinnamon hover:text-paper"
      >
        Hold a table
      </button>
      <dialog
        ref={dialog}
        aria-labelledby="booking-title"
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto w-[min(40rem,calc(100vw-2rem))] border border-brass bg-[#FBF5E8] p-0 text-left text-ink shadow-2xl backdrop:bg-ink/60 backdrop:backdrop-blur-sm"
      >
        <div className="relative p-6 sm:p-10">
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close"
            className="absolute right-3 top-3 grid size-11 place-items-center rounded-full text-cinnamon hover:bg-cinnamon/10"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <BookingForm />
        </div>
      </dialog>
    </>
  );
}

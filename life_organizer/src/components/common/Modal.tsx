"use client";

export default function Modal({
  className,
  buttonName,
  children,
  modalName,
}: {
  className: string;
  buttonName: string;
  modalName: string;
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className={className}
        onClick={() =>
          (document.getElementById(modalName) as HTMLFormElement).showModal()
        }
      >
        {buttonName}
      </button>
      <dialog id={modalName} className="modal p-4 w-full max-w-2xl max-h-full">
        <form method="dialog">
          <button className="btn text-red-600 font-bold text-2xl btn-sm btn-circle btn-ghost absolute right-2 top-2">
            X
          </button>
        </form>
        {children}
      </dialog>
    </>
  );
}

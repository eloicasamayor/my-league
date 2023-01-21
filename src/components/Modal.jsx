export function Modal({ children, onCloseModal }) {
  return (
    <div
      id={"modal-bg"}
      className={"absolute top-0 w-full h-full bg-zinc-900/75"}
      onClick={() => onCloseModal(null)}
    >
      <div
        className="sticky mt-16 mx-auto w-11/12 bg-zinc-500 p-10 rounded-xl lg:w-3/4"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

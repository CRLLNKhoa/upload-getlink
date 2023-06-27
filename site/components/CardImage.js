import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

export default function CardImage({
  img = "",
  title = "",
  uploader = "",
  keyword = [],
  index = 100,
}) {
  const handleModal = () => {
    const q = `my_modal_${index}`;
    document.querySelector(`#${q}`).showModal();
  };

  return (
    <>
      <div className="card w-full bg-base-100 shadow-xl">
        <figure onClick={handleModal} className="h-[200px] bg-black cursor-pointer">
          <img src={img} alt="Shoes" />
        </figure>
        <div className="p-2">
          <h2 className="text-[13px] text-center font-semibold">{title}</h2>
          <div className="card-actions justify-center mb-2 mt-2">
            {keyword?.map((item) => (
              <Link
              href={`/filter/keyword/${item}`}
                key={item}
                className="badge badge-outline text-[11px] font-bold"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <i className="text-[10px] font-semibold">{uploader}</i>
            <button
              onClick={() => {
                navigator.clipboard.writeText(img);
                toast.success("Sao chép thành công!", {
                  position: "bottom-right",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              }}
              className="bg-sky-600 text-[13px] px-2 rounded-lg text-white cursor-pointer font-bold"
            >
              GET LINK
            </button>
          </div>
        </div>
      </div>

      {/* Open the modal using ID.showModal() method */}
      <dialog
        id={`my_modal_${index}`}
        className="modal modal-bottom sm:modal-middle"
      >
        <form method="dialog" className="modal-box">
          <figure className="flex justify-center">
            <img className="max-h-[400px] rounded-lg" src={img} alt="Shoes" />
          </figure>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
}

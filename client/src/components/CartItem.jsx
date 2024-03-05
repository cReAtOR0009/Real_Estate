import React from "react";
import { MdDelete } from "react-icons/md";
import { styles } from "../styles/styles";

const CartItem = ({ image, title, id, details, price }) => {
  const truncateDetails = (content, maxLength) => {
    const words = content.split(" ");
    const truncatedWords = words.slice(0, maxLength).join(" ");
    return words.length > maxLength ? `${truncatedWords}...` : content;
  };

  const truncatedDetails = truncateDetails(details, 10);
  return (
    <>
      <div
        id={id}
        className="flex  items-center justify-between gap-[10px] w-full"
      >
        <div className=" relative  hover:scale-105 transition-all duration-75 ease-in-out grid items-center">
          <img
            className=" w-36 h-[auto] object-fill lg:w-28"
            src={image}
            alt={`cart image for ${title}`}
          />
          <div className="absolute right-1 top-1 bg-white/80 text-black text-xs px-1 rounded">
            ${price}
          </div>
        </div>
        <div>
          <div className="grid items-center gap-4">
            <div className="grid items-center leading-none">
              <h1 className="font-medium">{title}</h1>
              <p className={`${styles.cartParagraph}`}>{truncatedDetails}</p>
            </div>
          </div>
        </div>
        <div className="grid items-center gap-5">
          <div className="grid items-center justify-center">
            <h1 className="text-lg lg:text-base text-slate-900 font-medium">
              ${price}
            </h1>
          </div>
          <div className="grid items-center justify-center">
            <button
              type="button"
              className="bg-theme-cart rounded p-1 lg:p-0.5 grid items-center justify-items-center cursor-pointer"
              //   onClick={onRemoveItem}
            >
              {/* <TrashIcon className="w-5 h-5 text-white" /> */}
              <MdDelete />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;

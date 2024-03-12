import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { styles } from "../styles/styles";
import { CartContext } from "../context/cartContext";

const truncateDetails = (words, maxLength) => {
  // console.log("content :", content)
  // const words = content.split(" ");
  const truncatedWords = words.slice(0, maxLength);
  // return words.length > maxLength ? `${truncatedWords}...` : content;
  return truncatedWords;
};

const CartItem = ({ image, title, id, description, price }) => {

  
  const truncatedDetails = truncateDetails(description, 10);
  const { deleteCartItem } = useContext(CartContext);

  const DeleteItemFromCart = () => {
    deleteCartItem(id);
    // console.log("id", id);
  };
  return (
    <>
      <div
        id={id}
        className="flex  items-center justify-between gap-[10px] w-full"
      >
        <div className=" relative  hover:scale-105 transition-all duration-75 ease-in-out grid items-center">
          <img
            className=" w-36 h-[auto] object-fill lg:w-40 lg:h-15"
            src={image.url}
            alt={`cart image for ${title}`}
          />
          {/* <div className="absolute right-1 top-1 bg-white/80 text-black text-xs px-1 rounded">
            ${price}
          </div> */}
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
              onClick={DeleteItemFromCart}
              type="button"
              className="bg-theme-cart rounded p-1 lg:p-0.5 grid items-center text-[red] justify-items-center cursor-pointer "
              //   onClick={onRemoveItem}
            >
              {/* <TrashIcon className="w-5 h-5 text-white" /> */}
              <MdDelete size={20} style={{ color: "red" }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;

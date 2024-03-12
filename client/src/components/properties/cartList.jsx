import React, { useContext, useEffect, useRef } from "react";
import { CartContext } from "../../context/cartContext";
import { MdOutlineClose } from "react-icons/md";
import CartItem from "../CartItem";
import { styles } from "../../styles/styles";

const CartList = () => {
  const componentRef = useRef(null);
  const { cart, toggleCart } = useContext(CartContext);
  

//   useEffect(() => {
//     const handleClick = (e) => {
//       if (componentRef.current && componentRef.current.contains(e.target)) {
//         console.log("Clicked inside!");
//       } else if (cart.cartstate) {
//         console.log("hello");
//         // if (cart.cartstate == true) {
//         console.log("cart state true, so Hello");
//         toggleCart();
//         // }
//       }
//     };
//     document.addEventListener("click", handleClick);
//     return () => {
//       document.removeEventListener("click", handleClick);
//     };
//   }, [cart.cartstate]);

  return (
    <>
      {cart.cartstate && (
        <div
          ref={componentRef}
          className=" z-[100] right-[0px] fixed top-0 bg-[#a685fa] p-[20px] w-[300px] sm:w-[500px] h-[100vh]"
        >
          <MdOutlineClose
            className="cursor-pointer text-[30px]"
            onClick={toggleCart}
          />
          <h1 className="text-center font-semibold uppercase ">
            PROPERTIES ORDER
          </h1>
          <div className="flex flex-col gap-[10px] grow">
            {cart.properties.map((property, index) => {
              console.log("properties", property, index);
              return <CartItem key={index} {...property} />;
            })}
          </div>

          <div className=" w-full absolute bottom-0 px-5 py-2 grid items-center text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-base font-semibold uppercase">SubTotal</h1>
              <h1 className="text-sm rounded px-1 py-0.5">${}Amount</h1>
            </div>
            <div className="grid items-center gap-2 text-White-90">
              <p className="font-medium text-center text-White-90">
                Taxes and Shipping Will Calculate At Shipping
              </p>
              <button
                type="button"
                className={`${styles.buttonPadding} text-white`}
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartList;

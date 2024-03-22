import React, { useContext, useEffect, useRef } from "react";
import { CartContext } from "../context/cartContext";
import { MdOutlineClose } from "react-icons/md";
import CartItem from "./CartItem";
import { styles } from "../styles/styles";
import { Link } from "react-router-dom";
import { useCheckoutMutation } from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

const CartList = () => {
  const componentRef = useRef(null);
  const { cart, toggleCart, getTotal } = useContext(CartContext);

  const [checkout, { isLoading }] = useCheckoutMutation();
  const dispath = useDispatch();

  const handleCheckout = async (e) => {
    // e.preventDefault();

    try {
      const Properties = await checkout({
        properties: cart.properties,
      }).unwrap();
      console.log("Properties:", Properties);
      // navigate("/welcome");
    } catch (err) {
      console.log("error: ", err);
      // if (!err?.data) {
      //   // isLoading: true until timeout occurs
      //   // console.log("original status:", err.originalStatus)
      //   setErrMsg("No Server Response");
      // } else if (err.data.status === 400) {
      //   setErrMsg(err.data.error);
      // } else if (err.originalStatus === 401) {
      //   setErrMsg("Unauthorized");
      // } else {
      //   setErrMsg("Login Failed");
      // }
      // errRef.current.focus();
    }
  };

  // getTotal;

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
              console.log("properties...", property, index);
              return <CartItem key={index} {...property} />;
            })}
          </div>

          <div className=" w-[95%] absolute bottom-0 px-5 py-2 flex flex-col text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-base font-semibold uppercase">CartTotal</h1>
              <h1 className="text-[20px] rounded px-1 py-0.5">${cart.total}</h1>
            </div>
            <div className="grid items-center gap-2 text-White-90">
              <p className="font-medium text-center text-White-90">
                Taxes and Shipping Will Calculate At Shipping
              </p>
              <button
                type="button"
                className={`${styles.buttonPadding} text-white`}
                onClick={() => handleCheckout()}
              >
                Checkout
                {/* <Link to={`/auth/create-checkout-session`}>Check Out</Link> */}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartList;

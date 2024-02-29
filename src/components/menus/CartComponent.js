import React, { useEffect, useMemo } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/CartItemComponent";
import { useRecoilValue } from "recoil";
import { cartTotalState } from "../../atoms/cartState";

const CartComponent = () => {
    const { isLogin, loginState } = useCustomLogin();
    // const { refreshCart, cartItems, changeCart } = useCustomCart();
    const { cartItems, changeCart } = useCustomCart();

    // console.log(cartItems);

    // const total = useMemo(() => {
    //     let total = 0;

    //     for (const item of cartItems) {
    //         total += item.price * item.qty;
    //     }

    //     return total;
    // }, [cartItems]);

    // useEffect(() => {
    //     if (isLogin) {
    //         refreshCart();
    //     }
    // }, [isLogin]);

    const totalValue = useRecoilValue(cartTotalState);

    return (
        <div className="w-full">
            {isLogin ? (
                <div className="flex flex-col">
                    <div className="w-full flex">
                        <div className="m-2 font-extrabold">
                            {loginState.nickname}'s Cart
                        </div>
                        <div className="bg-orange-600 w-9 text-center text-white font-bold rounded-full m-2">
                            {cartItems.length}
                        </div>
                    </div>
                    <div>
                        <ul>
                            {cartItems.map((item) => (
                                <CartItemComponent
                                    {...item}
                                    key={item.cino}
                                    changeCart={changeCart}
                                    email={loginState.email}
                                />
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="text-2xl text-right font-extrabold">
                            TOTAL: {totalValue}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default CartComponent;

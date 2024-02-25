import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItemsAsync, postChangeCartAsync } from "../slices/cartSlice";
import { useRecoilState } from "recoil";
import { cartState } from "../atoms/cartState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCartItems, postChangeCart } from "../api/cartApi";

const useCustomCart = () => {
    // const cartItems = useSelector((state) => state.cartSlice);
    const [cartItems, setCartItmes] = useRecoilState(cartState);

    const queryClient = useQueryClient();

    const changeMutation = useMutation({
        mutationFn: (param) => postChangeCart(param),
        onSuccess: (result) => setCartItmes(result),
    });

    const query = useQuery({
        queryKey: ["cart"],
        queryFn: () => getCartItems(),
        staleTime: 1000 * 60 * 60,
    });

    // const dispatch = useDispatch();

    // const refreshCart = () => {
    //     dispatch(getCartItemsAsync());
    // };

    useEffect(() => {
        if (query.isSuccess || changeMutation.isSuccess) {
            queryClient.invalidateQueries("cart");
            setCartItmes(query.data);
        }
    }, [query.isSuccess, query.data]);

    const changeCart = (param) => {
        // dispatch(postChangeCartAsync(param));
        changeMutation.mutate(param);
    };

    return { cartItems, changeCart };
};

export default useCustomCart;

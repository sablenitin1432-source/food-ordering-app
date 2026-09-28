import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";


// eslint-disable-next-line react-refresh/only-export-components
export const StoreContext = createContext()


const StoreContextProvider = (props) => {


    const [cartItems, setCartItems] = useState({});
    const url = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState("");
    const [food_list, setFOODList] = useState([])



    const addToCart = async (itemId) => {
        try {
            if (token) {
                const response = await axios.post(
                    url + "/api/cart/add",
                    { itemId },
                    {
                    headers: { Authorization: `Bearer ${token}` }
                }
                )
                if (!response.data.success) {
                    throw new Error("Cart update was not accepted");
                }
            }
        } catch {
            console.error("Cart update failed");
            await loadCartData(token, false);
            window.alert("Unable to update your cart. Please try again.");
            return;
        }
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    }


    const removeFromCart = async (itemId) => {
        try {
            if (token) {
                const response = await axios.post(
                    url + "/api/cart/remove",
                    { itemId },
                    {
                    headers: { Authorization: `Bearer ${token}` }
                }
                )
                if (!response.data.success) {
                    throw new Error("Cart update was not accepted");
                }
            }
        } catch {
            console.error("Cart update failed");
            await loadCartData(token, false);
            window.alert("Unable to update your cart. Please try again.");
            return;
        }
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0 }));
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                let itemInfo = food_list.find((product) => product._id === itemId);
                if (!itemInfo) continue; // avoid undefined crash
                totalAmount += itemInfo.price * cartItems[itemId];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = useCallback(async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            console.log("FULL RESPONSE:", response.data);
            setFOODList(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error("Failed to load food list:", error);
            setFOODList([]);
        }
    }, [url]);

    const loadCartData = useCallback(async (token, showError = true) => {
        try {
        const response = await axios.post(
            url + "/api/cart/get",
            {},
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        if (!response.data.success || !response.data.cartData || typeof response.data.cartData !== "object" || Array.isArray(response.data.cartData)) {
            throw new Error("Cart response was invalid");
        }
        setCartItems(response.data.cartData);
        } catch {
            console.error("Failed to load cart");
            if (showError) {
                window.alert("Unable to load your saved cart. Please try again.");
            }
        }
    }, [url]);

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();

            const storedToken = localStorage.getItem("token");

            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, [fetchFoodList, loadCartData]);
    const contextvalue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        loadCartData
    }
    return (
        <StoreContext.Provider value={contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
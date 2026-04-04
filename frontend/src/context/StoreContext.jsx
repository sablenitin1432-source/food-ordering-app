import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


export const StoreContext = createContext()


const StoreContextProvider = (props) => {


    const [cartItems, setCartItems] = useState({});
    const url = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState("");
    const [food_list, setFOODList] = useState([])



    const addToCart = async (itemId) => {
        setCartItems((prev) => {
            const updated = { ...prev };
            if (!updated[itemId]) {
                updated[itemId] = 1;
            } else {
                updated[itemId] += 1;
            }
            return updated;
        });

        if (token) {
            await axios.post(
                url + "/api/cart/add",
                { itemId },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
        }
    }


    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0 }));

        if (token) {
            await axios.post(
                url + "/api/cart/remove",
                { itemId },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
        }
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

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            console.log("FULL RESPONSE:", response.data);
            setFOODList(response.data.data);
        } catch (error) {
            console.log("ERROR:", error);
        }
    }

    const loadCartData = async (token) => {
        const response = await axios.post(
            url + "/api/cart/get",
            {},
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        setCartItems(response.data.cartData || {});
    }

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
    }, []);
    const contextvalue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextvalue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
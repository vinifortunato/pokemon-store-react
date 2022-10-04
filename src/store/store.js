import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart";
import { productsReducer } from "./products";
import { userReducer } from "./user";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        user: userReducer
    }
});

store.subscribe(() => {
    const state = store.getState();
    console.log('subscribe', state);
});

export default store;
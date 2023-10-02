import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal'};

const addDecimals = num => {
    return (Math.round(num * 100 / 100).toFixed(2));
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find(x => item._id === x._id);

            if(existItem){
                state.cartItems = state.cartItems.map(x => x._id === existItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            //Calculate items price
            state.itemsPrice = state.cartItems.reduce((sum, item) => {
                return sum + item.price * item.qty
            }, 0);

            //Calculate shipping price
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

            //Calculate tax price
            state.taxPrice = addDecimals(Number((state.itemsPrice * 0.15).toFixed(2)));

            //Calculate total price
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice)).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload);

            //Calculate items price
            state.itemsPrice = state.cartItems.reduce((sum, item) => {
                return sum + item.price * item.qty
            }, 0);

            //Calculate shipping price
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

            //Calculate tax price
            state.taxPrice = addDecimals(Number((state.itemsPrice * 0.15).toFixed(2)));

            //Calculate total price
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice)).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;

            //Calculate items price
            state.itemsPrice = state.cartItems.reduce((sum, item) => {
                return sum + item.price * item.qty
            }, 0);

            //Calculate shipping price
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

            //Calculate tax price
            state.taxPrice = addDecimals(Number((state.itemsPrice * 0.15).toFixed(2)));

            //Calculate total price
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice)).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;

            //Calculate items price
            state.itemsPrice = state.cartItems.reduce((sum, item) => {
                return sum + item.price * item.qty
            }, 0);

            //Calculate shipping price
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

            //Calculate tax price
            state.taxPrice = addDecimals(Number((state.itemsPrice * 0.15).toFixed(2)));

            //Calculate total price
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice)).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];

            //Calculate items price
            state.itemsPrice = state.cartItems.reduce((sum, item) => {
                return sum + item.price * item.qty
            }, 0);

            //Calculate shipping price
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

            //Calculate tax price
            state.taxPrice = addDecimals(Number((state.itemsPrice * 0.15).toFixed(2)));

            //Calculate total price
            state.totalPrice = (Number(state.itemsPrice) + Number(state.shippingPrice)).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));
            
        },
        resetCart: (state) => state = initialState

    },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
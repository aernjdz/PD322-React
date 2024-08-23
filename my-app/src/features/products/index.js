import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    carts: 0,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addToCart: (state) => {
            state.carts += 1;
        },
        setProducts: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { setProducts, addToCart } = productsSlice.actions;
export default productsSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';

import productsReducer from '../features/products/index';

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});

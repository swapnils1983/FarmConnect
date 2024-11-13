import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from './authSlice';
import { cartSlice } from './cartSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart'], 
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  cart: cartSlice.reducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
export default store;








// import { configureStore } from '@reduxjs/toolkit';
// import { authSlice } from './authSlice';
// import { cartSlice } from './cartSlice';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to local storage
// import { combineReducers } from 'redux';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth', 'cart'], // persist both auth and cart
// };

// const rootReducer = combineReducers({
//   auth: authSlice.reducer,
//   cart: cartSlice.reducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== 'production',
// });

// export const persistor = persistStore(store);
// export default store;











// import { configureStore } from '@reduxjs/toolkit';
// import { authSlice } from './authSlice';
// import { cartSlice } from './cartSlice';

// const store = configureStore({
//   reducer: {
//     auth: authSlice.reducer,
//     cart: cartSlice.reducer,
//   },
//   // Applying the Redux DevTools extension
//   devTools: process.env.NODE_ENV !== 'production', // This enables DevTools only in development mode
// });

// export default store;

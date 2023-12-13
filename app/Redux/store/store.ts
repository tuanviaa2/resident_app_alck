import loadingReducer from '../loading/loadingSlice';
import messagesReducer from '../messages/messagesSlice';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persitStorage from "./persitStorage";
import { persistReducer } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { appSlice } from "../slices/app.slice";
import { PersistConfig } from "redux-persist/es/types";
import { LocalStorageKey, SLICE_NAME } from "../constant";
import { userSlice } from "../slices/user.slice";

const rootReducer = combineReducers({
  app:appSlice.reducer,
  user: userSlice.reducer,
  loading: loadingReducer,
  messages: messagesReducer,
});

const persistConfig:PersistConfig<any> = {
  key: LocalStorageKey.ROOT,
  version: 1,
  storage: persitStorage,
  timeout: 0,
  whitelist:[SLICE_NAME.APP,SLICE_NAME.USER]
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    root: persistedReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = ()=> useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export {store,persistor}

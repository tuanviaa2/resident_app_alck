/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect } from "react";
import RootNavigation from './app/Navigation/RootNavigation';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import { persistor, store, useAppDispatch } from "./app/Redux/store";
import { StatusBar } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { handleUpdateMessages } from "./app/Helper/handlers";
import LoadingModal from "./app/Screens/login/components/LoadingModal";
import { offLoading } from "./app/Redux/slices";

const App = () => {
  useEffect(() => {
    handleUpdateMessages()

  }, []);
  return <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={"transparent"}
          translucent />
          <RootNavigation />
        <LoadingModal/>
      </PersistGate>
    </Provider>
};
export default App;

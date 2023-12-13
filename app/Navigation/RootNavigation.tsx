/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import AppStack from './AppStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoadingSpinner from '../Components/Custom/LoadingSpinner';
import {useSelector, useDispatch} from 'react-redux';
import { RootState, useAppDispatch } from "../Redux/store/store";
import {navigationRef} from '../Helper/navigationHelper';
import LoginScreen from "../Screens/login";
import { offLoading } from "../Redux/slices";
import { localStorage } from "../Utils/storage";
const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const dispatch = useAppDispatch()
  const {isLoading} = useSelector((state: RootState) => state.root.loading);
  useEffect(() => {
    dispatch(offLoading())
  }, []);
  const token = localStorage.getString("token");
  return (
    <NavigationContainer ref={navigationRef}>
      <LoadingSpinner isLoading={isLoading} />
      <Stack.Navigator
        initialRouteName={token?"AppStack":"LoginScreen"}
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="AppStack" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

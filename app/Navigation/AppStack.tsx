import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatScreen from '../Screens/Chat/ChatScreen';
import {AppStackParamList} from '../Models/Navigation';
import HomeScreen from "../Screens/home";
import ProfileScreen from "../Screens/profile";
import DetailPaymentScreen from "../Screens/detail_payment";
import DetailRoomScreen from "../Screens/detail_room";
import NotiScreen from "../Screens/noti";

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: false,
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen} />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen} />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}/>
      <Stack.Screen
        name="DetailPaymentScreen"
        component={DetailPaymentScreen}/>
      <Stack.Screen
        name="DetailRoomScreen"
        component={DetailRoomScreen}/>
      <Stack.Screen
        name="NotiScreen"
        component={NotiScreen}/>
    </Stack.Navigator>
  );
}

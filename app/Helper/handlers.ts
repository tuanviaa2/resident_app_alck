/* eslint-disable @typescript-eslint/no-unused-vars */
import {api} from '../Api/Api';
import UserModal from '../Models/UserModel';
import {Toast} from 'native-base';
import {successToast, errorToast} from '../Components/Custom/customToasts';
import {loadingOn, loadingOff} from '../Redux/loading/loadingSlice';
import {navigate} from '../Helper/navigationHelper';
import {loginUser, logoutUser} from '../Redux/user/userSlice';
import {clearMessages} from '../Redux/messages/messagesSlice';
import { store } from "../Redux/store";

export const handleRegister = async (payload: UserModal) => {
  try {
    // Dispatch action to on the loading
    store.dispatch(loadingOn());

    // Api hitting for sinup
    await api.signupUser(payload);

    // Dispatch action to off the loading
    store.dispatch(loadingOff());

    Toast.show({
      render: () => successToast('Successfully Added User, Now Login'),
    });

    navigate('LoginScreen');
  } catch (error) {
    Toast.show({
      render: () => errorToast('Error In Adding User'),
    });
  }
};

export const handleLogin = async (email: string, password: string) => {
  try {
    // Dispatch action to on the loading
    store.dispatch(loadingOn());

    // Api hitting for login
    let user: UserModal = {
      id: email,
      name: email,
      email: '',
      password: '',
    };
   // await store.dispatch(loginUser(user));
    navigate('AppStack');
    // Dispatch action to off the loading
    store.dispatch(loadingOff());
  } catch (error) {
    Toast.show({
      render: () => errorToast('Error Logging In.'),
    });
  }
};

export const handleLogout = async () => {
  try {
    // Dispatch action to logout
    store.dispatch(logoutUser());

    // Navigating back to login
    navigate('AuthStack');
  } catch (error) {
    Toast.show({
      render: () => errorToast('Error Log Out.'),
    });
  }
};

export const handleCreateChatList = async (
  currentUser: any,
  otherUser: any,
) => {
  try {
    // Dispatch action to on the loading
    store.dispatch(loadingOn());
    const chatList = await api.createChatList(currentUser, otherUser);
    navigate('ChatScreen', {
      user: otherUser,
      chatlist: chatList,
    });

    // Dispatch action to off the loading
    store.dispatch(loadingOff());
  } catch (error) {
    Toast.show({
      render: () => errorToast('Error Logging In.'),
    });
  }
};

export const handleSendMessage = async (
  senderId: string,
  recieverId: string,
  message: String,
  roomId: String,
  avatar:string,
  name:string,
) => {
  try {
    // Dispatch action to on the loading
    await api.sendMessage(senderId, recieverId, message, roomId,avatar,name);
    // Dispatch action to off the loading
  } catch (error) {
    Toast.show({
      render: () => errorToast('Error In Sending Message.'),
    });
  }
};

export const handleFetchMessages = async (roomId: string) => {
  try {
    await api.fetchMessages(roomId);
  } catch (error) {
    Toast.show({
      render: () => errorToast('Error Logging In.'),
    });
  }
};

export const handleUpdateMessages = async (roomId: string = '1') => {
  try {
    console.log('Updating messages ...');
    await api.updateMessage(roomId);
    console.log('complete')
  } catch (error) {
    Toast.show({
      render: () => errorToast('Error Logging In.'),
    });
  }
};
export const handleClearMessages = () => {
  try {
    store.dispatch(clearMessages());
  } catch (error) {
    Toast.show({
      render: () => errorToast('Error Logging In.'),
    });
  }
};

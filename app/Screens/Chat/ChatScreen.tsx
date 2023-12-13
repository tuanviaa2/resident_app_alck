import {
  View,
  ImageBackground, KeyboardAvoidingView, FlatList, Pressable
} from "react-native";
import React, { useState, useRef } from "react";
import { chat_styles } from "../../Utils/Styles";
import ChatHeader from "../../Components/Chat/ChatHeader";
import ChatFooter from "../../Components/Chat/ChatFooter";
import Message from "../../Components/Chat/Message";
import {
  handleSendMessage
} from "../../Helper/handlers";
import { useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../Redux/store";
import ChatListModel from "../../Models/ChatListModel";
import { getTime } from "../../Helper/filter";
import MessageModel from "../../Models/MessageModel";
import { ResidentInfo2 } from "../../db.test";
import { ResidentModal } from "../../Components/modal/ProfileModal";
import { ResidentInfo } from "../../global";

const chatList: ChatListModel = {
  name: "residentRoom",
  email: "1@gmail.com",
  roomId: "1",
  lastMsg: "Hello",
  id: "1"
};
const SingleChatScreen = ({ route }: any) => {
  const [messageText, setMessageText] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const currentUser = useSelector((state: RootState) => state.root.user) as ResidentInfo2;
  const chat = useSelector((state: RootState) => state.root.messages as Array<MessageModel>);
  const flatListRef = useRef<FlatList | null>(null);
  const { user } = useAppSelector(state => {
    return state.root.user;
  }) as { user: ResidentInfo };
  async function handleMessage() {
    if (messageText && messageText !== "") {
      await handleSendMessage(
        user.personal_identification_number,
        chatList.id,
        messageText,
        chatList.roomId,
        user?.portrait_url || '',
        user?.fullName
      );
      setMessageText("");
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, bottom: 0 }}>
      <View style={chat_styles.container}>
        <ImageBackground
          source={require("../../Assets/wallpaper3.png")}
          resizeMode="cover"
          style={chat_styles.bgImage}>
          <ChatHeader name={"Phòng chat"} />
          <FlatList
            inverted
            ref={flatListRef}
            style={chat_styles.scroller}
            data={chat}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return <Pressable onPress={()=>setShowProfile(true)}>
                <Message
                  name={item.name}
                  avatar={item.avatar}
                  isMine={user.personal_identification_number === item.from}
                  message={item.message}
                  time={getTime(item.sendTime + "")}
                />
              </Pressable>;
            }}
          />
          <ChatFooter
            message={messageText}
            setMessage={setMessageText}
            handleMessage={handleMessage}
          />
        </ImageBackground>
      </View>
      <ResidentModal
        id={""}
        hideModal={() => {
          setShowProfile(false);
        }} visible={showProfile} />
    </KeyboardAvoidingView>
  );
};

export default SingleChatScreen;

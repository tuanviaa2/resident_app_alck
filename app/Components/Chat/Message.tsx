/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet, Image, StatusBar } from "react-native";
import React from "react";
import { COLORS } from "../../Utils/Colors";
import { ChatMessage_Prop } from "../../Models/ComponentsProps";

const Message = ({ isMine, message, time, name, avatar }: ChatMessage_Prop) => {
  const styles = StyleSheet.create({
    text: {
      color: isMine ? COLORS.ownMessageText : COLORS.otherMessageText,
      fontSize: 16
    },
    shadow: {
      shadowOffset: { width: 10, height: 10 },
      shadowColor: "black",
      shadowOpacity: 1,
      elevation: 2
    },
    time: {
      alignSelf: "flex-end",
      color: "gray",
      fontSize: 14
    },
    name: {
      color: "white",
      fontWeight: "bold",
      fontSize: 15,
      marginBottom: 5
    }
  });

  return (
    <View>
      <StatusBar translucent={false}/>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        width: "100%",
        marginBottom: 8,
        justifyContent: !isMine ? "flex-start" : "flex-end",
        padding: 8
      }}>
        {!isMine && <View>
          <Text style={styles.name}>{name}</Text>
          <Image
            source={{ uri: avatar.length == 0 ?  'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg' : avatar }}
            style={{
              width: 50,
              height: 50,
              backgroundColor: "green",
              borderRadius: 25,
              borderWidth: 1,
              borderColor: "gray"
            }} />
        </View>}
        <View style={{
          backgroundColor: isMine ? COLORS.ownMessageBg : COLORS.otherMessageBg,
          borderRadius: 18,
          minWidth: "40%",
          padding: 8,
          borderBottomLeftRadius: !isMine ? 0 : 18,
          borderBottomRightRadius: isMine ? 0 : 18
        }}>
          <Text style={styles.text}>{message}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    </View>
  );
};
export default Message;

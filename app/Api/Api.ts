/* eslint-disable @typescript-eslint/no-unused-vars */
import UserModel from "../Models/UserModel";
import { firebase, FirebaseDatabaseTypes } from "@react-native-firebase/database";
import uuid from "react-native-uuid";
import ChatListModel from "../Models/ChatListModel";
import MessageModel from "../Models/MessageModel";
import moment from "moment";

import { addMessage, loadMessages } from "../Redux/messages/messagesSlice";
import { sortByDate } from "../Helper/filter";
import { store } from "../Redux/store";

class API {
  endpoint: string;
  reference: any;
  messagesRef: any= null;
  isInitialData = true;
  constructor(url: string) {
    this.endpoint = url;
    this.reference = firebase.app().database(this.endpoint);
    this.messagesRef = this.reference.ref("/messages/1").orderByChild("sendTime");
  }

  // SignUp Method
  async signupUser(payload: UserModel): Promise<void> {
    return this.reference.ref(`/users/${payload.id}`).set(payload);
  }

  // Login Method
  async loginUser(email: string): Promise<UserModel> {
    return this.reference
      .ref("/users/")
      .orderByChild("email")
      .equalTo(email)
      .once("child_added")
      .then((snapshot: any) => snapshot.val());
  }

  // Fetch All Users Method
  async fetchAllUsers(): Promise<Array<UserModel>> {
    return this.reference
      .ref("/users/")
      .orderByChild("name")
      .once("value")
      .then((snapshot: any) => Object.values(snapshot.val()));
  }

  async createChatList(
    currentUser: any,
    otherUser: any
  ): Promise<ChatListModel> {
    const roomId = uuid.v4().toString();
    return firebase
      .app()
      .database(this.endpoint)
      .ref("/chatlist/" + currentUser.id + "/" + otherUser.id)
      .once("value")
      .then(snapshot => {
        if (snapshot.val() == null) {
          const currentUserData: ChatListModel = {
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            lastMsg: "Hello i am using Dchat ",
            roomId
          };
          const otherUserData: ChatListModel = {
            id: otherUser.id,
            name: otherUser.name,
            email: otherUser.email,
            lastMsg: "Hello i am using Dchat ",
            roomId
          };

          firebase
            .app()
            .database(this.endpoint)
            .ref("/chatlist/" + otherUser.id + "/" + currentUser.id)
            .update(currentUserData);

          firebase
            .app()
            .database(this.endpoint)
            .ref("/chatlist/" + currentUser.id + "/" + otherUser.id)
            .update(otherUserData);

          return otherUserData;
        } else {
          const otherUserData: ChatListModel = {
            id: otherUser.id,
            name: otherUser.name,
            email: otherUser.email,
            lastMsg: "Hello i am using Dchat ",
            roomId: snapshot.val().roomId
          };
          return otherUserData;
        }
      });
  }

  async sendMessage(
    sender: string,
    reciever: string,
    message: String,
    roomId: String,
    avatar:string,
    name:string,
  ): Promise<void> {
    // Getting reference for message
    const newReference = this.reference.ref("/messages/" + roomId).push();
    const messageData: MessageModel = {
      roomId: roomId,
      message: message,
      from: sender,
      to: reciever,
      sendTime: moment().format(""),
      msgType: "text",
      id: newReference.key,
      avatar,
      name,
    };
    newReference.set(messageData).then(() => {
      let chatListupdate = {
        lastMsg: message,
        sendTime: messageData.sendTime
      };
      return Promise.all([
        this.reference
          .ref("/chatlist/" + reciever + "/" + sender)
          .update(chatListupdate),
        this.reference
          .ref("/chatlist/" + sender + "/" + reciever)
          .update(chatListupdate)
      ]);
    });
  }

  async fetchMessages(roomId: string, startTimestamp?: number) {
    let query = this.reference.ref("/messages/" + roomId);
    if (startTimestamp) {
      query = query.orderByChild("timestamp").endAt(startTimestamp - 1);
    } else {
      query = query.orderByChild("timestamp");
    }
    return query.once("value", (snapshot: any) => {
      if (snapshot?.val()) {
        store.dispatch(
          loadMessages(sortByDate(Object.values(snapshot.val())))
        );
      }
    });
  }

  async updateMessage(roomId: string) {
    this.messagesRef.on("child_added", (snapshot: any) => {
      if (snapshot?.val()) {
        const message = snapshot.val();
        console.log(message);
        store.dispatch(addMessage(message));
      }
    });
  }
}

// Using ip of local system because backend api are running on local system
export const api = new API(
  "https://qlck-68377-default-rtdb.asia-southeast1.firebasedatabase.app/"
);

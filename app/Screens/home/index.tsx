import { AppScreenContainer } from "../../layout";
import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { MenuItem, MenuItemProps } from "./components/MenuItem";
import { useTheme } from "../../hooks";
import { images } from "../../Assets/images";
import { AppHeader } from "../../Components/header/AppHeader";
import { navigate } from "../../Helper/navigationHelper";
import {useAppSelector } from "../../Redux/store";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AdminInfoModal } from "../../Components/modal/AdminModal";
import { AppButton } from "../../Components/button/AppButton";
import { ResidentInfo } from "../../global";
import { localStorage } from "../../Utils/storage";

function greeting(name: String) {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 11) {
    return " Chào buổi sáng, " + name;
  } else if (currentHour >= 11 && currentHour < 13) {
    return "Chào buổi trưa, " + name;
  } else if (currentHour >= 13 && currentHour < 18) {
    return "Chào buổi chiều!";
  } else {
    return "Chào buổi tối, " + name;
  }
}

const HomeScreen = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const menuItems: MenuItemProps [] = [
    {
      label: "Thông tin cá nhân",
      onPress: () => {
        navigate("ProfileScreen");
      },
      image: images.menuItem1
    },
    {
      label: "Khoản nợ",
      onPress: () => {
        navigate("DetailRoomScreen");
      },
      image: images.menuItem2
    },
    {
      label: "Phòng chat chung cư",
      onPress: () => {
        navigate("ChatScreen");
      },
      chatItem: true,
      image: images.menuItem3
    },
    {
      label: "Thông tin liên hệ",
      onPress: () => {
        setShowModal(true);
      },
      image: images.menuItem4
    }
  ];

  // lấy thông tin của người dùng đã đăng nhập vào app 
  const { user } = useAppSelector(state => {
    return state.root.user;
  }) as { user: ResidentInfo };

  // đếm xem có bnhiu thông báo chưa đọc
  const getNoti = () => {
    let i = 0;
    user?.notifications?.forEach(item => {
      if (item.isReading==false) {
        i++;
      }
    });
    return i;
  };
  const { colors } = useTheme();
  const navigation = useNavigation();
  return <AppScreenContainer>
    <AppHeader
      title={greeting(user?.fullName || "Unknow")}
      action={<View style={{ flexDirection: "row", alignItems: "center" }}>
        <Appbar.Action
          onPress={() => {
            navigate("NotiScreen");
          }}
          color={colors.textOnPrimary}
          icon={"bell"} />
        {
          getNoti() > 0 && <View style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            right: 8,
            top: 8
          }}>
            <Text style={{ fontWeight: "bold", color: "white" }}>
              {getNoti()}
            </Text>
          </View>
        }
      </View>}
    />
    <ScrollView style={{ padding: 16, flex: 1 }}>
      <View style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12
      }}>
        {menuItems.map((item, index) => {
          return <MenuItem
            chatItem={item.chatItem}
            key={index}
            label={item.label}
            onPress={item.onPress}
            image={item.image} />;
        })}
      </View>
      <AppButton label={"Đăng xuất"} onPress={() => {
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginScreen" as never }]
        });
        localStorage.clearAll();
      }} />
    </ScrollView>
    <AdminInfoModal
      visible={showModal}
      hideModal={() => setShowModal(false)} />
  </AppScreenContainer>;
};
export default HomeScreen;

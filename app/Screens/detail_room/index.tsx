import React, { useEffect, useState } from "react";
import { AppScreenContainer } from "../../layout";
import { useTheme } from "../../hooks";
import { useRoute } from "@react-navigation/native";
import { AppThemeColors } from "../../themes";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { ListPayment } from "../detail_payment/components/ListPayment";
import { AppHeader } from "../../Components/header/AppHeader";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { Bill, ResidentInfo } from "../../global";

const DetailRoomScreen = () => {
  const { colors } = useTheme();
  const styles = useStyles(colors);

  //lấy thông tin của cư dân đã đăng nhập 
  const dispatch = useAppDispatch(); //cho phép để lấy một hàm dispatch từ Redux Toolkit
  const {user}= useAppSelector(state => {
    return state.root.user
  })
  //** 
  const [residentInfo, setResidentInfo] = useState<ResidentInfo>(user);
  return <AppScreenContainer>
    <AppHeader
      showBackButton title={"Khoản nợ"}
    />
     <View style={{ padding: 16 }}>
      <Image
        style={styles.avatar}
        source={{ uri: !residentInfo.portrait_url ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzhG23F5VXoykW672-NhGsqLrgfnij-Z-ayCUs6Gc&s" : residentInfo.portrait_url }} />
      <Text style={styles.fullName}>{user.fullName}</Text>
     {
      // danh sach da thanh toan
     }
      <ListPayment
        isPayment
        paymentInfo={residentInfo.payments.filter(paymentInfo => paymentInfo.isPayment)} />
       {
      // danh sach chua thanh toan
     }
      <ListPayment
        isPayment={false}
        paymentInfo={residentInfo.payments.filter(paymentInfo => !paymentInfo.isPayment)} />
    </View>
  </AppScreenContainer>;
};

const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  avatar: {
    width: 150,
    height: 150,
    backgroundColor: "red",
    alignSelf: "center",
    borderRadius: 75,
    marginTop: 20,
    borderWidth: 2,
    borderColor: colors.itemBackground
  },
  fullName: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: colors.primary
  }
});
export default DetailRoomScreen;

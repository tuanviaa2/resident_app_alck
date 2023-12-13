import React from "react";
import { AppScreenContainer } from "../../layout";
import { useTheme } from "../../hooks";
import { AppThemeColors } from "../../themes";
import { StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ListPayment } from "./components/ListPayment";
import { AppHeader } from "../../Components/header/AppHeader";

const DetailPaymentScreen = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const paymentInfo = route.params as { paymentInfo: Bill[], name: string };
  return <AppScreenContainer>
    <AppHeader
      showBackButton
      title={paymentInfo.name}
    />
    <View style={{padding:16,gap:16}}>
      <ListPayment
        isPayment
        paymentInfo={paymentInfo.paymentInfo.filter(paymentInfo => paymentInfo.isPayment)} />
      <ListPayment
        isPayment={false}
        paymentInfo={paymentInfo.paymentInfo.filter(paymentInfo => !paymentInfo.isPayment)} />
    </View>
  </AppScreenContainer>;
};

const useStyles = (colors: AppThemeColors) => StyleSheet.create({});
export default DetailPaymentScreen;

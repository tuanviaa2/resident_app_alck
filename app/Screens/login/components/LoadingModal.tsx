import React, {} from "react";
import { Modal, StyleSheet, View } from "react-native";
import { useAppSelector } from "../../../Redux/store";
import LottieView from "lottie-react-native";
import { Animations } from "../../../Assets/animations";
import { AppThemeColors } from "../../../themes";

const LoadingModal = () => {
  const { isLoading } = useAppSelector(state => state.root.app);
  return <Modal
    transparent
    animationType={"fade"}
    visible={isLoading}
    style={{ flex: 1 }}>

    <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <LottieView
        autoPlay
        loop
        style={{ flex: 1 }}
        source={Animations.loading} />
    </View>
  </Modal>;
};

const useStyles = (colors: AppThemeColors) => StyleSheet.create({});
export default LoadingModal;

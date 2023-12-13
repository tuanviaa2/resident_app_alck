import { AppScreenContainer } from "../../layout";
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../../hooks";
import { AppThemeColors } from "../../themes";
import React, { useState } from "react";
import { AppTextInput } from "../text_input/AppTextInput";
import { AppHeader } from "../../Components/header/AppHeader";
import { useAppSelector } from "../../Redux/store";
import { AppButton } from "../../Components/button/AppButton";
import ChangePassModal from "../../Components/modal/ChangePassModal";
import { ResidentInfo } from "../../global";

const ProfileScreen = () => {
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const { colors } = useTheme();
  const { user } = useAppSelector(state => {
    return state.root.user;
  }) as { user: ResidentInfo };
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const styles = useStyles(colors);
  return <AppScreenContainer>
    <AppHeader
      showBackButton
      title={"Thông tin cá nhân"} />
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom:150
        }}
        style={styles.container}>
        <Image
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            alignSelf: "center"
          }}
          source={{
            uri: user.portrait_url  ? user.portrait_url : "https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_9.jpg"
          }}
        />
        <AppTextInput
          disable
          modalTextInput={!isEditMode}
          value={user?.fullName}
          label={"Họ và tên"} />
        <AppTextInput
          disable
          modalTextInput={!isEditMode}
          value={user?.phone_number}
          placeHolder={"Nhập số điện thoại của bạn..."}
          label={"Sô điện thoại"} />
        <AppTextInput
          disable
          modalTextInput={!isEditMode}
          value={user?.email}
          label={"Email"} />
        <AppTextInput
          disable
          modalTextInput={!isEditMode}
          value={user?.permanent_address}
          placeHolder={"Nhập địa chỉ"}
          label={"Địa chỉ thường trụ"} />
        <AppTextInput
          multiline
          disable
          modalTextInput={!isEditMode}
          value={user.personal_identification_number}
          label={"Số chứng minh nhân dân"} />
        <AppButton label={"Đổi mật khẩu"} onPress={() => {
          setShowPasswordModal(true)
        }}/>
      </ScrollView>

      <ChangePassModal visible={showPasswordModal} hide={()=>{
        setShowPasswordModal(false)
      }}/>
    </KeyboardAvoidingView>
  </AppScreenContainer>;
};
const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});
export default ProfileScreen;

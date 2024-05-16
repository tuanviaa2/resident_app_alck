import { AppScreenContainer } from "../../layout";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../hooks";
import { AppThemeColors } from "../../themes";
import React, { useEffect, useState } from "react";
import { AppHeader } from "../../Components/header/AppHeader";
import { Appbar } from "react-native-paper";
import { FeedBackModal } from "../../Components/modal/FeedBack";
import { Notification, ResidentInfo } from "../../global";
import { formatDDMMYY } from "../../Utils/stringFormatter";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axiosInstance from "../../Utils/AxiosInstance";
import { useAppDispatch, useAppSelector } from "../../Redux/store";
import { updateNoti } from "../../Redux/slices/user.slice";
/**
  Khi chạy app 
  -> lấy thông báo của người dùng đang đăng nhập từ sever ( ở màn home)
  -> đếm sl tb chưa đọc 
  -> bấm vào icon tb thì mở mh tb và danh sách các thông báo
  -> bấm vào item trong list sẽ đánh dấu tb đó là đọc rồi ở local trước rồi gửi lên sever sau
 */
const NotiScreen = () => {
  const { user } = useAppSelector(state => {
    return state.root.user;
  }) as { user: ResidentInfo };
  const [showModal, setShowModal] = useState<boolean>(false);
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  // khi bấm vào sẽ đánh dấu thông báo đó là đã đọc rồi 
  const readNoti = (id: string) => {
   //gửi thông báo đến redux sửa dữ liệu và đánh dấu đã đọc ở local
    dispatch(updateNoti(id));
    // gửi lên sever đánh dấu thông báo là đã đọc rồi
    axiosInstance().put("/user/readNoti/" + user.personal_identification_number, { notiId: id });
  };
  const styles = useStyles(colors);
  return <AppScreenContainer>
    <AppHeader
      showBackButton
      title={"Thông báo "}
      action={<Appbar.Action
        onPress={() => {
          setShowModal(true);
        }}
        icon={"message-alert"}
        color={colors.textOnPrimary}
      />} />
    <ScrollView contentContainerStyle={{ padding: 16, flex: 1 }}>
      {
        user.notifications.map((item, index) => {
          return <TouchableOpacity onPress={() => {
            readNoti(item._id);
          }} style={styles.notiContainer}>
            <FontAwesomeIcon
              color={colors.primary}
              size={24}
              icon={faBell} />
            <View style={{ flex: 1 }}>
              {
                !item.isReading && <View style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "green",
                  borderRadius: 4,
                  alignSelf: "flex-end"
                }} />
              }
              <Text style={styles.text}>
                {item.content}
              </Text>
              <Text style={{
                ...styles.text,
                width: "100%",
                textAlign: "right",
                fontWeight: "normal",
                fontSize: 14
              }}>
                {formatDDMMYY(item.time)}
              </Text>
            </View>
          </TouchableOpacity>;
        })
      }
      {
        !user.notifications.length &&
        <Text style={{ color: colors.text, fontSize: 18 }}>Bạn không có thông báo mới </Text>
      }
    </ScrollView>
    <FeedBackModal
      visible={showModal}
      hideModal={() => setShowModal(false)} />
  </AppScreenContainer>;
};
const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  notiContainer: {
    height: 70,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: colors.itemBackground,
    marginTop: 8,
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    minHeight: 80
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.text
  }
});
export default NotiScreen;


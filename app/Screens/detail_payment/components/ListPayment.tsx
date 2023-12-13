import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../hooks";
import { AppThemeColors } from "../../../themes";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { formatCurrencyVietnamese } from "../../../Utils/stringFormatter";
import { Bill } from "../../../global";

type ListPaymentProps = {
  paymentInfo: Bill[],
  isPayment: boolean,
}
export const ListPayment = ({ paymentInfo, isPayment }: ListPaymentProps) => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const [isHide, setHide] = useState<boolean>(isPayment || false);
  return <View style={styles.container}>
    <TouchableOpacity
      style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
      onPress={() => setHide(!isHide)}>
      <Text style={styles.title}>
        {isPayment
          ? "Đã thanh toán"
          : "Chưa thanh toán"
        }</Text>
      <FontAwesomeIcon
        color={colors.text}
        icon={isHide ? faCaretDown : faCaretUp} />
    </TouchableOpacity>
    {!isHide && <ScrollView>
      {paymentInfo.map((payment) => {
        return <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
          key={payment.name}>
          <View>
            <Text style={styles.billTitle}>{payment.name}</Text>
            <Text style={styles.moneyText}>
              {formatCurrencyVietnamese(payment.amount)}
            </Text>
          </View>
        </View>;
      })}
    </ScrollView>}
  </View>;
};
const useStyles = (colors: AppThemeColors) => StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 17,
    color: colors.text
  },
  container: {
    gap: 8
  },
  billTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: colors.primary
  },
  moneyText: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.text
  }
});

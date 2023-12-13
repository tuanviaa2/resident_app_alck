import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { Alert, ScrollView } from "react-native";
import { object, string } from "yup";
import { useAppDispatch, useAppSelector } from "../../../Redux/store";
import { login } from "../../../Redux/actions/user.action";
import { AppTextInput } from "../../text_input/AppTextInput";
import { AppButton } from "../../../Components/button/AppButton";
import { ResidentInfo } from "../../../global";

type LoginFormType = {
  userName: string,
  password: string
}
export const FormLogin = () => {
  const appDispatch = useAppDispatch();
  let loginValidateSchema = object({
    userName: string().required("Vui lòng điền tài khoản"),
    password: string().required("Vui lòng điền mật khẩu")
  });
  const initialLoginForm: LoginFormType = {
    password: "",
    userName: ""
  };
  const { user } = useAppSelector(state => {
    return state.root.user;
  }) as { user: ResidentInfo };
  const navigation = useNavigation();
  return <Formik
    validationSchema={loginValidateSchema}
    initialValues={initialLoginForm}
    onSubmit={(values) => {
      const { userName, password } = values;
      appDispatch(login({ userName, password }))
        .then((res:any)=>{
        if(!res.error){
          navigation.reset({
            index: 0,
            routes: [{ name: "AppStack" } as never]
          });
        }
      });
    }}>
    {({ handleChange, handleSubmit, values }) => (
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"always"}
        style={{ gap: 30 }}>
        <AppTextInput
          nameValidate={"userName"}
          placeHolder={"Nhập tài khoản của bạn"}
          label={"Tài khoản"}
          value={values.userName}
          onTextChange={handleChange("userName")} />
        <AppTextInput
          nameValidate={"password"}
          password
          placeHolder={"Nhập mật khẩu của bạn"}
          label={"Mật khẩu"}
          value={values.password}
          onTextChange={handleChange("password")} />
        <AppButton label={"Đăng nhập"} onPress={handleSubmit} />
      </ScrollView>)}
  </Formik>;
};


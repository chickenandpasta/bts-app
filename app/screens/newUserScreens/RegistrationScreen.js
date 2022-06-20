import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import {
  View,
  StyleSheet,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

const { height } = Dimensions.get("window");

import colors from "../../config/colors";
import routes from "../../routes";
import ButtonPrimary from "../../components/ButtonPrimary";
import InputText from "../../components/InputText";
import RegisterAPI from "../../api/RegisterAPI";
import Subtitle from "../../components/Subtitle";
import TitleText from "../../components/TitleText";

const validationSchemaRegister = yup.object().shape({
  cardId: yup.string().required().label("Card ID"),
  nickname: yup.string().required().max(14).label("Nickname"),
  password: yup.string().required().min(8).label("Password"),
});

function RegistrationScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Formik
      initialValues={{ cardId: "", nickname: "", password: "" }}
      onSubmit={(values) => RegisterAPI(values, navigation, setIsLoading)}
      validationSchema={validationSchemaRegister}
    >
      {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
        <>
          <StatusBar
            backgroundColor={colors.darkWhite}
            barStyle="light-content"
          />

          <ScrollView style={styles.background}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../../assets/registration.png")}
              />
            </View>
            <View style={styles.details}>
              <TitleText marginTop={20}>Registration</TitleText>
              <InputText
                onChangeText={handleChange("cardId")}
                onBlur={() => setFieldTouched("cardId")}
                keyboardType={"number-pad"}
              >
                Card ID
                <Text style={styles.asterisk}>*</Text>
              </InputText>

              <Text style={styles.asterisk}>
                *
                <Subtitle fontSize={12} color={colors.black}>
                  Four digits found at the back of your BTS card
                </Subtitle>
              </Text>
              {touched.cardId && errors.cardId ? (
                <Text style={styles.errorText}>{errors.cardId}</Text>
              ) : (
                <></>
              )}
              <InputText
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                inputType="password"
              >
                Password
              </InputText>
              {touched.password && errors.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : (
                <></>
              )}
              <InputText
                onChangeText={handleChange("nickname")}
                onBlur={() => setFieldTouched("nickname")}
              >
                Nickname
              </InputText>
              {touched.nickname && errors.nickname ? (
                <Text style={styles.errorText}>{errors.nickname}</Text>
              ) : (
                <></>
              )}
              <ButtonPrimary
                marginTop={40}
                onPress={handleSubmit}
                title="Sign up"
                isLoading={isLoading}
              />
              <Subtitle fontSize={12} marginTop={5}>
                Already have an account?
              </Subtitle>
              <TouchableOpacity>
                <Text
                  style={styles.buttonSmall}
                  onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
                >
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  asterisk: {
    color: colors.primary,
    fontFamily: "Roboto",
    fontSize: 18,
  },
  background: {
    backgroundColor: colors.white,
    height,
  },
  bottomGap: {
    backgroundColor: "yellow",
    height: 50,
    width: 10,
  },
  buttonSmall: {
    color: colors.primary,
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  errorText: {
    color: colors.primary,
    fontFamily: "Roboto",
    fontSize: 12,
  },
  details: {
    alignSelf: "center",
    borderColor: colors.gray,
    borderTopWidth: 2,
    width: "85%",
  },
  header: {
    color: colors.primary,
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
  },
  image: {
    height: 160,
    width: 180,
  },
  imageContainer: {
    alignItems: "center",
    backgroundColor: colors.darkWhite,
    height: height * 0.24,
    justifyContent: "flex-end",
    width: "100%",
    overflow: "hidden",
  },
  title: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 20,
  },
});

export default RegistrationScreen;

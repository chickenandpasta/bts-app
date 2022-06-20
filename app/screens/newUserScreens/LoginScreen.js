import React, { useState, useContext } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import colors from "../../config/colors";
import routes from "../../routes";

import ButtonPrimary from "../../components/ButtonPrimary";
import InputText from "../../components/InputText";
import LoginAPI from "../../api/LoginAPI";
import Subtitle from "../../components/Subtitle";
import TitleText from "../../components/TitleText";
import AuthContext from "../../auth/context";

const { height } = Dimensions.get("window");

const validationSchemaLog = yup.object().shape({
  cardId: yup.string().required().label("Card ID"),
  password: yup.string().required().label("Password"),
});

function LoginScreen({ navigation }) {
  const { setUserCard } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Formik
      initialValues={{ cardId: "", password: "" }}
      onSubmit={(values) => {
        LoginAPI(values, navigation, setUserCard, setIsLoading);
      }}
      validationSchema={validationSchemaLog}
    >
      {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
        <>
          <ScrollView style={styles.background}>
            <StatusBar
              backgroundColor={colors.darkWhite}
              barStyle="light-content"
            />

            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../../assets/login.png")}
              />
            </View>
            <View style={styles.details}>
              <TitleText marginTop={20}>Log in</TitleText>
              <InputText
                onChangeText={handleChange("cardId")}
                onBlur={() => setFieldTouched("cardId")}
                keyboardType={"number-pad"}
              >
                Card ID
              </InputText>
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

              <TouchableOpacity style={styles.forgetContainer}>
                <Text
                  style={styles.buttonSmall}
                  onPress={() =>
                    Alert.alert(
                      "Reset your password",
                      'Send an email to BTSCustomerService@gmail.com. \n\nUse the subject line "RESET PASSWORD REQUEST" and send the following information: \n\nCard ID: \nNickname: \nLast remembered password:'
                    )
                  }
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <ButtonPrimary
                marginTop={60}
                onPress={handleSubmit}
                title="Log in"
                isLoading={isLoading}
              />
              <Subtitle fontSize={12} marginTop={5}>
                Want to register your card?
              </Subtitle>
              <TouchableOpacity>
                <Text
                  style={styles.buttonSmall}
                  onPress={() =>
                    navigation.navigate(routes.REGISTRATION_SCREEN)
                  }
                >
                  Sign up
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
  background: {
    backgroundColor: colors.white,
    flex: 1,
  },
  buttonSmall: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: colors.primary,
    fontFamily: "Roboto",
    fontSize: 12,
  },
  details: {
    width: "85%",
    borderColor: colors.gray,
    borderTopWidth: 2,
    flex: 1,
    alignSelf: "center",
  },
  forgetContainer: {
    alignContent: "flex-end",
    flexDirection: "row-reverse",
    marginTop: 10,
  },
  header: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: colors.primary,
    marginTop: 15,
    fontWeight: "bold",
  },
  image: {
    height: 160,
    width: 180,
  },
  imageContainer: {
    backgroundColor: colors.darkWhite,
    height: height * 0.24,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  title: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default LoginScreen;

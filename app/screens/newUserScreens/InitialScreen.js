import React from "react";
import { Dimensions, View, StyleSheet, StatusBar, Image } from "react-native";

import colors from "../../config/colors";
import routes from "../../routes";
import ButtonPrimary from "../../components/ButtonPrimary";
import Subtitle from "../../components/Subtitle";
import TitleText from "../../components/TitleText";

const { width } = Dimensions.get("window");

function InitialScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <StatusBar backgroundColor={colors.white} />
      <View style={styles.safeArea}>
        <Image
          style={styles.image}
          source={require("../../assets/initial-bts.png")}
        />
        <View style={styles.body}>
          <TitleText lineHeight={40}>
            Ride with BTS for hassle-free trips
          </TitleText>
          <Subtitle margin={10}>
            Make your travels easier by paying cashless for your distance-based
            fares.
          </Subtitle>
        </View>
      </View>
      <View style={styles.buttonArea}>
        <View style={styles.buttonContainer}>
          <ButtonPrimary
            title="Sign up"
            width="45%"
            margin={10}
            onPress={() => navigation.navigate(routes.REGISTRATION_SCREEN)}
          />
          <ButtonPrimary
            color="white"
            marginHorizontal={10}
            textColor="primary"
            title="Log in"
            width="45%"
            onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
  },
  body: {
    alignItems: "center",
    marginTop: 20,
  },
  buttonArea: {
    bottom: 20,
    position: "absolute",
    width: "85%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  image: {
    height: "45%",
    width,
    marginTop: 60,
    resizeMode: "contain",
  },
  safeArea: {
    alignItems: "center",
    marginTop: 10,
    width: "85%",
  },
});

export default InitialScreen;

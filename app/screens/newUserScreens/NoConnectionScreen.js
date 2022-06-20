import React from "react";
import { Image, View, StatusBar, StyleSheet } from "react-native";
import { StackActions } from "@react-navigation/native";
import ButtonPrimary from "../../components/ButtonPrimary";
import Subtitle from "../../components/Subtitle";
import colors from "../../config/colors";
import routes from "../../routes";

function NoConnectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={"dark-content"}
        translucent={true}
      />
      <Image
        source={require("../../assets/no-connection.png")}
        style={styles.image}
      />
      <Subtitle marginTop={50} marginBottom={50}>
        Couldn't connect to internet. Please check your network settings.
      </Subtitle>
      <ButtonPrimary
        color="white"
        textColor="primary"
        title="Try Again"
        width="60%"
        onPress={() =>
          navigation.dispatch(StackActions.replace(routes.AUTH_NAVIGATOR))
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: "15%",
  },
  image: {
    height: "30%",
    width: "100%",
  },
});

export default NoConnectionScreen;

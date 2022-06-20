import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../config/colors";

function TitleText({
  children,
  fontSize = 28,
  lineHeight,
  marginTop = 0,
  textAlign = "center",
}) {
  return (
    <Text style={[styles.text, { marginTop, fontSize, textAlign, lineHeight }]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.black,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
});

export default TitleText;

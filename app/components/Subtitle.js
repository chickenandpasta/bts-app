import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../config/colors";

function Subtitle({
  children,
  color = colors.gray,
  fontSize = 18,
  marginBottom,
  marginTop = 26,
  textDecorationLine,
}) {
  return (
    <Text
      style={[
        styles.text,
        { fontSize, marginTop, marginBottom, color, textDecorationLine },
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto",
    lineHeight: 25,
    textAlign: "center",
  },
});

export default Subtitle;

import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";

function ButtonPrimary({
  color = "primary",
  isLoading = false,
  marginHorizontal,
  marginTop,
  onPress,
  textColor = "white",
  title,
  width = "100%",
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: colors[color],
          marginHorizontal,
          marginTop,
          width: width,
        },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={[styles.text, { color: colors[textColor] }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    padding: 13,
    textTransform: "capitalize",
    width: "100%",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ButtonPrimary;

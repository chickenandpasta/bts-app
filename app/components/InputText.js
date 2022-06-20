import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import colors from "../config/colors";

function RegularInput({ children, keyboardType, onChangeText, onBlur }) {
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
      <TextInput
        keyboardType={keyboardType}
        onBlur={onBlur}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

function PasswordInput({ children, onChangeText, onBlur, keyboardType }) {
  let [showPassword, setShowPassword] = useState(true);
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          keyboardType={keyboardType}
          onBlur={onBlur}
          onChangeText={onChangeText}
          secureTextEntry={showPassword}
          style={styles.input}
        />
        <TouchableWithoutFeedback
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color={colors.gray}
            style={styles.icon}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

function InputText({
  children,
  inputType = "regular",
  keyboardType,
  onBlur,
  onChangeText,
}) {
  return (
    <>
      {inputType == "password" ? (
        <PasswordInput
          children={children}
          onBlur={onBlur}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      ) : (
        <RegularInput
          children={children}
          onBlur={onBlur}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
  },
  input: {
    backgroundColor: colors.lightGray,
    color: colors.black,
    flex: 1,
    fontFamily: "Roboto",
    fontSize: 14,
    marginTop: 5,
    padding: 5,
  },
  passwordContainer: {
    alignItems: "center",
    backgroundColor: colors.lightGray,
    flexDirection: "row",
    marginTop: 5,
  },
  text: {
    color: colors.black,
    fontFamily: "Roboto",
    fontSize: 16,
    marginTop: 5,
  },
});

export default InputText;

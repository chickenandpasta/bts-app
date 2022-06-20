import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../config/colors";

function ListItem({ type, detail, amount, date }) {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.details}>
          <Text style={styles.title}>
            {type == "OUT" ? "Fare payment" : "Card Reload"}
          </Text>
          <Text style={styles.subtitle}>{detail}</Text>
          {date ? <Text style={styles.subtitle}>{date}</Text> : <></>}
        </View>
        <View style={styles.price}>
          <Text
            style={[
              styles.priceText,
              { color: type === "CASH IN" ? colors.green : colors.black },
            ]}
          >
            {"PHP " + amount}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  main: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 2,
    marginVertical: 10,
    paddingBottom: 10,
  },
  price: {
    position: "absolute",
    right: 0,
  },
  priceText: {
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    color: colors.black,
    fontFamily: "Roboto",
    fontSize: 16,
  },

  subtitle: {
    color: colors.gray,
    fontFamily: "Roboto",
    fontSize: 12,
  },
});

export default ListItem;

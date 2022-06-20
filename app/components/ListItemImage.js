import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../config/colors";

function ListItemImage({ date, distance, plateNumber, amount }) {
  return (
    <View style={styles.main}>
      <Image source={require("../assets/bus-icon.png")} style={styles.image} />
      <View>
        <Text style={styles.title}>{plateNumber}</Text>
        <Text style={styles.subtitle}>{"Travelled " + distance + "km"}</Text>
        <Text style={styles.subtitleBold}>{date}</Text>
      </View>
      <View style={styles.price}>
        <Text style={styles.priceText}>{"PHP " + amount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 45,
    marginRight: 10,
    width: 45,
  },
  main: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
    width: "100%",
  },
  price: {
    position: "absolute",
    right: 0,
  },
  priceText: {
    color: colors.black,
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    color: colors.black,
    fontFamily: "Roboto",
    fontSize: 14,
  },
  subtitle: {
    color: colors.gray,
    fontFamily: "Roboto",
    fontSize: 11,
  },
  subtitleBold: {
    color: colors.gray,
    fontFamily: "Roboto",
    fontSize: 11,
    fontWeight: "bold",
  },
});

export default ListItemImage;

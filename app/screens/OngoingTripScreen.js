import React, { useState, useEffect, useContext } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

import AuthContext from "../auth/context";
import colors from "../config/colors";
import TitleText from "../components/TitleText";
import OngoingAPI from "../api/OngoingAPI";

function BackButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.buttonCircle} onPress={onPress}>
      <Ionicons name="md-chevron-back" size={20} color={colors.black} />
    </TouchableOpacity>
  );
}

function OngoingTripScreen({ navigation }) {
  const { userCard } = useContext(AuthContext);
  const [isLoading, setLoading] = useState([]);
  const [ongoingInfo, setOngoingInfo] = useState([]);

  //call api to get onging trip information
  useEffect(() => {
    OngoingAPI(userCard, setLoading, setOngoingInfo);
  }, []);

  return (
    <View style={styles.main}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={"dark-content"}
        translucent={true}
      />
      <View style={styles.imageContainer}>
        <Image source={require("../assets/subway.png")} style={styles.image} />
      </View>
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.details}>
        <TitleText>Ongoing Trip</TitleText>
        <View style={styles.plateNumberContainer}>
          <Text style={styles.plateNumber}>
            {isLoading ? (
              <ActivityIndicator color={colors.gray} />
            ) : (
              ongoingInfo[0].plate_number
            )}
          </Text>
          <Text style={styles.plateNumberTitle}>PLATE NUMBER</Text>
        </View>
        <Image
          source={require("../assets/bus-icon-blue.png")}
          style={styles.iconBus}
        />
        <Text style={styles.busText}>Tapped in at</Text>
        <Text style={styles.busText}>
          {isLoading ? "" : ongoingInfo[0].trans_date}
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tap your BTS card on the bus reader to complete the trip
        </Text>
        <View style={styles.fareContainer}>
          <Text style={styles.fareText}>Base Fare: PHP 13.00</Text>
          <Text style={styles.fareText}>Fare per km: PHP 2.20</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  busText: {
    color: colors.black,
    fontFamily: "Roboto",
    fontSize: 14,
    marginTop: 5,
  },
  buttonCircle: {
    alignItems: "center",
    backgroundColor: colors.lightest,
    borderRadius: 15,
    elevation: 5,
    height: 30,
    justifyContent: "center",
    left: 20,
    position: "absolute",
    top: StatusBar.currentHeight + 10,
    width: 30,
  },
  details: {
    alignItems: "center",
    borderBottomColor: colors.lessGray,
    borderBottomWidth: 1,
    marginTop: 20,
    paddingBottom: 30,
    width: "85%",
  },
  fareContainer: {
    backgroundColor: colors.blue,
    flexDirection: "row",
    height: 60,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 5,
    width: "100%",
  },
  fareText: {
    color: colors.white,
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    bottom: 0,
    position: "absolute",
    width,
  },
  footerText: {
    color: colors.gray,
    fontFamily: "Roboto",
    fontSize: 12,
    marginBottom: 5,
  },
  iconBus: {
    height: 20,
    width: 20,
  },
  image: {
    height: "85%",
    width: "100%",
  },
  imageContainer: {
    backgroundColor: "#F2F2F2",
    height: "35%",
    justifyContent: "flex-end",
    width,
  },
  main: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
    width,
  },
  plateNumber: {
    color: colors.gray,
    fontFamily: "Roboto",
    fontSize: 40,
    fontWeight: "bold",
  },
  plateNumberContainer: {
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 18,
    marginVertical: 30,
    padding: 15,
    paddingHorizontal: 40,
  },
  plateNumberTitle: {
    color: colors.lessGray,
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OngoingTripScreen;

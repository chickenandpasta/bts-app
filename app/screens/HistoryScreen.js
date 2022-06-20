import React, { useContext } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AuthContext from "../auth/context";
import colors from "../config/colors";
import routes from "../routes";
import TitleText from "../components/TitleText";
import ListItemImage from "../components/ListItemImage";

const { width, height } = Dimensions.get("window");

function NoData() {
  return (
    <View style={styles.noData}>
      <Image source={require("../assets/no-data.png")} style={styles.image} />
      <Text style={styles.subtitle}>No trips completed</Text>
    </View>
  );
}

function CompletedTrips({ transactions }) {
  return transactions.filter((item) => item.tap_type != "CASH IN").length >
    0 ? (
    <View style={styles.completedContainer}>
      <Text style={styles.headerSmall}>Completed Trips</Text>
      {transactions

        .filter((item) => item.tap_type != "CASH IN")
        .map((item) => (
          <ListItemImage
            key={item.trans_id}
            date={item.trans_date}
            distance={item.distance_travelled}
            plateNumber={item.plate_number}
            amount={item.amount}
          />
        ))}
    </View>
  ) : (
    <NoData />
  );
}

function HistoryScreen({ navigation }) {
  const { userInfo, transactions } = useContext(AuthContext);

  return (
    <ScrollView style={styles.wholeScreen}>
      <View style={styles.main}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="md-chevron-back" size={30} color={colors.black} />
          </TouchableOpacity>
          <TitleText fontSize={22} marginTop={StatusBar.currentHeight}>
            Trip History
          </TitleText>
        </View>

        <View style={styles.contentArea}>
          {userInfo[0].tap_type === "IN" ? (
            <TouchableOpacity
              style={styles.ongoingContainer}
              onPress={() => navigation.navigate(routes.ONGOING_TRIP_SCREEN)}
            >
              <Text style={styles.headerSmall}>Ongoing</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}

          <View style={styles.historyContainer}></View>
          {transactions[0] === "0" ? (
            <NoData />
          ) : (
            <CompletedTrips transactions={transactions} />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentArea: {
    paddingHorizontal: 25,
    width,
  },
  icon: {
    bottom: 10,
    left: 10,
    position: "absolute",
  },
  image: {
    height: "50%",
    resizeMode: "contain",
    width: "60%",
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.lightest,
    elevation: 1,
    flexDirection: "row",
    height: StatusBar.currentHeight + 50,
    justifyContent: "center",
    width,
  },
  main: {
    alignItems: "center",
    backgroundColor: colors.darkWhite,
    width: "100%",
  },
  noData: {
    alignItems: "center",
    height: height * 0.6,
    justifyContent: "center",
  },
  headerSmall: {
    color: colors.black,
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 15,
  },
  ongoingContainer: {
    borderBottomColor: "#C1C1C1",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  subtitle: {
    color: colors.gray,
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  wholeScreen: {
    backgroundColor: colors.darkWhite,
  },
});

export default HistoryScreen;

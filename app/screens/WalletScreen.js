import React, { useContext } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import colors from "../config/colors";
import ListItem from "../components/ListItem";
import Subtitle from "../components/Subtitle";
import TitleText from "../components/TitleText";

import AuthContext from "../auth/context";

const { width, height } = Dimensions.get("window");

function ActivityCard({ transactions }) {
  return (
    <View style={styles.activityContainer}>
      <TitleText textAlign="left" fontSize={20} marginTop={25}>
        Activities
      </TitleText>
      <View style={styles.listContainer}>
        {transactions[0] === "0" ? (
          <Subtitle fontSize={16} marginBottom={26}>
            You have no completed trips.
          </Subtitle>
        ) : (
          transactions.map((item) => (
            <ListItem
              key={item.trans_id}
              type={item.tap_type}
              detail={item.plate_number}
              amount={item.amount}
              date={item.trans_date}
            />
          ))
        )}
      </View>
    </View>
  );
}

function WalletScreen(props) {
  const { userInfo, transactions } = useContext(AuthContext);

  return (
    <ScrollView style={styles.wholeScreen}>
      <View style={styles.main}>
        <View style={styles.walletContainer}>
          <Text style={styles.walletTitle}>Wallet</Text>
          <Text style={styles.walletBalance}>
            {"₱" + userInfo[0].newBalance + ".00"}
          </Text>
          <Text style={styles.walletSubtitle}>balance remaining on card</Text>
        </View>
        <View style={styles.backgroundWhite}>
          <View style={styles.square} />
          <ActivityCard transactions={transactions} />
          <View style={styles.square} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  activityContainer: {
    alignItems: "center",
    backgroundColor: colors.lightest,
    elevation: 1,
    minHeight: height * 0.71, //fixed height of activities card
    paddingBottom: 20,
    width: width * 0.85,
  },
  backgroundWhite: {
    backgroundColor: colors.darkWhite,
    flexDirection: "row",
    justifyContent: "center",
    width,
  },
  listContainer: {
    marginTop: 10,
    width: "85%",
  },
  main: {
    alignItems: "center",
    backgroundColor: colors.darkWhite,
    flex: 1,
  },
  square: {
    backgroundColor: colors.primary,
    flex: 1,
    height: 20,
    width: 10,
  },
  walletBalance: {
    color: colors.white,
    fontFamily: "Roboto",
    fontSize: 45,
    marginBottom: 10,
  },
  walletContainer: {
    alignItems: "center",
    backgroundColor: colors.primary,
    height: height * 0.3,
    width,
  },
  walletTitle: {
    color: colors.white,
    fontFamily: "Roboto",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: StatusBar.currentHeight + 20,
  },
  walletSubtitle: {
    color: colors.white,
    fontFamily: "Roboto",
    fontSize: 14,
    marginBottom: 10,
  },
  wholeScreen: {
    backgroundColor: colors.darkWhite,
  },
});

export default WalletScreen;

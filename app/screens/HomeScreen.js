import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";

import colors from "../config/colors";
import routes from "../routes";

import AuthContext from "../auth/context";
import ListItem from "../components/ListItem";
import Subtitle from "../components/Subtitle";
import TitleText from "../components/TitleText";
import TransactionAPI from "../api/TransactionAPI";
import UserInfoAPI from "../api/UserInfoAPI";

const { width, height } = Dimensions.get("window");

function BalanceCard({ info, isUserLoading, onPress }) {
  return (
    <TouchableOpacity style={styles.balanceCard} onPress={onPress}>
      <View style={styles.circle}>
        <Image
          source={require("../assets/card.png")}
          style={styles.cardImage}
        ></Image>
      </View>
      <View>
        {isUserLoading ? (
          <ActivityIndicator color={colors.gray} />
        ) : (
          <Text style={styles.balanceText}>
            {"₱" + info[0].newBalance + ".00"}
          </Text>
        )}

        <Text style={styles.subText}>Balance</Text>
      </View>
    </TouchableOpacity>
  );
}

function InfoCard() {
  return (
    <TouchableOpacity
      style={styles.infoContainer}
      onPress={() =>
        Alert.alert(
          "Friendly Reminder",
          "The minimum balance is Php 50.00 to enter a BTS bus. Make sure to keep at least that amount to avoid inconvenience. \n\nYou can reload your card at designated loading stations or inside the bus upon boarding."
        )
      }
    >
      <Ionicons
        name={"information-circle-outline"}
        size={20}
        color={colors.white}
      />
      <Text style={styles.infoText}>
        Maintain a balance of at least Php 50.00
      </Text>
    </TouchableOpacity>
  );
}

function LogOut(navigation, setUserCard) {
  setUserCard(null);
  navigation.dispatch(StackActions.replace(routes.AUTH_NAVIGATOR));
}

function OngoingCard({ onPress, tap_type }) {
  return tap_type === "IN" ? (
    <TouchableOpacity style={styles.ongoingContainer} onPress={onPress}>
      <Image
        source={require("../assets/ongoing-trip-card.png")}
        style={styles.ongoingImage}
      ></Image>
      <View style={styles.ongoingDetails}>
        <Text style={styles.ongoingTitle}>You are currently on the bus!</Text>
        <Text style={styles.ongoingSubtitle}>Click to see trip details</Text>
      </View>
    </TouchableOpacity>
  ) : (
    <></>
  );
}

function RecentActivityCard({ onPress, data }) {
  return (
    <View style={styles.recentContainer}>
      <View style={styles.recentArea}>
        <TitleText textAlign="left" fontSize={20} marginTop={5}>
          Recent Activity
        </TitleText>
        {data === "0" ? (
          <Subtitle fontSize={16} marginBottom={26}>
            You have no recent trips :(
          </Subtitle>
        ) : (
          data
            .slice(0, 5)
            .map((item) => (
              <ListItem
                key={item.trans_id}
                type={item.tap_type}
                detail={item.plate_number}
                amount={item.amount}
              />
            ))
        )}

        <TouchableOpacity onPress={onPress}>
          <Text style={styles.showButton}>Show All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/*
transaction[]
-trans_id
-trans_date
-card_id
-tap_type
-distance_travelled
-amount
-plate_number

userInfo[]
-card_id
-nickname
-discount
-newBalance
-tap_type

*/

const LogOutButton = (navigation, setUserCard) =>
  Alert.alert(
    "Log out",
    "Are you sure you want to log out of this card?",
    [
      {
        text: "Cancel",
      },
      {
        text: "Log out",
        onPress: () => LogOut(navigation, setUserCard),
      },
    ],
    {
      cancelable: true,
    }
  );

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

//main function
function HomeScreen({ navigation }) {
  const {
    userCard,
    setUserCard,
    transactions,
    setTransactions,
    userInfo,
    setUserInfo,
  } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [isUserLoading, setUserLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    wait(2000)
      .catch((error) => {
        Alert.alert("Error", error);
      })
      .finally(() => setRefreshing(false));
  }, []);

  function fetchData() {
    setUserLoading(true);
    setLoading(true);
    UserInfoAPI(userCard, setUserLoading, setUserInfo, navigation);
    TransactionAPI(userCard, setLoading, setTransactions, transactions);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      style={styles.wholeScreen}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.main}>
        <TitleText marginTop={StatusBar.currentHeight + 20}>
          Hello, {isUserLoading ? <></> : userInfo[0].nickname}
        </TitleText>

        <View style={styles.viewContainer}>
          <Subtitle marginTop={5} fontSize={16}>
            Card ID: {isUserLoading ? <></> : userInfo[0].card_id}
            {!isUserLoading && userInfo[0].discount === "YES"
              ? " (Discounted)"
              : ""}
          </Subtitle>
          <TouchableOpacity
            onPress={() => LogOutButton(navigation, setUserCard)}
          >
            <Subtitle
              marginTop={5}
              fontSize={12}
              textDecorationLine={"underline"}
            >
              Log out
            </Subtitle>
          </TouchableOpacity>
        </View>

        <InfoCard />

        <BalanceCard
          info={userInfo}
          isUserLoading={isUserLoading}
          onPress={() => navigation.navigate(routes.WALLET_SCREEN)}
        />

        {isUserLoading ? (
          <></>
        ) : (
          <OngoingCard
            onPress={() => navigation.navigate(routes.ONGOING_TRIP_SCREEN)}
            tap_type={userInfo[0].tap_type}
          />
        )}

        {isLoading ? (
          <ActivityIndicator size={"large"} color={colors.primary} />
        ) : (
          <RecentActivityCard
            data={transactions}
            onPress={() => navigation.navigate(routes.HISTORY_NAVIGATOR)}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    alignItems: "center",
    backgroundColor: colors.lightest,
    borderRadius: 16,
    elevation: 2,
    flexDirection: "row",
    height: 90,
    marginBottom: 20,
    marginTop: 20,
    width: "85%",
  },
  balanceText: {
    color: colors.black,
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "bold",
  },
  cardImage: {
    minHeight: 35,
    resizeMode: "contain",
    width: 35,
  },
  circle: {
    alignItems: "center",
    backgroundColor: "#F8E7E6", //light pink
    borderRadius: 30,
    height: 60,
    justifyContent: "center",
    marginHorizontal: 20,
    width: 60,
  },
  infoContainer: {
    alignItems: "center",
    backgroundColor: colors.blue,
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    width: "85%",
  },
  infoText: {
    color: colors.white,
    fontFamily: "Roboto",
    fontSize: 13,
    marginHorizontal: 5,
  },
  main: {
    alignItems: "center",
    backgroundColor: colors.darkWhite,
    flex: 1,
  },
  ongoingContainer: {
    borderRadius: 20,
    elevation: 2,
    justifyContent: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  ongoingDetails: {
    height: "80%",
    position: "absolute",
    right: 20,
    width: "38%",
  },
  ongoingImage: {
    height: height * 0.22,
    width: width * 0.85,
  },
  ongoingSubtitle: {
    bottom: 0,
    color: colors.white,
    fontFamily: "Roboto",
    fontSize: 10,
    position: "absolute",
    right: 0,
  },
  ongoingTitle: {
    color: colors.white,
    fontFamily: "Roboto",
    fontSize: 18,
    fontWeight: "bold",
  },
  recentContainer: {
    alignItems: "center",
    backgroundColor: colors.lightest,
    elevation: 2,
    marginBottom: 20,
    //marginTop: 20,
    paddingVertical: 15,
    width: "100%",
  },
  recentArea: {
    width: "85%",
  },
  showButton: {
    alignSelf: "center",
    color: colors.blue,
    fontFamily: "Roboto",
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
  },
  subText: {
    color: colors.black,
    fontFamily: "Roboto",
    fontSize: 14,
  },
  viewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "85%",
  },
  wholeScreen: {
    backgroundColor: colors.darkWhite,
  },
});

export default HomeScreen;

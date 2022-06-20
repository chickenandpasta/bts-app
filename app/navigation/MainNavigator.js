import React from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "react-native";

import colors from "../config/colors";
import routes from "../routes";

//screens
import HomeNavigator from "./HomeNavigator";
import WalletScreen from "../screens/WalletScreen";
import HistoryNavigator from "./HistoryNavigator";

//screen names
const homeName = routes.HOME_NAVIGATOR;
const walletName = routes.WALLET_SCREEN;
const historyName = routes.HISTORY_NAVIGATOR;

const Tab = createBottomTabNavigator();

function MainNavigator(props) {
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={"dark-content"}
        translucent={true}
      />
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.primary,
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === walletName) {
              iconName = focused ? "wallet" : "wallet-outline";
            } else if (rn === historyName) {
              iconName = focused ? "list" : "list-outline";
            }

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={(color = focused ? colors.primary : colors.gray)}
                paddingBottom={10}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name={homeName}
          component={HomeNavigator}
          options={({ route }) => ({
            tabBarStyle: {
              display: ((route) => {
                const routeName = getFocusedRouteNameFromRoute(route) ?? "";

                if (routeName === routes.ONGOING_TRIP_SCREEN) {
                  return "none";
                }

                return "flex";
              })(route),
            },
          })}
        />

        <Tab.Screen name={routes.WALLET_SCREEN} component={WalletScreen} />
        <Tab.Screen
          name={historyName}
          component={HistoryNavigator}
          options={({ route }) => ({
            tabBarStyle: {
              display: ((route) => {
                const routeName = getFocusedRouteNameFromRoute(route) ?? "";

                if (routeName === routes.ONGOING_TRIP_SCREEN) {
                  return "none";
                }

                return "flex";
              })(route),
            },
          })}
        />
      </Tab.Navigator>
    </>
  );
}

export default MainNavigator;

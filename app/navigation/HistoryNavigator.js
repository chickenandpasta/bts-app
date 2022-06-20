import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import routes from "../routes";
import History from "../screens/HistoryScreen";
import OngoingTripScreen from "../screens/OngoingTripScreen";

const Stack = createNativeStackNavigator();

const HistoryNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.HISTORY_SCREEN} component={History} />
    <Stack.Screen
      name={routes.ONGOING_TRIP_SCREEN}
      component={OngoingTripScreen}
    />
  </Stack.Navigator>
);

export default HistoryNavigator;

import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import routes from "../routes";
import HomeScreen from "../screens/HomeScreen";
import OngoingTripScreen from "../screens/OngoingTripScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.HOME_SCREEN} component={HomeScreen} />
    <Stack.Screen
      name={routes.ONGOING_TRIP_SCREEN}
      component={OngoingTripScreen}
    />
  </Stack.Navigator>
);

export default HomeNavigator;

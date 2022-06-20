import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import routes from "../routes";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import NoConnectionScreen from "../screens/newUserScreens/NoConnectionScreen";

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.AUTH_NAVIGATOR} component={AuthNavigator} />
    <Stack.Screen name={routes.MAIN_NAVIGATOR} component={MainNavigator} />
    <Stack.Screen
      name={routes.NO_CONNECTION_SCREEN}
      component={NoConnectionScreen}
    />
  </Stack.Navigator>
);

export default RootNavigator;

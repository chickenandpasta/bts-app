import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import routes from "../routes";
import InitialScreen from "../screens/newUserScreens/InitialScreen";
import LoginScreen from "../screens/newUserScreens/LoginScreen";
import RegistrationScreen from "../screens/newUserScreens/RegistrationScreen";
import OnboardingScreen from "../screens/newUserScreens/OnboardingScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.INITIAL_SCREEN} component={InitialScreen} />
    <Stack.Screen
      name={routes.REGISTRATION_SCREEN}
      component={RegistrationScreen}
    />
    <Stack.Screen name={routes.LOGIN_SCREEN} component={LoginScreen} />
    <Stack.Screen
      name={routes.ONBOARDING_SCREEN}
      component={OnboardingScreen}
    />
  </Stack.Navigator>
);

export default AuthNavigator;

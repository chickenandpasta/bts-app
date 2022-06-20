import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "./app/auth/context";
import RootNavigator from "./app/navigation/RootNavigator";

export default function App() {
  const [userCard, setUserCard] = useState();
  const [transactions, setTransactions] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        userCard,
        setUserCard,
        transactions,
        setTransactions,
        userInfo,
        setUserInfo,
      }}
    >
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

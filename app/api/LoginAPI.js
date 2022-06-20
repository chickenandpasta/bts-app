import { Alert } from "react-native";
import { StackActions } from "@react-navigation/native";

import routes from "../routes";

function LoginAPI({ cardId, password }, navigation, setUserCard, setIsLoading) {
  setIsLoading(true);
  const InsertAPIURL = routes.URL_LOGIN;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const Data = {
    cardId,
    password,
  };

  fetch(InsertAPIURL, {
    method: "POST",
    headers,
    body: JSON.stringify(Data),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response[0].Message === "SUCCESS") {
        setUserCard(cardId);
        navigation.dispatch(StackActions.replace(routes.MAIN_NAVIGATOR));
      } else {
        Alert.alert("Oops!", response[0].Message);
        setIsLoading(false); //react cannot update after dispatch
      }
    })
    .catch(() => {
      setIsLoading(false);
      navigation.dispatch(StackActions.replace(routes.NO_CONNECTION_SCREEN));
    });
}

export default LoginAPI;

import { Alert } from "react-native";
import { StackActions } from "@react-navigation/native";
import routes from "../routes";

function RegisterAPI({ cardId, nickname, password }, navigation, setIsLoading) {
  setIsLoading(true);
  const InsertAPIURL = routes.URL_REGISTER;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const Data = {
    cardId,
    nickname,
    password,
  };

  fetch(InsertAPIURL, {
    method: "POST",
    headers,
    body: JSON.stringify(Data),
  })
    .then((response) => response.json())
    .then((response) => {
      //check if credentials are correct
      if (response[0].Message === "SUCCESS") {
        Alert.alert("Card registered successfully");
        navigation.navigate(routes.ONBOARDING_SCREEN);
      } else {
        Alert.alert("Oops!", response[0].Message);
        setIsLoading(false);
      }
    })
    .catch(() => {
      setIsLoading(false);
      navigation.dispatch(StackActions.replace(routes.NO_CONNECTION_SCREEN));
    });
}

export default RegisterAPI;

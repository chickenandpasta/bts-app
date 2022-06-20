import { Alert } from "react-native";

import routes from "../routes";

function UserInfoAPI(cardId, setLoading, setOngoingInfo) {
  const OngoingAPIURL = routes.URL_SEARCH_ONGOING;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const Data = {
    cardId,
  };

  fetch(OngoingAPIURL, {
    method: "POST",
    headers,
    body: JSON.stringify(Data),
  })
    .then((response) => response.json())
    .then((response) => {
      setOngoingInfo(response);
    })
    .catch((error) => {
      Alert.alert("" + error);
    })
    .finally(() => setLoading(false));
}

export default UserInfoAPI;

import { Alert } from "react-native";
import routes from "../routes";

function UserInfoAPI(cardId, setUserLoading, setUserInfo) {
  const SearchUserAPIURL = routes.URL_SEARCH_USER;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const Data = {
    cardId,
  };

  fetch(SearchUserAPIURL, {
    method: "POST",
    headers,
    body: JSON.stringify(Data),
  })
    .then((response) => response.json())
    .then((response) => {
      setUserInfo(response);
    })
    .catch((error) => {
      Alert.alert("" + error);
    })
    .finally(() => setUserLoading(false));
}

export default UserInfoAPI;

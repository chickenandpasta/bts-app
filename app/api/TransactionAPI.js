import { Alert } from "react-native";

import routes from "../routes";

function TransactionAPI(cardId, setLoading, setTransactions, transactions) {
  const SearchAPIURL = routes.URL_SEARCH;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const Data = {
    cardId,
  };

  fetch(SearchAPIURL, {
    method: "POST",
    headers,
    body: JSON.stringify(Data),
  })
    .then((response) => response.json())
    .then((json) => {
      json === "0" ? setTransactions(json) : setTransactions(json.reverse());
    })
    .catch((error) => {
      Alert.alert("" + error);
    })
    .finally(() => setLoading(false));
}

export default TransactionAPI;

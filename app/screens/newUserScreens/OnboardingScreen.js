import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ButtonPrimary from "../../components/ButtonPrimary";
import Subtitle from "../../components/Subtitle";
import colors from "../../config/colors";

import routes from "../../routes";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    imageSrc: require("../../assets/welcome-1.png"),
    title: "Welcome to BTS",
    subtitle:
      "A bus e-ticketing system that only charges you for how far you've travelled.",
  },
  {
    id: "2",
    imageSrc: require("../../assets/welcome-2.png"),
    title: "Pay with BTS card",
    subtitle:
      "Cashless payment of your bus fare by just tapping your card onto the reader.",
  },
  {
    id: "3",
    imageSrc: require("../../assets/welcome-3.png"),
    title: "Monitor your account",
    subtitle:
      "Check your balance and view transaction history using the mobile app.",
  },
];

const Slide = ({ item }) => {
  return (
    <View style={styles.slideContainer}>
      <Image source={item.imageSrc} style={styles.image} />
      <View style={styles.detailsContainer}>
        {item.id == "1" ? (
          <Text style={styles.title}>{item?.title}</Text>
        ) : (
          <Text style={styles.titleSmall}>{item?.title}</Text>
        )}

        <Subtitle>{item?.subtitle}</Subtitle>
      </View>
    </View>
  );
};

function OnboardingScreen({ navigation }) {
  let [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const Footer = () => {
    return (
      <View style={styles.footerContainer}>
        <View style={styles.indidatorContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: colors.primary,
                  width: 25,
                  margin: 10,
                },
              ]}
            />
          ))}
        </View>
        {currentSlideIndex == slides.length - 1 ? (
          <View style={styles.buttonContainer}>
            <ButtonPrimary
              title="Get Started"
              onPress={() => navigation.navigate(routes.LOGIN_SCREEN)}
            />
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar backgroundColor={colors.white} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.75 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 30,
    width: width * 0.85,
  },
  detailsContainer: {
    alignItems: "center",
    width: "85%",
  },
  footerContainer: {
    height: height * 0.28,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  image: {
    height: "45%",
    width: "100%",
    marginTop: 60,
    resizeMode: "contain",
  },
  indicator: {
    backgroundColor: "#a0a0a0",
    borderRadius: 4,
    height: 8,
    marginHorizontal: 3,
    width: 10,
  },
  indidatorContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 40,
    marginTop: 5,
    justifyContent: "center",
  },
  safeArea: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
  },
  slideContainer: {
    alignItems: "center",
    width,
  },
  title: {
    color: colors.black,
    fontFamily: "Roboto",
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 32,
    textAlign: "center",
  },
  titleSmall: {
    color: colors.primary,
    fontFamily: "Roboto",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 42,
    textAlign: "center",
  },
});

export default OnboardingScreen;

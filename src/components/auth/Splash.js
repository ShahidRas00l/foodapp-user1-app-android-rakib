import React, { useEffect } from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getItem } from "../../utilities/async-storage";

// Image
import splashImage from "../../assets/image/splash.png";

const Splash = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      getItem("sign_in_token").then(res => {
        if (res) {
          navigation.navigate("Home");
        } else {
          navigation.navigate("SignIn");
        }
      });
    }, 1000);
  }, []);

  const {
    container,
    splashImageArea,
  } = styles;

  return (
    <View style={container}>
      <ImageBackground style={splashImageArea} source={splashImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D7252C",
  },
  splashImageArea: {
    width: wp("100%"),
    height: hp("100%"),
  },
});


export default Splash;

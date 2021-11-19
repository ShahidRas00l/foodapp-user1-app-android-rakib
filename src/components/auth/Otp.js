import React from "react";
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import globalStyles from "../../styles/globalStyles";
import { Input } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Image
import logoImage from "../../assets/image/logo.png";

const Otp = ({ navigation }) => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={styles.logoImageArea}>
        <Image style={styles.logoImage} source={logoImage} />
      </View>
      <View style={styles.inputArea}>
        <Input
          placeholder="Enter OTP"
          inputContainerStyle={styles.inputField}
          containerStyle={globalStyles.paddingHorizontal0}
          leftIcon={<FontAwesome name="key" size={24} color="black" style={styles.iconStyle} />}
        />
      </View>
      <View style={styles.signInButtonArea}>
        <TouchableOpacity style={styles.signInButton} onPress={() => alert('Need to work')}>
          <Text style={styles.signInText}>Enter OTP</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.haveAccountArea}>
        <Text style={styles.haveAccountText}>Don't have an account?</Text>
        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text style={[styles.haveAccountText, globalStyles.paddingLeft1, globalStyles.textRed]}>
            SIGN UP
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoImageArea: {
    paddingTop: hp("15%"),
    flexDirection: "row",
    justifyContent: "center",
  },
  logoImage: {
    width: wp("70%"),
    height: hp("20%"),
  },
  inputArea: {
    paddingTop: hp("10%"),
  },
  inputField: {
    borderColor: "white",
    backgroundColor: "white",
    elevation: 3,
    paddingVertical: hp("0.2%"),
    paddingHorizontal: wp("3%"),
    borderRadius: 8,
    borderWidth: 1,
  },
  signInButtonArea: {
    flexDirection: "row",
  },
  signInButton: {
    width: wp("90%"),
    backgroundColor: "#D2181B",
    paddingVertical: hp("2%"),
    borderRadius: 8,
  },
  signInText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
  },
  haveAccountArea: {
    paddingVertical: hp("5%"),
    flexDirection: "row",
    justifyContent: "center",
  },
  haveAccountText: {
    color: "#6D6D6D",
    fontSize: 16,
  },
});


export default Otp;

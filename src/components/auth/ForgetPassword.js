import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import globalStyles from "../../styles/globalStyles";
import { Icon, Input } from "react-native-elements";

// Image
import logoImage from "../../assets/image/logo.png";
import { showToastWithGravityAndOffset } from "../../utilities/components/ToastMessage";
import axios from "axios";
import { apiBaseUrl } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgetPassword = ({ navigation }) => {
    const [state, setState] = useState({
        email: "",
    });

    const { email } = state;

    const handleSubmit = async () => {
        if (!email) {
            showToastWithGravityAndOffset("Email field is required!");
            return false;
        }

        try {
            const payload = {
                reciever: email,
                Model: "AdminUser",
            };

            const response = await axios.post(`${apiBaseUrl}superadmin/reset-password`, payload);
            console.log(response.data);

            alert('An E-mail is sent to your account kindly check that to reset your password.');

            /*if (response.data) {
                showToastWithGravityAndOffset("Account Created successfully");

                try {
                    const res = await axios.post(`${apiBaseUrl}admin/login`, payload);
                    console.log(res.data, 60);

                    if (res.data && res.data.token && res.data.user) {
                        await AsyncStorage.setItem("@sign_in_token", res.data.token);
                        await AsyncStorage.setItem("@user", JSON.stringify(res.data.user));

                        setGlobalState({
                            ...globalState, ...{
                                sign_in_token: res.data.token,
                                user: res.data.user,
                            },
                        });
                    }
                } catch (error) {
                    if (error.response.data) {
                        console.log(error.response.data);
                        showToastWithGravityAndOffset(error.response.data.error);
                    }
                }
            }*/
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
                showToastWithGravityAndOffset(error.response.data.error);
            }
        }
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.logoImageArea}>
                <Image style={styles.logoImage} source={logoImage} />
            </View>
            <View style={styles.inputArea}>
                <Input
                    value={email}
                    placeholder="E-mail"
                    inputContainerStyle={styles.inputField}
                    containerStyle={globalStyles.paddingHorizontal0}
                    leftIcon={<Icon type="MaterialIcons" name="email" />}
                    onChangeText={value => setState({ ...state, email: value })}
                />
            </View>
            <View style={styles.signInButtonArea}>
                <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
                    <Text style={styles.signInText}>Send Reset Link</Text>
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


export default ForgetPassword;

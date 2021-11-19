import React, { useContext, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import globalStyles from "../../styles/globalStyles";
import { Icon, Input, SocialIcon } from "react-native-elements";
import Feather from "react-native-vector-icons/Feather";
import axios from "axios";
import { apiBaseUrl } from "../../config";
import { showToastWithGravityAndOffset } from "../../utilities/components/ToastMessage";
import { GlobalContext } from "../../context/GlobalContext";

// Image
import logoImage from "../../assets/image/logo.png";
import gmailIconImage from "../../assets/image/gmail.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = ({ navigation }) => {
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [state, setState] = useState({
        email: "",
        password: "",
    });

    const { email, password } = state;

    const handleSubmit = async () => {
        if (!email) {
            showToastWithGravityAndOffset("Email field is required!");
            return false;
        }

        if (!password) {
            showToastWithGravityAndOffset("Password field is required!");
            return false;
        }

        try {
            const payload = {
                email,
                password,
                type: "user",
            };

            const response = await axios.post(`${apiBaseUrl}admin/create`, payload);
            console.log(response.data.user);

            if (response.data.user) {
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
            }
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
                    placeholder="E-mail"
                    value={email}
                    inputContainerStyle={styles.inputField}
                    containerStyle={globalStyles.paddingHorizontal0}
                    onChangeText={value => setState({ ...state, email: value })}
                    leftIcon={<Icon type="MaterialIcons" name="email" style={styles.iconStyle} />}
                />
                <Input
                    placeholder="Password"
                    value={password}
                    inputContainerStyle={styles.inputField}
                    containerStyle={globalStyles.paddingHorizontal0}
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={value => setState({ ...state, password: value })}
                    rightIcon={<Feather name={isPasswordVisible ? "eye-off" : "eye"}
                                        onPress={() => setIsPasswordVisible(!isPasswordVisible)} size={24}
                                        color="black" />}
                    leftIcon={<Icon type="AntDesign" name="lock" style={styles.iconStyle} />}
                />
            </View>
            <View style={styles.signInButtonArea}>
                <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
                    <Text style={styles.signInText}>Sign up</Text>
                </TouchableOpacity>
            </View>
            {/*<View style={styles.connectWithTextArea}>
                <Text style={styles.connectWithText}>Or Connect with</Text>
            </View>*/}
            {/*<View style={[globalStyles.flexDirectionRow, globalStyles.justifyCenter]}>
                <SocialIcon type="facebook" />
                <View
                    style={[styles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3, globalStyles.marginTop1, globalStyles.marginLeft2]}>
                    <Image source={gmailIconImage} style={globalStyles.gmailIcon} />
                </View>
            </View>*/}
            <View style={styles.haveAccountArea}>
                <Text style={styles.haveAccountText}>Already have an account?</Text>
                <Pressable onPress={() => navigation.navigate("SignIn")}>
                    <Text style={[styles.haveAccountText, globalStyles.paddingLeft1, globalStyles.textRed]}>
                        SIGN IN
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logoImageArea: {
        paddingVertical: hp("5%"),
        flexDirection: "row",
        justifyContent: "center",
    },
    logoImage: {
        width: wp("70%"),
        height: hp("20%"),
    },
    inputArea: {
        paddingTop: hp("2%"),
    },
    iconStyle: {
        fontSize: 24,
        color: "black",
    },
    inputField: {
        borderColor: "white",
        backgroundColor: "white",
        elevation: 3,
        paddingVertical: hp("0.2%"),
        paddingHorizontal: wp("3%"),
        borderRadius: 8,
        borderWidth: 1,
        marginVertical: hp("0%"),
        marginHorizontal: wp("0%"),
    },
    forgetPasswordText: {
        fontSize: 14,
        color: "#555555",
        textAlign: "right",
    },
    signInButtonArea: {
        flexDirection: "row",
        paddingTop: hp("2%"),
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
    connectWithTextArea: {
        paddingVertical: hp("3%"),
    },
    connectWithText: {
        color: "#555555",
        fontSize: 16,
        textAlign: "center",
    },
    circleIconArea: {
        backgroundColor: "#fff",
        width: 50,
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
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


export default SignUp;

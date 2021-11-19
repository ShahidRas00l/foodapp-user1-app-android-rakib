import React, { useContext } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import globalStyles from "../styles/globalStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { GlobalContext } from "../context/GlobalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToastWithGravityAndOffset } from "../utilities/components/ToastMessage";

const Settings = ({ navigation }) => {
    const { globalState, setGlobalState } = useContext(GlobalContext);

    const logOut = async () => {
        await AsyncStorage.clear();
        showToastWithGravityAndOffset("Logged out successfully!");
        const updateGlobalState = { ...globalState };
        updateGlobalState.user = "";
        updateGlobalState.sign_in_token = "";
        setGlobalState({ ...globalState, ...updateGlobalState });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.headerTop, globalStyles.boxShadow]}>
                <Text style={[globalStyles.headerText, globalStyles.fw600, globalStyles.f22]}>
                    Settings
                </Text>
            </View>
            <ScrollView>
                <View style={[globalStyles.paddingHorizontal5, globalStyles.paddingVertical5]}>
                    <TouchableOpacity
                        style={[globalStyles.flexDirectionRow, globalStyles.paddingBottom3]}
                        onPress={() => navigation.navigate("Profile")}
                    >
                        <View style={[styles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}>
                            <FontAwesome5 name="user-tie" size={22} color="#424242" />
                        </View>
                        <Text
                            style={[globalStyles.f18, globalStyles.paddingTop1, globalStyles.paddingLeft5]}>
                            Profile
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[globalStyles.flexDirectionRow, globalStyles.paddingBottom3]}
                        onPress={() => navigation.navigate("MyOrder")}
                    >
                        <View style={[styles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}>
                            <FontAwesome5 name="baby-carriage" size={22} color="#424242" />
                        </View>
                        <Text
                            style={[globalStyles.f18, globalStyles.paddingTop1, globalStyles.paddingLeft5]}>
                            My Orders
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[globalStyles.flexDirectionRow, globalStyles.paddingBottom3]}
                        onPress={() => navigation.navigate("FavouriteOrder")}
                    >
                        <View style={[styles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}>
                            <MaterialIcons name="favorite" size={22} color="#424242" />
                        </View>
                        <Text
                            style={[globalStyles.f18, globalStyles.paddingTop1, globalStyles.paddingLeft5]}>
                            Favourites
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[globalStyles.flexDirectionRow, globalStyles.paddingBottom3]}
                        onPress={() => navigation.navigate("MyBookings")}
                    >
                        <View style={[styles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}>
                            <MaterialCommunityIcons name="storefront-outline" size={22} color="#424242" />
                        </View>
                        <Text
                            style={[globalStyles.f18, globalStyles.paddingTop1, globalStyles.paddingLeft5]}>
                            My Bookings
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[globalStyles.flexDirectionRow, globalStyles.paddingBottom3]}
                        onPress={() => navigation.navigate("Notification")}
                    >
                        <View style={[styles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}>
                            <Ionicons name="notifications-outline" size={22} color="#424242" />
                        </View>
                        <Text
                            style={[globalStyles.f18, globalStyles.paddingTop1, globalStyles.paddingLeft5]}>
                            Notifications
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[globalStyles.flexDirectionRow, globalStyles.paddingBottom3]}
                        onPress={() => navigation.navigate("TermsAndConditions")}
                    >
                        <View style={[styles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}>
                            <Ionicons name="document-text-outline" size={22} color="#424242" />
                        </View>
                        <Text
                            style={[globalStyles.f18, globalStyles.paddingTop1, globalStyles.paddingLeft5]}>
                            Terms & Conditions
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[globalStyles.flexDirectionRow, globalStyles.paddingBottom3]}
                        onPress={logOut}
                    >
                        <View style={[styles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}>
                            <AntDesign name="logout" size={22} color="#424242" />
                        </View>
                        <Text
                            style={[globalStyles.f18, globalStyles.paddingTop1, globalStyles.paddingLeft5]}>
                            Sign Out
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp("5%"),
        paddingVertical: hp("2%"),
    },
    circleIconArea: {
        backgroundColor: "#fff",
        width: 40,
        height: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
});


export default Settings;

import React, { useState, useRef } from "react";
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
    ScrollView,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import CarouselCards from "../utilities/components/CarouselCards";
import { showToastWithGravityAndOffset } from "../utilities/components/ToastMessage";
import globalStyles from "../styles/globalStyles";

// image
import forkDarkImage from "../assets/image/fork-dark.png";
import forkRedImage from "../assets/image/fork-red.png";
import selectDarkImage from "../assets/image/select-favourite-dark.png";
import selectRedImage from "../assets/image/select-favourite-red.png";
import orderDarkImage from "../assets/image/favourite-order-dark.png";
import orderRedImage from "../assets/image/favourite-order-red.png";

const carouselData = [
    {
        title: "FIND YOUR FAVOURITE FOOD",
        imgUrl: require("../assets/image/workplace.png"),
    },
    {
        title: "SELECT A RESTAURANT / TAKEAWAY",
        imgUrl: require("../assets/image/favourite-slider.png"),
    },
    {
        title: "DELIVERY WITHIN 45 MINUTES",
        imgUrl: require("../assets/image/flexible-time.png"),
    },
];

const Home = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const [postCode, setPostCode] = useState("");
    const scrollViewRef = useRef();

    const handleSubmit = () => {
        if (!postCode) {
            showToastWithGravityAndOffset("Post Code is required!");
            return false;
        }

        navigation.navigate("Restaurant", { postCode });
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <View>
                <ScrollView
                    ref={scrollViewRef}
                >
                    <CarouselCards
                        data={carouselData}
                        isActiveIndex={true}
                        pagination={true}
                        containerStyle={styles.sliderContainer}
                        imageStyle={styles.sliderImage}
                        getActiveIndex={index => setIndex(index)}
                    />
                    <View style={[styles.searchArea, globalStyles.boxShadow]}>
                        <TextInput
                            style={styles.searchInput}
                            value={postCode}
                            onChangeText={value => setPostCode(value)}
                            onFocus={() => {
                                navigation.setOptions({
                                    tabBarVisible: false,
                                });
                                scrollViewRef.current.scrollToEnd({ animated: true });
                            }}
                            onBlur={() => {
                                navigation.setOptions({
                                    tabBarVisible: true,
                                });
                            }}
                            keyboardType={"default"}
                            placeholder="Enter your Post Code"
                        />
                        <TouchableOpacity onPress={handleSubmit}>
                            <AntDesign style={styles.searchIcon} name="search1" size={35} color="black" />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <Text style={[styles.favouriteFoodHeader, globalStyles.headerText]}>
                Restaurants/ Takeaways within your area
            </Text>
            <View style={styles.favouriteArea}>
                <TouchableOpacity style={[styles.favouriteAreaSingle, globalStyles.boxShadow]}>
                    <Text
                        style={[styles.favouriteAreaText, index === 0 ? globalStyles.textRed : globalStyles.textDark]}>Find</Text>
                    <Image style={styles.favouriteAreaImage}
                           source={index === 0 ? forkRedImage : forkDarkImage} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.favouriteAreaSingle, globalStyles.boxShadow]}>
                    <Text
                        style={[styles.favouriteAreaText, index === 1 ? globalStyles.textRed : globalStyles.textDark]}>Select</Text>
                    <Image style={styles.favouriteAreaImage}
                           source={index === 1 ? selectRedImage : selectDarkImage} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.favouriteAreaSingle, globalStyles.boxShadow]}>
                    <Text
                        style={[styles.favouriteAreaText, index === 2 ? globalStyles.textRed : globalStyles.textDark]}>Order</Text>
                    <Image style={styles.favouriteAreaImage}
                           source={index === 2 ? orderRedImage : orderDarkImage} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#dddddd",
        marginRight: wp("1%"),
        paddingHorizontal: wp("5%"),
        paddingVertical: hp("0.5%"),
        borderRadius: 15,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: wp("5%"),
        fontWeight: "bold",
    },
    searchArea: {
        flexDirection: "row",
        borderRadius: 5,
        marginVertical: hp("1%"),
        marginHorizontal: wp("0.5%"),
    },
    searchInput: {
        paddingVertical: hp("1%"),
        paddingLeft: wp("4%"),
        width: wp("78%"),
    },
    searchIcon: {
        paddingVertical: hp("1.5%"),
        width: wp("11.5%"),
        textAlign: "center",
        backgroundColor: "#D2181B",
        color: "#fff",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    favouriteFoodHeader: {
        marginTop: hp("5%"),
        paddingLeft: wp("5%"),
    },
    favouriteArea: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: hp("2%"),
    },
    favouriteAreaSingle: {
        paddingTop: hp("1%"),
        paddingBottom: hp("3%"),
        paddingHorizontal: wp("6%"),
        borderRadius: 15,
    },
    favouriteAreaText: {
        paddingBottom: hp("1%"),
    },
    favouriteAreaImage: {
        width: 50,
        height: 50,
    },
    sliderContainer: {
        marginTop: hp("5%"),
        backgroundColor: "#F2F2F2",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    sliderImage: {
        width: wp("56%"),
        height: hp("31%"),
    },
});


export default Home;

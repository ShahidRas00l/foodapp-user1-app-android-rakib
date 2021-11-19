import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import globalStyles from "../styles/globalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { apiBaseUrl, baseUrl } from "../config";

const initialEmptyRestaurantMessage = "We have 0 restaurants , but we are expecting soon...";

const RestaurantType = ({ data, getRestaurantByType, activeRestaurantType }) => {
    const activeRestaurantStyle = item => {
        return activeRestaurantType["_id"] === item["_id"] && styles.restaurantTypeActive;
    };
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.restaurantTypeArea}
            pagingEnabled={true}>
            {data.map((item, index) => (
                <TouchableOpacity
                    style={[styles.restaurantTypeAreaSingle, globalStyles.boxShadow, globalStyles.elevation3, activeRestaurantType && activeRestaurantStyle(item)]}
                    key={index}
                    onPress={() => getRestaurantByType(item)}
                >
                    <Text
                        style={[globalStyles.textDark, globalStyles.fw600, globalStyles.paddingBottom05]}>
                        {item.type}
                    </Text>
                    <View style={[globalStyles.flexDirectionRow, globalStyles.justifyCenter]}>
                        <Image style={styles.restaurantTypeImage}
                               source={{ uri: `${baseUrl}${item.banner}` }} />
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const RestaurantList = ({ data, navigation, emptyRestaurantMessage }) => {

    return (
        data.length > 0 ?
            <ScrollView style={globalStyles.paddingHorizontal5}>
                {(data.map((item, index) => (
                    <TouchableOpacity key={index}
                                      onPress={() => navigation.navigate("RestaurantDetails", { restaurantId: item.element["_id"] })}>
                        <View style={styles.restaurantListArea}>
                            <Image style={styles.restaurantListAreaLeftImage}
                                   source={{ uri: `${baseUrl}${item.element.logo}` }} />
                            <View style={styles.restaurantListAreaRight}>
                                <View style={globalStyles.flexDirectionRow}>
                                    <Text style={[styles.restaurantListAreaTitle, globalStyles.marginRight1]}>
                                        {item.element.name}
                                    </Text>
                                    <Text style={[styles.restaurantListAreaTitle, globalStyles.textRed]}>
                                        {item.element.discount &&
                                        `${item.element.discount}% ${item.element.discountType}`
                                        }
                                    </Text>
                                </View>
                                <Text style={styles.restaurantListAreaAddress}>
                                    {item.element.address}, {item.element.postCode}, {item.element.city}
                                </Text>
                                <Text
                                    style={styles.restaurantListAreaAddress}>
                                    {item.element.openingTime} to {item.element.closingTime}
                                </Text>
                                <Text
                                    style={[styles.restaurantListAreaAddress, globalStyles.textRed]}>
                                    {parseFloat(item.distance).toFixed(2)} Miles away
                                </Text>
                            </View>
                        </View>
                        <View style={styles.deliveryTimeArea}>
                            <View
                                style={[globalStyles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3, globalStyles.marginLeft06]}>
                                <Feather name="shopping-bag" size={16} color="#D2181B" />
                            </View>
                            <Text style={styles.deliveryTimeAreaText}>
                                {item.element.pickupTime} Mins
                            </Text>
                            <View
                                style={[globalStyles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}>
                                <MaterialCommunityIcons name="bike-fast" size={16} color="#D2181B" />
                            </View>
                            <Text style={styles.deliveryTimeAreaText}>
                                Free, {item.element.deliveryTime[0]} Mins
                            </Text>
                            <View
                                style={[globalStyles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}>
                                <MaterialCommunityIcons name="map-marker-radius-outline" size={16} color="#D2181B" />
                            </View>
                            <Text style={styles.deliveryTimeAreaText}>
                                {item.element.areaLimit ? item.element.areaLimit : "N/A"}
                            </Text>
                            {item.element.minOrder &&
                            <>
                                <View
                                    style={[globalStyles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}>
                                    <FontAwesome name="shopping-basket" size={16} color="#D2181B" />
                                </View>
                                <Text style={styles.deliveryTimeAreaText}>
                                    £{item.element.minOrder}
                                </Text>
                            </>
                            }
                        </View>
                    </TouchableOpacity>
                )))}
            </ScrollView>
            :
            <View style={globalStyles.paddingHorizontal5}>
                <Text style={globalStyles.textGrey}>
                    {emptyRestaurantMessage}
                </Text>
            </View>
    );
};

const Restaurant = ({ navigation, route }) => {
    const { postCode } = route.params;
    const [restaurantType, setRestaurantType] = useState([]);
    const [restaurantList, setRestaurantList] = useState([]);
    const [restaurantTypeLoading, setRestaurantTypeLoading] = useState(false);
    const [restaurantListLoading, setRestaurantListLoading] = useState(false);
    const [emptyRestaurantMessage, setEmptyRestaurantMessage] = useState(initialEmptyRestaurantMessage);
    const [activeRestaurantType, setActiveRestaurantType] = useState(null);

    const getRestaurantByPostCode = async postCode => {
        try {
            setRestaurantListLoading(true);
            const response = await axios.get(`${apiBaseUrl}restaurant/fetch-code?postCode=${postCode}`);
            return response.data;
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    const getRestaurantByPostCodeAndType = async (postCode, type) => {
        try {
            setRestaurantListLoading(true);
            const params = `?postCode=${postCode}&type=${type}`;
            const response = await axios.get(`${apiBaseUrl}restaurant/fetch-type-code${params}`);
            return response.data;
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    const getRestaurantType = async () => {
        try {
            setRestaurantTypeLoading(true);
            const response = await axios.get(`${apiBaseUrl}restaurant/fetch-type`);
            return response.data;
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    useEffect(() => {
        getRestaurantByPostCode(postCode).then(res => {
            res && setRestaurantList([...res["restaurants"]]);
            setRestaurantListLoading(false);
        });

        getRestaurantType().then(res => {
            res && setRestaurantType([...res["data"]]);
            setRestaurantTypeLoading(false);
            setActiveRestaurantType(null);
        });
    }, [postCode]);

    const getRestaurantByType = async item => {
        setActiveRestaurantType(item);
        const res = await getRestaurantByPostCodeAndType(postCode, item["_id"]);
        res && setRestaurantList([...res["restaurants"]]);
        setRestaurantListLoading(false);
        setEmptyRestaurantMessage(`We have 0 ${item.type} restaurants , but we are expecting soon...`);
    };

    return (
        <SafeAreaView style={[globalStyles.container, globalStyles.paddingHorizontal0]}>
            <View style={[globalStyles.boxShadow, globalStyles.paddingHorizontal5]}>
                {restaurantTypeLoading ?
                    <View
                        style={[globalStyles.flexDirectionRow, globalStyles.justifyCenter, globalStyles.paddingBottom1]}>
                        <ActivityIndicator size="large" color="#D2181B" />
                    </View>
                    : <RestaurantType data={restaurantType}
                                      getRestaurantByType={getRestaurantByType}
                                      activeRestaurantType={activeRestaurantType} />
                }
            </View>
            <View style={[globalStyles.paddingHorizontal5, globalStyles.paddingTop2]}>
                <Text style={[styles.dataHeaderText, globalStyles.textRed]}>
                    {restaurantList.length} found within this {postCode}
                </Text>
            </View>
            {restaurantListLoading ?
                <View style={globalStyles.loadingArea}>
                    <ActivityIndicator size="large" color="#D2181B" />
                </View>
                : <RestaurantList data={restaurantList}
                                  navigation={navigation}
                                  emptyRestaurantMessage={emptyRestaurantMessage} />
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    restaurantTypeArea: {
        flexDirection: "row",
    },
    restaurantTypeAreaSingle: {
        paddingTop: hp("0.5%"),
        paddingBottom: hp("1%"),
        paddingHorizontal: wp("3"),
        marginLeft: wp("2%"),
        borderRadius: 15,
        marginVertical: hp("2%"),
    },
    restaurantTypeActive: {
        borderWidth: 1,
        borderColor: "#D2181B",
    },
    restaurantTypeImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    dataHeaderText: {
        fontSize: 20,
        fontWeight: "700",
        paddingBottom: hp("1.5%"),
    },
    restaurantListArea: {
        paddingVertical: hp("1.5%"),
        flexDirection: "row",
        borderTopColor: "#dcd6d6",
        borderTopWidth: 1,
    },
    restaurantListAreaLeftImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    restaurantListAreaRight: {
        paddingLeft: wp("5%"),
    },
    restaurantListAreaTitle: {
        fontSize: 18,
        color: "#000",
    },
    restaurantListAreaAddress: {
        fontSize: 14,
        color: "#828585",
        paddingTop: hp("0.5%"),
    },
    deliveryTimeArea: {
        flexDirection: "row",
        paddingTop: hp("1%"),
        paddingBottom: hp("0.5%"),
    },
    deliveryTimeAreaText: {
        paddingTop: hp("0.2%"),
        paddingLeft: wp("0.5%"),
        paddingRight: wp("1%"),
    },
});

export default Restaurant;

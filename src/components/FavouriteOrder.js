import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    RefreshControl,
} from "react-native";
import globalStyles from "../styles/globalStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import axios from "axios";
import { apiBaseUrl, baseUrl } from "../config";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GlobalContext } from "../context/GlobalContext";
import Loader from "../utilities/components/Loader";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

const initialEmptyRestaurantMessage = "We have 0 restaurants , but we are expecting soon...";

const RestaurantList = ({ data, navigation, emptyRestaurantMessage, refreshing, onRefresh }) => {
    return (
        data.length > 0 ?
            <ScrollView
                style={globalStyles.paddingHorizontal5}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {(data.map((item, index) => (
                    <TouchableOpacity key={index}
                                      onPress={() => navigation.navigate("RestaurantDetails", { restaurantId: item["_id"] })}>
                        <View style={styles.restaurantListArea}>
                            <Image style={styles.restaurantListAreaLeftImage}
                                   source={{ uri: `${baseUrl}${item.logo}` }} />
                            <View style={styles.restaurantListAreaRight}>
                                <View style={globalStyles.flexDirectionRow}>
                                    <Text style={[styles.restaurantListAreaTitle, globalStyles.marginRight1]}>
                                        {item.name}
                                    </Text>
                                    <Text style={[styles.restaurantListAreaTitle, globalStyles.textRed]}>
                                        {item.discount && `${item.discount}% ${item.discountType}`}
                                    </Text>
                                </View>
                                <Text style={styles.restaurantListAreaAddress}>
                                    {item.address}, {item.postCode}, {item.city}
                                </Text>
                                <Text
                                    style={styles.restaurantListAreaAddress}>
                                    {item.openingTime} to {item.closingTime}
                                </Text>
                                <Text
                                    style={[styles.restaurantListAreaAddress, globalStyles.textRed, globalStyles.f18]}>
                                    Order again or book a table
                                </Text>
                            </View>
                        </View>
                        <View style={styles.deliveryTimeArea}>
                            <View
                                style={[globalStyles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3, globalStyles.marginLeft06]}>
                                <Feather name="shopping-bag" size={16} color="#D2181B" />
                            </View>
                            <Text style={styles.deliveryTimeAreaText}>
                                {item.pickupTime} Mins
                            </Text>
                            <View
                                style={[globalStyles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}>
                                <MaterialCommunityIcons name="bike-fast" size={16} color="#D2181B" />
                            </View>
                            <Text style={styles.deliveryTimeAreaText}>
                                Free, {item.deliveryTime[0]} Mins
                            </Text>
                            <View
                                style={[globalStyles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}>
                                <MaterialCommunityIcons name="map-marker-radius-outline" size={16} color="#D2181B" />
                            </View>
                            <Text style={styles.deliveryTimeAreaText}>
                                {item.areaLimit ? item.areaLimit : "N/A"}
                            </Text>
                            <View
                                style={[globalStyles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}>
                                <FontAwesome name="shopping-basket" size={16} color="#D2181B" />
                            </View>
                            <Text style={styles.deliveryTimeAreaText}>
                                £{item.minOrder}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )))}
            </ScrollView>
            :
            <View style={[globalStyles.paddingHorizontal5, globalStyles.paddingTop2]}>
                <Text style={globalStyles.textGrey}>
                    {emptyRestaurantMessage}
                </Text>
            </View>
    );
};

const FavouriteOrder = ({ navigation }) => {
    const [restaurantList, setRestaurantList] = useState([]);
    const [restaurantListLoading, setRestaurantListLoading] = useState(true);
    const [emptyRestaurantMessage] = useState(initialEmptyRestaurantMessage);
    const { globalState } = useContext(GlobalContext);
    const { user } = globalState;
    const [refreshing, setRefreshing] = React.useState(false);

    const getFavouriteRestaurant = async userId => {
        try {
            const response = await axios.get(`${apiBaseUrl}admin/fetch-fav-res/${userId}`);
            if (response.data && response.data.data["favRestaurants"]) {
                setRestaurantList(response.data.data["favRestaurants"]);
                setRestaurantListLoading(false);
                return true;
            }
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    useEffect(() => {
        getFavouriteRestaurant(user["_id"]).then(res => console.log("FAVOURITE RESTAURANT:", res));
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getFavouriteRestaurant(user["_id"]).then(res => console.log("FAVOURITE RESTAURANT:", res));
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <SafeAreaView style={[globalStyles.container, globalStyles.paddingHorizontal0]}>
            {/*<View style={[globalStyles.paddingHorizontal5, globalStyles.paddingTop2]}>
        <Text style={[styles.dataHeaderText, globalStyles.textRed]}>All Favourite Restaurants</Text>
      </View>*/}
            {restaurantListLoading ? <Loader /> : <RestaurantList data={restaurantList}
                                                                  navigation={navigation}
                                                                  emptyRestaurantMessage={emptyRestaurantMessage}
                                                                  refreshing={refreshing}
                                                                  onRefresh={onRefresh} />
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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

export default FavouriteOrder;

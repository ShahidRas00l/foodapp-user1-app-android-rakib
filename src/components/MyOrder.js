import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    BackHandler,
    RefreshControl,
} from "react-native";
import globalStyles from "../styles/globalStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import { apiBaseUrl } from "../config";
import moment from "moment";
import { showToastWithGravityAndOffset } from "../utilities/components/ToastMessage";
import Loader from "../utilities/components/Loader";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

const MyOrder = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { globalState } = useContext(GlobalContext);
    const { user } = globalState;
    const [refreshing, setRefreshing] = React.useState(false);

    const onBackPress = () => {
        if (route.params && Object.keys(route.params).length > 0 && route.params.isOrderPlaced) {
            navigation.navigate("Settings");
        } else navigation.goBack();
        return true;
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => (
                <HeaderBackButton
                    {...props}
                    onPress={() => onBackPress()}
                />
            ),
        });
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", onBackPress);
            return () =>
                BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        }, []),
    );

    const getMyOrders = async userId => {
        try {
            const response = await axios.get(`${apiBaseUrl}order/fetch-by-user/${userId}`);
            if (response.data) {
                setData(response.data.data);
                console.log(JSON.stringify(response.data.data));
                setIsLoading(false);
                return true;
            }
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    useEffect(() => {
        getMyOrders(user["_id"]).then(res => console.log("ALL ORDERS: ", res));
    }, [user]);

    const deleteOrder = async id => {
        try {
            const response = await axios.delete(`${apiBaseUrl}order/remove/${id}`);
            if (response.data) {
                showToastWithGravityAndOffset("Order removed successfully!");
                getMyOrders(user["_id"]).then(res => console.log("ALL ORDERS: ", res));
            }
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    const setStatusBgColor = (createdAt, time) => {
        const statusText = getStatusButtonText(createdAt, time);
        if (statusText === "Received") return globalStyles.bgSuccess;
        if (statusText === "Processing") return globalStyles.bgWarning;
        if (statusText === "Completed") return globalStyles.bgRed;
    };

    const getStatusButtonText = (createdAt, time) => {
        const a = moment(new Date);
        const b = moment(createdAt);
        const diff = a.diff(b, "minutes");

        if (time) {
            if (diff > 1 && diff < time) {
                return "Processing";
            } else if (diff > time) {
                return "Completed";
            } else {
                return "Received";
            }
        } else {
            if (diff > 1) {
                return "Processing";
            } else {
                return "Received";
            }
        }
    };

    const isDeleteButtonActive = (createdAt, time) => {
        const a = moment(new Date);
        const b = moment(createdAt);
        const diff = a.diff(b, "minutes");

        if (time) {
            return diff > time;
        } else return false;
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getMyOrders(user["_id"]).then(res => console.log("ALL ORDERS: ", res));
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const renderOrder = data.length > 0 ? data.map((item, index) => (
            <TouchableOpacity
                style={[globalStyles.card, globalStyles.boxShadow, globalStyles.marginTop2]}
                onPress={() => navigation.navigate("OrderDetails", { orderDetails: item })}
                key={index}
            >
                <View style={[globalStyles.flexDirectionRow, globalStyles.justifyBetween, globalStyles.marginBottom1]}>
                    <View style={[globalStyles.flexDirectionRow, { height: 18 }]}>
                        <Text style={globalStyles.textGrey}>{item.orderNumber}</Text>
                        <View
                            style={[styles.statusButton, globalStyles.marginRight2, globalStyles.marginLeft2, globalStyles.bgGrey]}>
                            <Text style={styles.statusButtonText}>
                                {item.orderType === "pickup" ? "Collection" : item.orderType}
                            </Text>
                        </View>
                        {item.orderType === "delivery" &&
                        <View style={[styles.statusButton, setStatusBgColor(item.createdAt, item.deliveryTime)]}>
                            <Text style={styles.statusButtonText}>
                                {getStatusButtonText(item.createdAt, item.deliveryTime)}
                            </Text>
                        </View>
                        }
                        {(item.orderType === "collection" || item.orderType === "pickup") &&
                        <View style={[styles.statusButton, setStatusBgColor(item.createdAt, item.restaurant.pickupTime)]}>
                            <Text style={styles.statusButtonText}>
                                {getStatusButtonText(item.createdAt, item.restaurant.pickupTime)}
                            </Text>
                        </View>
                        }
                    </View>
                    {item.orderType === "delivery" && isDeleteButtonActive(item.createdAt, item.deliveryTime) &&
                    <View>
                        <TouchableOpacity
                            style={[styles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}
                            onPress={() => deleteOrder(item._id)}
                        >
                            <MaterialIcons name="delete" size={22} color="#D2181B" />
                        </TouchableOpacity>
                    </View>
                    }
                    {(item.orderType === "collection" || item.orderType === "pickup") && isDeleteButtonActive(item.createdAt, item.restaurant.pickupTime) &&
                    <View>
                        <TouchableOpacity
                            style={[styles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}
                            onPress={() => deleteOrder(item._id)}
                        >
                            <MaterialIcons name="delete" size={22} color="#D2181B" />
                        </TouchableOpacity>
                    </View>
                    }
                </View>

                <View
                    style={[globalStyles.flexDirectionRow, globalStyles.justifyBetween, globalStyles.paddingTop1]}>
                    <Text>Order Date</Text>
                    <Text>{moment(item.updatedAt).format("DD MMM YYYY, hh:mm A") || "N/A"}</Text>
                </View>
                {item.orderType === "delivery" &&
                <View
                    style={[globalStyles.flexDirectionRow, globalStyles.justifyBetween, globalStyles.paddingTop1]}>
                    <Text>Time</Text>
                    <Text>{item.deliveryTime ? `${item.deliveryTime} Min` : "N/A"}</Text>
                </View>
                }
                {(item.orderType === "collection" || item.orderType === "pickup") &&
                <View
                    style={[globalStyles.flexDirectionRow, globalStyles.justifyBetween, globalStyles.paddingTop1]}>
                    <Text>Time</Text>
                    <Text>{item.restaurant.pickupTime ? `${item.restaurant.pickupTime} Min` : "N/A"}</Text>
                </View>
                }
                <View
                    style={[globalStyles.flexDirectionRow, globalStyles.justifyBetween, globalStyles.paddingTop1, globalStyles.paddingBottom2]}>
                    <Text>Payment</Text>
                    <Text style={globalStyles.textCapitalize}>{item.paymentMethod || "N/A"}</Text>
                </View>
                <View style={styles.totalAmountArea}>
                    <Text>Total Price</Text>
                    <Text>£{item.totalPrice}</Text>
                </View>
            </TouchableOpacity>
        )) :
        <Text style={globalStyles.paddingTop1}>No Order Yet!</Text>;

    return (
        isLoading ? <Loader /> :
            <SafeAreaView>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={[globalStyles.paddingHorizontal5, globalStyles.paddingBottom3]}>
                        {renderOrder}
                    </View>
                </ScrollView>
            </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    statusButton: {
        borderRadius: 5,
    },
    statusButtonText: {
        paddingVertical: hp("0.2%"),
        paddingHorizontal: wp("1.5%"),
        textTransform: "uppercase",
        fontWeight: "700",
        color: "#fff",
    },
    totalAmountArea: {
        borderTopColor: "#b4b4b4",
        borderTopWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: hp("1%"),
    },
    circleIconArea: {
        backgroundColor: "#fff",
        width: 30,
        height: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
});

export default MyOrder;

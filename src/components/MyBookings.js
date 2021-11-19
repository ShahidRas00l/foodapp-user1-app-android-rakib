import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, BackHandler } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { apiBaseUrl } from "../config";
import moment from "moment";
import { showToastWithGravityAndOffset } from "../utilities/components/ToastMessage";
import { GlobalContext } from "../context/GlobalContext";
import Loader from "../utilities/components/Loader";
import globalStyles from "../styles/globalStyles";
import { HeaderBackButton } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

const AllBookings = ({ userId }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);

    const getAllBookings = async userId => {
        try {
            const response = await axios.get(`${apiBaseUrl}restaurant/fetch-booking-user/${userId}?type=month`);
            if (response.data) {
                setData(response.data.data);
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
        getAllBookings(userId).then(res => console.log("ALL BOOKINGS: ", res));
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getAllBookings(userId).then(res => console.log("ALL BOOKINGS: ", res));
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const {
        bookingsArea,
        bookingsItem,
        bookingsHeader,
        bookingsHeaderText,
        allBookingText,
        statusButton,
        statusButtonText,
    } = styles;

    const {
        bgSuccess,
        bgWarning,
        marginRight2,
        flexDirectionRow,
        paddingBottom05,
    } = globalStyles;

    const deleteBooking = async id => {
        try {
            const response = await axios.delete(`${apiBaseUrl}restaurant/remove-booking/${id}`);
            if (response.data) {
                showToastWithGravityAndOffset("Booking deleted successfully!");
                getAllBookings(userId).then(res => console.log("ALL BOOKINGS: ", res));
            }
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    const renderItem = data.length > 0 ?
        data.map((item, index) =>
            <View style={bookingsItem} key={index}>
                <View style={bookingsHeader}>
                    <View>
                        <Text style={bookingsHeaderText}>
                            {item.bookingFor}
                        </Text>
                        <Text style={[bookingsHeaderText, paddingBottom05]}>
                            {item.restaurantId.name}
                        </Text>
                    </View>
                    <View style={flexDirectionRow}>
                        <View
                            style={[statusButton, marginRight2, item.isAccepted ? bgSuccess : bgWarning]}>
                            <Text style={statusButtonText}>{item.isAccepted ? "Confirmed" : "Pending"}</Text>
                        </View>
                        <TouchableOpacity onPress={() => deleteBooking(item._id)}>
                            <FontAwesome name="trash" color="#d2181b" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={allBookingText}>Name: {item.name}</Text>
                <Text style={allBookingText}>
                    Date: {moment(item.date).format("DD/MM/YYYY")}
                </Text>
                <Text style={allBookingText}>Time: {item.bookingFrom}</Text>
                <Text style={allBookingText}>Contact No: {item.contact}</Text>
                <Text style={allBookingText}>Guest No: {item.guestNo}</Text>
            </View>,
        )
        :
        <Text style={globalStyles.paddingLeft5}>No Booking Yet!</Text>;

    return (
        <ScrollView
            style={bookingsArea}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            {isLoading ? <Loader /> : renderItem}
        </ScrollView>
    );
};

const MyBookings = ({ navigation, route }) => {
    const { globalState } = useContext(GlobalContext);
    const { user } = globalState;
    const { container } = styles;

    const onBackPress = () => {
        if (route.params && Object.keys(route.params).length > 0 && route.params.isBookingPlaced) {
            navigation.navigate("Home");
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

    return (
        <View style={container}>
            {user && <AllBookings userId={user["_id"]} />}
        </View>
    );
};

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: "#e4e4e4",
        },
        bookingsArea: {
            marginTop: hp("2%"),
        },
        bookingsItem: {
            backgroundColor: "#fff",
            paddingHorizontal: wp("3%"),
            paddingVertical: hp("1%"),
            borderRadius: 8,
            marginBottom: hp("2%"),
            marginHorizontal: wp("5%"),
            elevation: 5,
        },
        bookingsHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        bookingsHeaderText: {
            fontWeight: "600",
            fontSize: 18,
        },
        noDataFoundArea: {
            backgroundColor: "#fff",
            paddingHorizontal: wp("3%"),
            paddingVertical: hp("1%"),
            borderRadius: 8,
            marginBottom: hp("2%"),
            marginHorizontal: wp("5%"),
            elevation: 5,
        },
        allBookingText: {
            lineHeight: 18,
        },
        statusButton: {
            borderRadius: 5,
            height: hp("2.8%"),
        },
        statusButtonText: {
            paddingTop: hp("0.2%"),
            paddingHorizontal: wp("1.5%"),
            textTransform: "uppercase",
            fontWeight: "700",
            color: "#fff",
        },
    },
);

export default MyBookings;

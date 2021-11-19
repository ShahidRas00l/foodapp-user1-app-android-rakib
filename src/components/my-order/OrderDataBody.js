import React from "react";
import { Text, View } from "react-native";

import moment from "moment";

import globalStyles from "../../styles/globalStyles";
import styles from "./styles";

const OrderDataBody = ({ item }) => {
    const {
        totalAmountArea,
    } = styles;

    const {
        flexDirectionRow,
        justifyBetween,
        paddingTop1,
        paddingBottom2,
        textCapitalize,
    } = globalStyles;

    return (
        <>
            <View style={[flexDirectionRow, justifyBetween, paddingTop1]}>
                <Text>Order Date</Text>
                <Text>
                    {moment(item.createdAt).format("DD MMM YYYY, hh:mm A") || "N/A"}
                </Text>
            </View>

            {item.orderType === "delivery" &&
            <View style={[flexDirectionRow, justifyBetween, paddingTop1]}>
                <Text>Time</Text>
                <Text>
                    {item.deliveryTime ? `${item.deliveryTime} Min` : "N/A"}
                </Text>
            </View>
            }

            {(item.orderType === "collection" || item.orderType === "pickup") &&
            <View style={[flexDirectionRow, justifyBetween, paddingTop1]}>
                <Text>Time</Text>
                <Text>
                    {item.restaurant && (item.restaurant.pickupTime ? `${item.restaurant.pickupTime} Min` : "N/A")}
                </Text>
            </View>
            }

            <View style={[flexDirectionRow, justifyBetween, paddingTop1, paddingBottom2]}>
                <Text>Payment</Text>
                <Text style={textCapitalize}>{item.paymentMethod || "N/A"}</Text>
            </View>

            <View style={totalAmountArea}>
                <Text>Total Price</Text>
                <Text>£{item.totalPrice}</Text>
            </View>
        </>
    );
};


export default OrderDataBody;

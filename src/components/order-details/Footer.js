import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";
import globalStyles from "../../styles/globalStyles";

export default function Footer({ orderDetails, user }) {
    const {
        deliveryArea,
    } = styles;

    const {
        textCenter,
        f18,
        fw700,
    } = globalStyles;

    const {
        orderType,
        address,
        tableNo,
        kitchenNotes,
    } = orderDetails;

    const {
        name,
    } = user;

    return (
        <>
            <View style={deliveryArea}>
                <Text style={[fw700, textCenter, f18]}>
                    Kitchen Notes: {kitchenNotes}
                </Text>
            </View>

            {orderType === "delivery" &&
            <View style={deliveryArea}>
                <Text style={[fw700, textCenter, f18]}>
                    Delivered To: {name}
                </Text>
                <Text style={[fw700, textCenter, f18]}>
                    {address}
                </Text>
            </View>
            }

            {(orderType === "collection" || orderType === "pickup") &&
            <View style={deliveryArea}>
                <Text style={[fw700, textCenter, f18]}>
                    Collection For: {name}
                </Text>
            </View>
            }

            {tableNo &&
            <View style={deliveryArea}>
                <Text style={[fw700, textCenter, f18]}>
                    Dine In: {tableNo}</Text>
            </View>
            }
        </>
    );
}

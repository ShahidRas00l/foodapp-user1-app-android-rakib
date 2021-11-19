import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";
import globalStyles from "../../styles/globalStyles";

export default function TotalPriceArea({ orderDetails }) {
    const {
        totalPriceArea,
    } = styles;

    const {
        flexDirectionRow,
        justifyBetween,
        fw700,
        paddingLeft5,
        paddingBottom1,
        paddingRight7,
    } = globalStyles;

    const {
        paymentMethod,
        totalPrice,
    } = orderDetails;

    return (
        <View style={totalPriceArea}>
            <View style={[flexDirectionRow, justifyBetween]}>
                <Text style={[fw700, paddingLeft5, paddingBottom1]}>
                    Total Payment ({paymentMethod})
                </Text>
                <Text style={[fw700, paddingRight7]}>
                    £{totalPrice ? parseFloat(totalPrice).toFixed(2) : "0.00"}
                </Text>
            </View>
        </View>
    );
}

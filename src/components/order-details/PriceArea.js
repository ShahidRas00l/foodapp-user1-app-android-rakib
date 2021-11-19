import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";
import globalStyles from "../../styles/globalStyles";

export default function PriceArea({orderDetails, totalPrice}) {
    const {
        priceArea,
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
        discount,
        orderType,
        deliveryCharge,
        tableNo,
    } = orderDetails;

    return(
        <View style={priceArea}>
            <View style={[flexDirectionRow, justifyBetween]}>
                <Text style={[fw700, paddingLeft5, paddingBottom1]}>
                    Sub Total
                </Text>
                <Text style={[fw700, paddingRight7]}>
                    £{totalPrice ? totalPrice : "0.00"}
                </Text>
            </View>

            <View style={[flexDirectionRow, justifyBetween]}>
                <Text style={[fw700, paddingLeft5, paddingBottom1]}>
                    Discount (-)
                </Text>
                <Text style={[fw700, paddingRight7]}>
                    £{discount ? parseFloat(discount).toFixed(2) : "0.00"}
                </Text>
            </View>

            {orderType === "delivery" &&
            <View style={[flexDirectionRow, justifyBetween]}>
                <Text style={[fw700, paddingLeft5, paddingBottom1]}>
                    Delivery Charges (+)
                </Text>
                <Text style={[fw700, paddingRight7]}>
                    £{deliveryCharge ? parseFloat(deliveryCharge).toFixed(2) : "0.00"}
                </Text>
            </View>
            }

            {!tableNo &&
            <View style={[flexDirectionRow, justifyBetween]}>
                <Text style={[fw700, paddingLeft5, paddingBottom1]}>
                    Service Charges (+)
                </Text>
                <Text style={[fw700, paddingRight7]}>
                    £{"0.50"}
                </Text>
            </View>
            }
        </View>
    );
}

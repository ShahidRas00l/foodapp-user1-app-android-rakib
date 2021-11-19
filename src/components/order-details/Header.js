import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import moment from "moment";
import axios from "axios";

import styles from "./styles";
import globalStyles from "../../styles/globalStyles";
import { apiBaseUrl } from "../../config";

export default function Header({ orderDetails }) {
    const [restaurant, setRestaurant] = useState(orderDetails.restaurant);

    const {
        restaurantHeader,
    } = styles;

    const {
        f18,
        textCenter,
        fw700,
    } = globalStyles;

    const {
        createdAt,
        orderNumber,
    } = orderDetails;

    const {
        name,
        address,
    } = restaurant;

    useEffect(() => {
        if (orderDetails.tableNo && typeof orderDetails.restaurant === "string") {
            axios.get(`${apiBaseUrl}restaurant/fetch/${orderDetails.restaurant}`)
                .then(res => {
                    setRestaurant(res.data.data);
                })
                .catch(err => {
                    console.log(err.response);
                });
        }
    }, []);

    return (
        <View style={restaurantHeader}>
            <Text style={[f18, textCenter, fw700]}>
                {name}
            </Text>

            <Text style={textCenter}>
                {address}
            </Text>

            <Text style={textCenter}>
                {moment(createdAt).format("DD/MM/YYYY")}
            </Text>

            <Text style={textCenter}>
                {orderNumber}
            </Text>
        </View>
    );
};

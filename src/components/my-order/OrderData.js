import React from "react";
import { Text, TouchableOpacity } from "react-native";

import axios from "axios";
import moment from "moment";

import OrderDataHeader from "./OrderDataHeader";
import OrderDataBody from "./OrderDataBody";
import globalStyles from "../../styles/globalStyles";
import { apiBaseUrl } from "../../config";
import { showToastWithGravityAndOffset } from "../../utilities/components/ToastMessage";

const OrderData = ({ data, navigation, getMyOrders, userId }) => {
    const {
        card,
        boxShadow,
        marginTop2,
        paddingTop1,
        bgSuccess,
        bgWarning,
        bgRed,
    } = globalStyles;

    const deleteOrder = async id => {
        try {
            const response = await axios.delete(`${apiBaseUrl}order/remove/${id}`);
            if (response.data) {
                showToastWithGravityAndOffset("Order removed successfully!");
                getMyOrders(userId).then(res => console.log("ALL ORDERS: ", res));
            }
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    const setStatusBgColor = (createdAt, time) => {
        const statusText = getStatusButtonText(createdAt, time);
        if (statusText === "Received") return bgSuccess;
        if (statusText === "Processing") return bgWarning;
        if (statusText === "Pending") return bgWarning;
        if (statusText === "Completed") return bgRed;
    };

    const getStatusButtonText = (createdAt, time, status) => {
        if (status === "pending") return "Pending";
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

    return (
        data.length > 0 ? data.map((item, index) => (
                <TouchableOpacity
                    style={[card, boxShadow, marginTop2]}
                    onPress={() => navigation.navigate("OrderDetails", { orderDetails: item })}
                    key={index}
                >
                    <OrderDataHeader
                        item={item}
                        getStatusButtonText={getStatusButtonText}
                        isDeleteButtonActive={isDeleteButtonActive}
                        deleteOrder={deleteOrder}
                        setStatusBgColor={setStatusBgColor}
                    />
                    <OrderDataBody
                        item={item}
                    />
                </TouchableOpacity>
            )) :
            <Text style={paddingTop1}>No Order Yet!</Text>
    );
};


export default OrderData;

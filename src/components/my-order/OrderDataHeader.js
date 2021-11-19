import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import globalStyles from "../../styles/globalStyles";
import styles from "./styles";

const OrderDataHeader = ({ item, getStatusButtonText, setStatusBgColor, isDeleteButtonActive, deleteOrder }) => {
    const {
        statusButton,
        statusButtonText,
        circleIconArea,
    } = styles;

    const {
        flexDirectionRow,
        justifyBetween,
        marginBottom1,
        textGrey,
        marginRight2,
        marginLeft2,
        boxShadow,
        elevation3,
        bgGrey,
    } = globalStyles;

    return (
        <View style={[flexDirectionRow, justifyBetween, marginBottom1]}>
            <View style={[flexDirectionRow, { height: 18 }]}>
                <Text style={textGrey}>{item.orderNumber}</Text>
                <View style={[statusButton, marginRight2, marginLeft2, bgGrey]}>
                    <Text style={statusButtonText}>
                        {item.orderType === "pickup" ? "Collection" : item.orderType}
                    </Text>
                </View>

                {item.orderType === "delivery" &&
                <View style={[statusButton, setStatusBgColor(item.createdAt, item.deliveryTime)]}>
                    <Text style={statusButtonText}>
                        {getStatusButtonText(item.createdAt, item.deliveryTime, item.orderStatus)}
                    </Text>
                </View>
                }

                {(item.orderType === "collection" || item.orderType === "pickup") && item.restaurant &&
                <View style={[statusButton, setStatusBgColor(item.createdAt, item.restaurant.pickupTime)]}>
                    <Text style={statusButtonText}>
                        {getStatusButtonText(item.createdAt, item.restaurant.pickupTime, item.orderStatus)}
                    </Text>
                </View>
                }
            </View>

            {item.orderType === "delivery" && isDeleteButtonActive(item.createdAt, item.deliveryTime) &&
            <View>
                <TouchableOpacity
                    style={[circleIconArea, boxShadow, elevation3]}
                    onPress={() => deleteOrder(item._id)}
                >
                    <MaterialIcons name="delete" size={22} color="#D2181B" />
                </TouchableOpacity>
            </View>
            }

            {(item.orderType === "collection" || item.orderType === "pickup") && item.restaurant && isDeleteButtonActive(item.createdAt, item.restaurant.pickupTime) &&
            <View>
                <TouchableOpacity
                    style={[circleIconArea, boxShadow, elevation3]}
                    onPress={() => deleteOrder(item._id)}
                >
                    <MaterialIcons name="delete" size={22} color="#D2181B" />
                </TouchableOpacity>
            </View>
            }
        </View>
    );
};


export default OrderDataHeader;

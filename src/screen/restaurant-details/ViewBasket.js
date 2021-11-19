import React from "react";
import { Text, TouchableOpacity } from "react-native";

import styles from "./styles";

const ViewBasket = () => {
    return (
        <TouchableOpacity style={styles.viewBasketArea}
                          onPress={() => navigation.navigate("AddToCart", { restaurantId })}>
            <Text style={styles.viewBasketText}>View Basket</Text>
            <Text style={styles.viewBasketText}>£{totalPrice}</Text>
        </TouchableOpacity>
    );
};


export default ViewBasket;

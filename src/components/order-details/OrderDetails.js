import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, ScrollView, SafeAreaView, BackHandler } from "react-native";
import { HeaderBackButton } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";

import Header from "./Header";
import Body from "./Body";
import TotalPriceArea from "./TotalPriceArea";
import PriceArea from "./PriceArea";
import Footer from "./Footer";
import Loader from "../../utilities/components/Loader";

import styles from "./styles";

import { GlobalContext } from "../../context/GlobalContext";
import { getTotalPrice } from "../../utilities/functions";

const OrderDetails = ({ route, navigation }) => {
    const { orderDetails } = route.params;
    const tableHead = ["Qty", "Description", "Amount"];
    const [tableData, setTableData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { globalState } = useContext(GlobalContext);
    const { user } = globalState;

    console.log(JSON.stringify(orderDetails), "orderDetails");

    const onBackPress = () => {
        if (orderDetails && orderDetails.tableNo) {
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
            return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
        }, []),
    );

    useEffect(() => {
        if (orderDetails && orderDetails.foodItems.length > 0) {
            let updateTableData = [];
            let totalAmount = 0;

            orderDetails.foodItems.forEach(item => {
                const qty = parseInt(item.quantity);
                const price = parseFloat(item.price).toFixed(2);
                totalAmount += qty * price;
                const priceText = `£${(qty * price).toFixed(2)}`;
                const arr = [qty, item.title, priceText];
                updateTableData.push(arr);
            });

            setTotalPrice(totalAmount.toFixed(2));
            setTableData(updateTableData);
        }

        if (orderDetails && orderDetails.tableNo) {
            orderDetails.totalPrice = getTotalPrice(orderDetails.foodItems);
        }
    }, [orderDetails]);

    const {
        container,
    } = styles;

    return (
        orderDetails ? <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={container}>
                        {orderDetails.restaurant &&
                        <Header orderDetails={orderDetails} />
                        }
                        <Body tableHeadData={tableHead} tableData={tableData} />
                        <PriceArea orderDetails={orderDetails} totalPrice={totalPrice} />
                        <TotalPriceArea orderDetails={orderDetails} />
                        <Footer orderDetails={orderDetails} user={user} />
                    </View>
                </ScrollView>
            </SafeAreaView> :
            <Loader />
    );
};

export default OrderDetails;

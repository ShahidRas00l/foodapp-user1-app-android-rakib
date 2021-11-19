import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
    View,
    SafeAreaView,
    ScrollView,
    BackHandler,
    RefreshControl,
} from "react-native";

import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/stack";

import Loader from "../../utilities/components/Loader";
import OrderData from "./OrderData";
import globalStyles from "../../styles/globalStyles";
import { GlobalContext } from "../../context/GlobalContext";
import { apiBaseUrl } from "../../config";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

const MyOrder = ({ navigation, route }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { globalState } = useContext(GlobalContext);
    const { user } = globalState;
    const [refreshing, setRefreshing] = React.useState(false);

    const {
        paddingHorizontal5,
        paddingBottom3,
    } = globalStyles;

    const onBackPress = () => {
        if (route.params && Object.keys(route.params).length > 0 && route.params.isOrderPlaced) {
            navigation.navigate("Settings");
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

    const getMyOrders = async userId => {
        try {
            const response = await axios.get(`${apiBaseUrl}order/fetch-by-user/${userId}`);
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
        getMyOrders(user["_id"]).then(res => console.log("ALL ORDERS: ", res));
    }, [user]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getMyOrders(user["_id"]).then(res => console.log("ALL ORDERS: ", res));
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        isLoading ? <Loader /> :
            <SafeAreaView>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={[paddingHorizontal5, paddingBottom3]}>
                        <OrderData data={data}
                                   navigation={navigation}
                                   getMyOrders={getMyOrders}
                                   userId={user["_id"]}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
    );
};

export default MyOrder;

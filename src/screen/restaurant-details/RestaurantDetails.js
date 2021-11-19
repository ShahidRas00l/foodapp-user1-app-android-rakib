import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Text, View } from "react-native";

import styles from "./styles";
import globalStyles from "../../styles/globalStyles";

import Loader from "../../utilities/components/Loader";
import RestaurantDetailsBody from "./RestaurantDetailsBody";

import { GlobalContext } from "../../context/GlobalContext";

const RestaurantDetails = ({ navigation, route }) => {
    const [restaurantInfoLoading, setRestaurantInfoLoading] = useState(true);
    const { globalState } = useContext(GlobalContext);
    const { restaurantId } = route.params;

    const {
        service_type,
        serviceListArea,
        restaurantInfo
    } = globalState;

    const {
        menuBarServiceArea,
    } = styles;

    const {
        f16,
        textWhite
    } = globalStyles;

    useLayoutEffect(() => {
        const activeService = serviceListArea.find(item => item.isActive && item);

        navigation.setOptions({
            title: restaurantInfo ? restaurantInfo.name : "Restaurant",
            headerRight: () => (
                activeService ? <View style={menuBarServiceArea}>
                    <Text style={[f16, textWhite]}>{activeService.name}</Text>
                </View> : ""
            ),
        });
    }, [service_type]);

    useEffect(() => {
        setRestaurantInfo(null);
        if (restaurantId) {
            getRestaurantById(restaurantId).then(res => {
                if (Object.keys(res.data).length > 0) {
                    setRestaurantInfo(res.data);
                    if (res.data.categories && res.data.categories.length > 0) {
                        const item = res.data.categories.find((item, index) => index === 0 && item);
                        setActiveCategory(item);
                    }
                }
            });
            setRestaurantInfoLoading(false);
        }
    }, [restaurantId]);

    return (
        restaurantInfoLoading ? <Loader /> : <RestaurantDetailsBody
            navigation={navigation}
        />
    );
};

export default RestaurantDetails;


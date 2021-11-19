import React from "react";
import { Image, Text, View } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "./styles";
import globalStyles from "../../styles/globalStyles";
import { baseUrl } from "../../config";

// Image
import restaurantBgImage from "../../assets/image/restaurant-bg.png";

const RestaurantDetailsHeader = ({restaurantInfo}) => {
    return (
        <>
            <View>
                <Image style={styles.favouriteAreaImage}
                       source={restaurantInfo.banner ? { uri: `${baseUrl}${restaurantInfo.banner}` } : restaurantBgImage} />
                <View style={styles.logoArea}>
                    <Image style={styles.logoImage}
                           source={restaurantInfo.logo ? { uri: `${baseUrl}${restaurantInfo.logo}` } : restaurantBgImage} />
                </View>
            </View>
            <View style={styles.restaurantInfoArea}>
                <View style={styles.restaurantInfoHeader}>
                    <Text style={styles.restaurantInfoName}>
                        {restaurantInfo.name}
                        {restaurantInfo.discount &&
                        <Text
                            style={globalStyles.textRed}> {restaurantInfo.discount}% {restaurantInfo.discountType}</Text>
                        }
                    </Text>
                    {restaurantInfo.address &&
                    <Text style={styles.restaurantInfoAddress}>
                        {restaurantInfo.address}
                    </Text>
                    }
                    <Text style={[styles.restaurantInfoAddress, globalStyles.paddingBottom05]}>
                        {restaurantInfo.openingTime} to {restaurantInfo.closingTime}
                    </Text>
                </View>
                <View style={globalStyles.paddingTop1}>
                    <View style={globalStyles.flexDirectionRow}>
                        {restaurantInfo.speciality.length > 0 && restaurantInfo.speciality.map((item, index) => (
                            <View
                                style={[globalStyles.flexDirectionRow, index !== 0 && globalStyles.paddingLeft2]}
                                key={index}>
                                <AntDesign name="staro" size={16} color="black" />
                                <Text style={globalStyles.paddingLeft05}>{item}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.deliveryTimeArea}>
                    <View
                        style={[globalStyles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3, globalStyles.marginLeft06]}>
                        <Feather name="shopping-bag" size={16} color="#D2181B" />
                    </View>
                    <Text style={styles.deliveryTimeAreaText}>
                        {restaurantInfo.pickupTime} Mins
                    </Text>
                    <View
                        style={[globalStyles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}>
                        <MaterialCommunityIcons name="bike-fast" size={16} color="#D2181B" />
                    </View>
                    <Text style={styles.deliveryTimeAreaText}>
                        Free, {restaurantInfo.deliveryTime[0]} Mins
                    </Text>
                    <View
                        style={[globalStyles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}>
                        <MaterialCommunityIcons name="map-marker-radius-outline" size={16} color="#D2181B" />
                    </View>
                    <Text style={styles.deliveryTimeAreaText}>
                        {restaurantInfo.areaLimit ? restaurantInfo.areaLimit : "N/A"}
                    </Text>
                    {restaurantInfo.minOrder &&
                    <>
                        <View
                            style={[globalStyles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}>
                            <FontAwesome name="shopping-basket" size={16} color="#D2181B" />
                        </View>
                        <Text style={styles.deliveryTimeAreaText}>
                            £{restaurantInfo.minOrder}
                        </Text>
                    </>
                    }
                </View>
            </View>
        </>
    );
};


export default RestaurantDetailsHeader;

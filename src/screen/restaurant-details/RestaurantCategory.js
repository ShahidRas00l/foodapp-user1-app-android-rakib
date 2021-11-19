import React, { Fragment } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import globalStyles from "../../styles/globalStyles";

const RestaurantCategory = () => {
    return (
        <View style={[globalStyles.paddingHorizontal5, { backgroundColor: "#F2F2F2" }]}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.categoryArea}
            >
                {restaurantInfo.categories.map((item, index) => (
                    <Fragment key={index}>
                        <TouchableOpacity
                            onPress={() => {
                                setActiveCategory(item);
                                setRestaurantHeaderShow(false);
                                setSpecialOfferActive(false);
                            }}
                            style={[styles.categoryAreaSingle, globalStyles.elevation3, activeCategoryBg(item), index === 0 && globalStyles.marginLeft06]}>
                            <Text
                                style={[globalStyles.textDark, globalStyles.fw600, activeCategoryText(item)]}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    </Fragment>
                ))}
                {restaurantInfo.packages && restaurantInfo.packages.length > 0 &&
                <TouchableOpacity
                    onPress={() => getAllPackages()}
                    style={[styles.categoryAreaSingle, globalStyles.elevation3, specialOfferActive ? globalStyles.bgRed : globalStyles.bgWhite]}>
                    <Text
                        style={[globalStyles.textDark, globalStyles.fw600, specialOfferActive ? globalStyles.textWhite : globalStyles.textDark]}>
                        Special Offers
                    </Text>
                </TouchableOpacity>
                }
            </ScrollView>
        </View>
    );
};


export default RestaurantCategory;

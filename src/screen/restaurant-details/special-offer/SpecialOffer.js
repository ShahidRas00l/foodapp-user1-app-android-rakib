import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import styles from "../styles";
import globalStyles from "../../../styles/globalStyles";
import Loader from "../../../utilities/components/Loader";

const ComponentName = () => {
    return (
        <>
            <View style={[globalStyles.paddingHorizontal5, globalStyles.paddingTop2]}>
                <Text style={[styles.dataHeaderText, globalStyles.textRed]}>Special Offers</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={globalStyles.paddingHorizontal5}>
                    {foodItemLoading ?
                        <Loader style={globalStyles.marginTop5} /> : packageList.map((item, index) => (
                            <TouchableOpacity style={styles.detailsArea} key={index}
                                              onPress={() => toggleSpecialOffer(index)}>
                                <View style={styles.detailsAreaLeft}>
                                    <Text style={styles.detailsAreaTitle}>{item.name}</Text>
                                    {item.description !== "" &&
                                    <Text style={styles.detailsAreaDescription}>{item.description}</Text>
                                    }
                                    <Text style={styles.detailsAreaAmount}>£{item.price}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                </View>
            </ScrollView>
        </>
    );
};


export default ComponentName;

import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../styles/globalStyles";
import styles from "./styles";
import Loader from "../../utilities/components/Loader";

const RestaurantCategoryItems = () => {
    return (
        <>
            <View style={[globalStyles.paddingHorizontal5, globalStyles.paddingTop2]}>
                <Text style={[styles.dataHeaderText, globalStyles.textRed]}>{activeCategory.name}</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={globalStyles.paddingHorizontal5}>
                    {foodItemLoading ?
                        <Loader style={globalStyles.marginTop5} /> : foodItemList.map((item, index) => (
                            <TouchableOpacity style={styles.detailsArea} key={index}
                                              onPress={() => toggleAddToCart(index)}>
                                <View style={styles.detailsAreaLeft}>
                                    <Text style={styles.detailsAreaTitle}>{item.title}</Text>
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


export default RestaurantCategoryItems;

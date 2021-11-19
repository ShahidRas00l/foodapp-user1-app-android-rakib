import React from "react";
import styles from "./styles";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../styles/globalStyles";

const RestaurantService = () => {
    return (
        <View style={styles.restaurantInfoArea}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.serviceTypeArea}>
                    <Text>Services Type</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.serviceArea}
                        pagingEnabled={true}>
                        {serviceListArea.map((item, index) => (
                            item.isEnabled && <TouchableOpacity
                                onPress={() => {
                                    if (item.key === "table_booking") setBookingModalVisible(true);
                                    updateServiceType(index);
                                }
                                }
                                key={index}
                                style={[styles.serviceAreaSingle, globalStyles.marginLeft06, item.isActive && styles.activeService]}>
                                <Text
                                    style={[globalStyles.textDark, globalStyles.fw600, globalStyles.f16, item.isActive && globalStyles.textWhite]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
};


export default RestaurantService;

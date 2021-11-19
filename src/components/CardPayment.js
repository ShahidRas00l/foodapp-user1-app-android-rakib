import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View, StyleSheet, TextInput, TouchableOpacity, Pressable } from "react-native";
import globalStyles from "../styles/globalStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Modal from "react-native-modal";
import axios from "axios";
import { apiBaseUrl } from "../config";
import { showToastWithGravityAndOffset } from "../utilities/components/ToastMessage";

const currentYear = (new Date()).getFullYear().toString();
const CardPayment = ({ navigation, route }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [monthList] = useState(["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]);
    const [yearList, setYearList] = useState([]);
    const [state, setState] = useState({
        cardNumber: "",
        month: "01",
        year: currentYear,
        cvc: "",
    });
    const { orderPayload } = route.params;

    const { cardNumber, month, year, cvc } = state;

    useEffect(() => {
        let updateYearList = [];
        let currentYear = (new Date()).getFullYear();
        let maximumYear = (new Date()).getFullYear() + 10;

        for (currentYear; currentYear < maximumYear; currentYear++) {
            updateYearList.push(currentYear.toString());
        }

        setYearList(updateYearList);
    }, []);

    const placeOrder = async () => {
        const paymentPayload = {
            name: orderPayload.customerName,
            cardNumber: cardNumber,
            month: month,
            year: year,
            cvc: cvc,
            grandTotal: parseInt(orderPayload.price),
        };

        try {
            const paymentResponse = await axios.post(`${apiBaseUrl}admin/payment`, paymentPayload);
            if (paymentResponse.data) {
                try {
                    const response = await axios.post(`${apiBaseUrl}order/create`, orderPayload);

                    if (response.data) {
                        showToastWithGravityAndOffset("Order placed successfully!");
                        navigation.navigate("MyOrder", { isOrderPlaced: true });
                    }
                } catch (error) {
                    if (error.response.data) {
                        console.log(error.response.data);
                    }
                }
            }
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
                if (error.response.data.error) showToastWithGravityAndOffset(error.response.data.error);
            }
        }
    };

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[globalStyles.card, globalStyles.boxShadow, styles.cardPaymentArea]}>
                    <View style={globalStyles.cardHeader}>
                        <Text style={globalStyles.cardHeaderLabel}>Payment with card</Text>
                    </View>
                    <View style={globalStyles.paddingTop3}>
                        <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Card Number</Text>
                        <TextInput
                            value={cardNumber}
                            placeholder={"Ex. 4242 4242 4242 4242"}
                            style={styles.inputField}
                            keyboardType={"default"}
                            onChangeText={text => setState({ ...state, cardNumber: text })}
                        />
                    </View>
                    <View style={globalStyles.paddingTop3}>
                        <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Card Expiry Date</Text>
                        <Pressable onPress={() => setModalVisible(!isModalVisible)}>
                            <TextInput
                                value={`${month}/${year}`}
                                placeholder={"Ex. 01/21"}
                                style={styles.inputField}
                                editable={false}
                                keyboardType={"default"}
                            />
                        </Pressable>
                    </View>
                    <View style={globalStyles.paddingTop3}>
                        <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>CVC</Text>
                        <TextInput
                            value={cvc}
                            placeholder={"Ex. 312"}
                            style={styles.inputField}
                            keyboardType={"default"}
                            onChangeText={text => setState({ ...state, cvc: text })}
                        />
                    </View>
                    <View style={styles.continueButtonArea}>
                        <TouchableOpacity
                            style={[styles.continueButton]}
                            onPress={() => placeOrder()}
                        >
                            <Text style={styles.continueText}>Confirm Payment</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Modal
                isVisible={isModalVisible}
                style={styles.modalView}>
                <View>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>Expiry Month/Year</Text>
                    </View>
                    <View style={styles.modalBody}>
                        <View style={styles.monthArea}>
                            <Text style={styles.monthAreaHeaderText}>Month</Text>
                            <ScrollView style={styles.monthAreaContent}>
                                {monthList.map((item, index) => (
                                    <TouchableOpacity
                                        style={styles.monthAreaContentBlock}
                                        key={index}
                                        onPress={() => setState({ ...state, month: item })}
                                    >
                                        <Text
                                            style={[styles.monthAreaContentText, month === item && styles.monthAreaContentTextActive]}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        <View style={styles.monthArea}>
                            <Text style={styles.monthAreaHeaderText}>Year</Text>
                            <ScrollView style={styles.monthAreaContent}>
                                {yearList.map((item, index) => (
                                    <TouchableOpacity
                                        style={styles.monthAreaContentBlock}
                                        key={index}
                                        onPress={() => setState({ ...state, year: item })}
                                    >
                                        <Text
                                            style={[styles.monthAreaContentText, year === item && styles.monthAreaContentTextActive]}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.modalFooter}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(!isModalVisible)}
                        >
                            <Text style={styles.continueText}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    cardPaymentArea: {
        marginHorizontal: wp("5%"),
        marginVertical: hp("2%"),
    },
    inputField: {
        paddingVertical: hp("1%"),
        paddingLeft: wp("4%"),
        borderColor: "#d9d3d3",
        borderWidth: 1,
        borderRadius: 8,
    },
    inputLabel: {
        color: "#555555",
    },
    continueButtonArea: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: hp("3%"),
    },
    continueButton: {
        backgroundColor: "#D2181B",
        paddingVertical: hp("1.5%"),
        paddingHorizontal: wp("10%"),
        borderRadius: 8,
    },
    continueText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
    },
    modalView: {
        marginVertical: hp("0%"),
        marginHorizontal: wp("5%"),
        justifyContent: "center",
    },
    modalHeader: {
        backgroundColor: "#fff",
        paddingVertical: hp("2%"),
        paddingLeft: wp("5%"),
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderWidth: 1,
        borderColor: "#ece6e6",
    },
    modalHeaderText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#2e3333",
    },
    modalBody: {
        backgroundColor: "#fff",
        paddingVertical: hp("2%"),
        paddingHorizontal: wp("5%"),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalFooter: {
        paddingVertical: hp("2%"),
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "center",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    closeButton: {
        backgroundColor: "#D2181B",
        paddingVertical: hp("1%"),
        paddingHorizontal: wp("5%"),
        borderRadius: 8,
    },
    monthArea: {
        width: wp("35%"),
    },
    monthAreaHeaderText: {
        fontSize: 17,
        paddingBottom: wp("1%"),
        textAlign: "center",
        paddingRight: wp("5%"),
    },
    monthAreaContent: {
        height: 100,
    },
    monthAreaContentBlock: {
        width: wp("30%"),
    },
    monthAreaContentText: {
        fontSize: 16,
        color: "#000",
        textAlign: "center",
        paddingVertical: hp("0.5%"),
        borderRadius: 8,
    },
    monthAreaContentTextActive: {
        backgroundColor: "#D2181B",
        color: "#fff",
    },
});

export default CardPayment;

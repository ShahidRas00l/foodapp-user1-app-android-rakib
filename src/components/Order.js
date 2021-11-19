import React, { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import globalStyles from "../styles/globalStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { GlobalContext } from "../context/GlobalContext";
import { showToastWithGravityAndOffset } from "../utilities/components/ToastMessage";

// Image
import tableBookingImage from "../assets/image/table-booking.png";
import axios from "axios";
import { apiBaseUrl } from "../config";

const Order = ({ navigation, route }) => {
    const [customerInputEditable, setCustomerInputEditable] = useState(false);
    const [contactInputEditable, setContactInputEditable] = useState(false);
    const [deliveryAddressInputEditable, setDeliveryAddressInputEditable] = useState(false);
    const [tableNumberEditable, setTableNumberEditable] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [restaurantInfo, setRestaurantInfo] = useState(null);
    const { globalState } = useContext(GlobalContext);
    const { service_type, user } = globalState;
    const { restaurantId } = route.params;
    const [state, setState] = useState({
        customerName: user.name,
        address: user.address,
        postCode: user.postCode,
        phoneNumber: user.mobile,
        date_time: "",
        tableNo: "",
        restaurantId,
    });

    const {
        customerName,
        address,
        postCode,
        phoneNumber,
        date_time,
        tableNo,
    } = state;

    const getRestaurantById = async id => {
        try {
            const response = await axios.get(`${apiBaseUrl}restaurant/fetch/${id}`);
            return response.data;
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    useEffect(() => {
        if (restaurantId) {
            getRestaurantById(restaurantId).then(res => {
                if (Object.keys(res.data).length > 0) setRestaurantInfo(res.data);
            });
        }
    }, [restaurantId]);

    const proceedToPayment = async () => {
        if (service_type === "dine_in" && !tableNo) {
            showToastWithGravityAndOffset("Table number is required!");
            return false;
        }

        let distance = 0;
        if (service_type === "delivery") {

            if (postCode && restaurantInfo.postCode) {
                const distanceResponse = await axios.get(`${apiBaseUrl}restaurant/fetch-distance?postCode1=${restaurantInfo.postCode}&postCode2=${postCode}`);
                distance = distanceResponse.data.distance;
            }

            if (distance > 7) {
                showToastWithGravityAndOffset("Out of service, You are too far!");
                return false;
            }
        }

        state.distance = distance;

        navigation.navigate("Payment", { orderState: state });
    };

    let deliveryTime = 0;
    let pickupTime = 0;

    if (restaurantInfo) {
        if (restaurantInfo.deliveryTime.length > 0) deliveryTime = parseInt(restaurantInfo.deliveryTime);
        if (restaurantInfo.pickupTime) pickupTime = parseInt(restaurantInfo.pickupTime);
    }

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={globalStyles.paddingHorizontal5}>
                    {service_type === "dine_in" ?
                        <View style={[globalStyles.card, globalStyles.boxShadow, globalStyles.marginTop3]}>
                            <View style={globalStyles.cardHeader}>
                                <View style={globalStyles.flexDirectionRow}>
                                    <View
                                        style={[styles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation5, globalStyles.marginLeft06]}>
                                        <Image source={tableBookingImage} style={styles.bookingIconImage} />
                                    </View>
                                    <Text style={styles.cardHeaderLabel}>Table Number</Text>
                                </View>
                                <TouchableOpacity style={[globalStyles.flexDirectionRow, globalStyles.paddingTop05]}
                                                  onPress={() => setTableNumberEditable(!tableNumberEditable)}>
                                    {!tableNumberEditable &&
                                    <MaterialIcons name="edit" size={20} color="#555555" />}
                                    {tableNumberEditable &&
                                    <Feather
                                        style={globalStyles.marginRight1}
                                        name="check-circle" size={20}
                                        color="#555555"
                                    />
                                    }
                                    <Text style={styles.cardHeaderEditText}>
                                        {tableNumberEditable ? "Save" : "Edit"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={globalStyles.paddingTop3}>
                                <TextInput
                                    value={tableNo}
                                    onChangeText={value => setState({ ...state, tableNo: value })}
                                    editable={tableNumberEditable}
                                    style={styles.inputField}
                                    placeholder={"Enter Table No"}
                                    keyboardType={"default"}
                                />
                            </View>
                        </View>
                        :
                        <>
                            <View style={[globalStyles.card, globalStyles.boxShadow, globalStyles.marginTop3]}>
                                <View style={globalStyles.cardHeader}>
                                    <View style={globalStyles.flexDirectionRow}>
                                        <View
                                            style={[styles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation5, globalStyles.marginLeft06]}>
                                            <Feather name="user" size={20} color="#D2181B" />
                                        </View>
                                        <Text style={styles.cardHeaderLabel}>Customer Name</Text>
                                    </View>
                                    <TouchableOpacity style={[globalStyles.flexDirectionRow, globalStyles.paddingTop05]}
                                                      onPress={() => setCustomerInputEditable(!customerInputEditable)}>
                                        {!customerInputEditable &&
                                        <MaterialIcons name="edit" size={20} color="#555555" />}
                                        {customerInputEditable &&
                                        <Feather style={globalStyles.marginRight1} name="check-circle" size={20}
                                                 color="#555555" />
                                        }
                                        <Text
                                            style={styles.cardHeaderEditText}>{customerInputEditable ? "Save" : "Edit"}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={globalStyles.paddingTop3}>
                                    <TextInput
                                        value={customerName}
                                        onChangeText={value => setState({ ...state, customerName: value })}
                                        editable={customerInputEditable}
                                        style={styles.inputField}
                                        keyboardType={"default"}
                                    />
                                </View>
                            </View>
                            {service_type === "delivery" &&
                            <>
                                <View style={[globalStyles.card, globalStyles.boxShadow, globalStyles.marginTop3]}>
                                    <View style={globalStyles.cardHeader}>
                                        <View style={globalStyles.flexDirectionRow}>
                                            <Ionicons style={globalStyles.paddingTop02} name="md-location-outline"
                                                      size={26}
                                                      color="#D2181B" />
                                            <Text style={[styles.cardHeaderLabel, globalStyles.paddingLeft05]}>
                                                Delivery Address
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            style={[globalStyles.flexDirectionRow, globalStyles.paddingTop05]}
                                            onPress={() => setDeliveryAddressInputEditable(!deliveryAddressInputEditable)}>
                                            {!deliveryAddressInputEditable &&
                                            <MaterialIcons name="edit" size={20} color="#555555" />}
                                            {deliveryAddressInputEditable &&
                                            <Feather style={globalStyles.marginRight1} name="check-circle" size={20}
                                                     color="#555555" />
                                            }
                                            <Text
                                                style={styles.cardHeaderEditText}>{deliveryAddressInputEditable ? "Save" : "Edit"}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={globalStyles.paddingTop3}>
                                        <TextInput
                                            value={address}
                                            onChangeText={value => setState({ ...state, address: value })}
                                            editable={deliveryAddressInputEditable}
                                            numberOfLines={4}
                                            multiline={true}
                                            style={styles.inputField}
                                            keyboardType={"default"}
                                        />
                                    </View>
                                    <View style={globalStyles.paddingTop2}>
                                        <TextInput
                                            value={postCode}
                                            onChangeText={value => setState({ ...state, postCode: value })}
                                            editable={deliveryAddressInputEditable}
                                            style={styles.inputField}
                                            keyboardType={"default"}
                                        />
                                    </View>
                                </View>
                                <View style={[globalStyles.card, globalStyles.boxShadow, globalStyles.marginTop3]}>
                                    <View style={globalStyles.cardHeader}>
                                        <View style={globalStyles.flexDirectionRow}>
                                            <FontAwesome style={globalStyles.paddingTop02} name="calendar" size={24}
                                                         color="#D2181B" />
                                            <Text style={styles.cardHeaderLabel}>Time Schedule</Text>
                                        </View>
                                    </View>
                                    <View style={styles.timeScheduleArea}>
                                        <View
                                            style={[styles.timeScheduleAreaSingle, globalStyles.boxShadow, deliveryTime === 45 && globalStyles.borderRed]}>
                                            <Text style={styles.timeScheduleText}>Normal Delivery</Text>
                                            <Text style={styles.timeScheduleTime}>45 mins</Text>
                                        </View>
                                        <View
                                            style={[styles.timeScheduleAreaSingle, globalStyles.boxShadow, deliveryTime === 60 && globalStyles.borderRed]}>
                                            <Text style={styles.timeScheduleText}>Busy Time</Text>
                                            <Text style={styles.timeScheduleTime}>60 mins</Text>
                                        </View>
                                        <View
                                            style={[styles.timeScheduleAreaSingle, globalStyles.boxShadow, deliveryTime === 90 && globalStyles.borderRed]}>
                                            <Text style={styles.timeScheduleText}>Extreme Busy</Text>
                                            <Text style={styles.timeScheduleTime}>90 mins</Text>
                                        </View>
                                    </View>
                                </View>
                            </>
                            }

                            {service_type === "collection" &&
                            <View style={[globalStyles.card, globalStyles.boxShadow, globalStyles.marginTop3]}>
                                <View style={globalStyles.cardHeader}>
                                    <View style={globalStyles.flexDirectionRow}>
                                        <FontAwesome style={globalStyles.paddingTop02} name="calendar" size={24}
                                                     color="#D2181B" />
                                        <Text style={styles.cardHeaderLabel}>Time Schedule</Text>
                                    </View>
                                </View>
                                <View style={styles.timeScheduleArea}>
                                    <View
                                        style={[styles.timeScheduleAreaSingle, globalStyles.boxShadow, pickupTime === 20 && globalStyles.borderRed]}>
                                        <Text style={styles.timeScheduleText}>Quick</Text>
                                        <Text style={styles.timeScheduleTime}>20 mins</Text>
                                    </View>
                                    <View
                                        style={[styles.timeScheduleAreaSingle, globalStyles.boxShadow, pickupTime === 30 && globalStyles.borderRed]}>
                                        <Text style={styles.timeScheduleText}>Normal</Text>
                                        <Text style={styles.timeScheduleTime}>30 mins</Text>
                                    </View>
                                    <View
                                        style={[styles.timeScheduleAreaSingle, globalStyles.boxShadow, pickupTime === 40 && globalStyles.borderRed]}>
                                        <Text style={styles.timeScheduleText}>Busy</Text>
                                        <Text style={styles.timeScheduleTime}>40 mins</Text>
                                    </View>
                                </View>
                            </View>
                            }

                            <View style={[globalStyles.card, globalStyles.boxShadow, globalStyles.marginTop3]}>
                                <View style={globalStyles.cardHeader}>
                                    <View style={globalStyles.flexDirectionRow}>
                                        <Feather style={globalStyles.paddingTop02} name="smartphone" size={24}
                                                 color="#D2181B" />
                                        <Text style={[styles.cardHeaderLabel, globalStyles.paddingLeft05]}>
                                            Contact Number
                                        </Text>
                                    </View>
                                    <TouchableOpacity style={[globalStyles.flexDirectionRow, globalStyles.paddingTop05]}
                                                      onPress={() => setContactInputEditable(!contactInputEditable)}>
                                        {!contactInputEditable &&
                                        <MaterialIcons name="edit" size={20} color="#555555" />}
                                        {contactInputEditable &&
                                        <Feather style={globalStyles.marginRight1} name="check-circle" size={20}
                                                 color="#555555" />
                                        }
                                        <Text
                                            style={styles.cardHeaderEditText}>{contactInputEditable ? "Save" : "Edit"}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={globalStyles.paddingTop2}>
                                    <Text style={styles.contactText}>Primary Contact Number</Text>
                                    <TextInput
                                        value={phoneNumber}
                                        onChangeText={value => setState({ ...state, phoneNumber: value })}
                                        editable={contactInputEditable}
                                        style={styles.inputField}
                                        keyboardType={"default"}
                                    />
                                </View>
                            </View>
                        </>
                    }
                    <View style={styles.continueButtonArea}>
                        <TouchableOpacity style={[styles.continueButton]}
                                          onPress={() => proceedToPayment()}>
                            <Text style={styles.continueText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Modal
                isVisible={isModalVisible}
                style={styles.modalView}>
                <View>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>Add Custom Time Schedule</Text>
                    </View>
                    <View style={styles.modalBody}>
                        <Text style={styles.contactText}>Date Time</Text>
                        <View
                            style={[styles.dateTimeArea, globalStyles.boxShadow]}>
                            <TextInput
                                style={styles.dateTimeInput}
                                value={date_time}
                                editable={false}
                                keyboardType={"default"}
                            />
                            <TouchableOpacity onPress={() => setDatePickerVisibility(!isDatePickerVisible)}>
                                <Fontisto style={styles.dateTimeIcon} name="date" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="datetime"
                            onConfirm={date_time => {
                                setState({ ...state, date_time: moment(date_time).format("MMMM Do YYYY, h:mm:ss a") });
                                setDatePickerVisibility(!isDatePickerVisible);
                            }}
                            onCancel={() => setDatePickerVisibility(!isDatePickerVisible)}
                        />
                    </View>
                    <View style={styles.modalFooter}>
                        <TouchableOpacity style={styles.saveTimeScheduleButton}
                                          onPress={() => setModalVisible(!isModalVisible)}>
                            <Text style={styles.continueText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton}
                                          onPress={() => setModalVisible(!isModalVisible)}>
                            <Text style={styles.continueText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    deliveryTypeArea: {
        flexDirection: "row",
        paddingTop: hp("2%"),
    },
    circleIconArea: {
        backgroundColor: "#fff",
        width: 30,
        height: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    cardHeaderLabel: {
        color: "#555555",
        fontSize: 18,
        fontWeight: "bold",
        paddingLeft: wp("2%"),
        paddingTop: hp("0.5%"),
    },
    cardHeaderEditText: {
        color: "#555555",
        fontSize: 16,
        fontWeight: "bold",
        paddingLeft: wp("0.3%"),
    },
    inputField: {
        paddingVertical: hp("1%"),
        paddingLeft: wp("4%"),
        borderColor: "#d9d3d3",
        borderWidth: 1,
        borderRadius: 8,
    },
    cardHeaderAddText: {
        color: "#D2181B",
        fontSize: 16,
        fontWeight: "bold",
        paddingLeft: wp("0.3%"),
    },
    timeScheduleArea: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: hp("2%"),
    },
    timeScheduleAreaSingle: {
        paddingTop: hp("1%"),
        paddingBottom: hp("3%"),
        paddingHorizontal: wp("5%"),
        borderRadius: 15,
        width: wp("25%"),
    },
    timeScheduleText: {
        paddingBottom: hp("1%"),
    },
    timeScheduleTime: {
        fontSize: 18,
        fontWeight: "700",
    },
    contactText: {
        fontSize: 16,
        fontWeight: "600",
        paddingBottom: hp("1%"),
    },
    continueButtonArea: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: hp("3%"),
        marginBottom: hp("8%"),
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
    },
    modalFooter: {
        paddingVertical: hp("2%"),
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "center",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    saveTimeScheduleButton: {
        backgroundColor: "#27C96D",
        paddingVertical: hp("1%"),
        paddingHorizontal: wp("5%"),
        borderRadius: 8,
        marginRight: wp("3%"),
    },
    closeButton: {
        backgroundColor: "#D2181B",
        paddingVertical: hp("1%"),
        paddingHorizontal: wp("5%"),
        borderRadius: 8,
    },
    dateTimeButton: {
        backgroundColor: "#27C96D",
        paddingVertical: hp("1.5%"),
        paddingHorizontal: wp("5%"),
        borderRadius: 8,
        width: wp("35%"),
    },
    dateTimeArea: {
        flexDirection: "row",
        borderRadius: 5,
    },
    dateTimeInput: {
        paddingVertical: hp("1%"),
        paddingLeft: wp("4%"),
        width: wp("70%"),
    },
    dateTimeIcon: {
        paddingVertical: hp("1.5%"),
        width: wp("10%"),
        textAlign: "center",
        backgroundColor: "#D2181B",
        color: "#fff",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    bookingIconImage: {
        width: 20,
        height: 20,
    },
});

export default Order;

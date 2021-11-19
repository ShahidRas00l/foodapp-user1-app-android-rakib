import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, Pressable } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import globalStyles from "../styles/globalStyles";
import { GlobalContext } from "../context/GlobalContext";
import { showToastWithGravityAndOffset } from "../utilities/components/ToastMessage";
import axios from "axios";
import { apiBaseUrl } from "../config";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CheckBox from "@react-native-community/checkbox";

// Image
import cashImage from "../assets/image/cash.png";
import cardImage from "../assets/image/card.png";

const Payment = ({ navigation, route }) => {
    const [restaurantInfo, setRestaurantInfo] = useState(null);
    const [cartList, setCartList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentType, setPaymentType] = useState([
        {
            id: 1,
            value: "cash",
            name: "Cash",
            img: cashImage,
            selected: false,
        },
        {
            id: 2,
            value: "card",
            name: "Card",
            img: cardImage,
            selected: false,
        },
        {
            id: 3,
            value: "counter",
            name: "Counter",
            img: null,
            icon: <FontAwesome5 name="cash-register" size={24} color="#524F4FFF" />,
            selected: false,
        },
    ]);
    const [isTermAndConditions, setTermAndConditions] = useState(false);
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const { service_type, user, kitchenNotes } = globalState;

    const {
        orderState: {
            customerName,
            address,
            phoneNumber,
            restaurantId,
            tableNo,
            distance,
        },
    } = route.params;

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

    const getRestaurantCart = async id => {
        try {
            const response = await axios.get(`${apiBaseUrl}food/fetch-restaurant-cart/${user["_id"]}?restaurant=${id}`);
            return response.data;
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    const setRestaurantCart = data => {
        setCartList(data);
        return true;
    };

    useEffect(() => {
        if (restaurantId) {
            getRestaurantById(restaurantId).then(res => {
                if (Object.keys(res.data).length > 0) setRestaurantInfo(res.data);
            });
        }
    }, [restaurantId]);

    useEffect(() => {
        if (restaurantId && user && Object.keys(user).length > 0) {
            getRestaurantCart(restaurantId).then(res => setRestaurantCart(res.data));
        }
    }, [restaurantId, user]);

    useEffect(() => {
        console.log(service_type);
        const updatePaymentType = paymentType.filter(item => {
            if (service_type === "delivery") {
                if (item.value === "card") return item;
            }

            if (service_type === "collection") {
                if (["cash", "card"].includes(item.value)) return item;
            }

            if (service_type === "dine_in") {
                if (["card", "counter"].includes(item.value)) return item;
            }
        });
        setPaymentType(updatePaymentType);
    }, [service_type]);

    useEffect(() => {
        let totalPrice = 0;
        cartList.forEach(item => totalPrice += (parseInt(item.count) * parseFloat(item.price)));
        setTotalPrice(parseFloat(totalPrice.toFixed(2)));
    }, [cartList]);

    const onRadioBtnClick = item => {
        const updateState = paymentType.map(value => (
            item.id === value.id ? { ...value, selected: true } : { ...value, selected: false }
        ));
        setPaymentType(updateState);
    };

    let discount;
    let deliveryCharge;
    let serviceCharge;
    let totalPayment;

    if (restaurantInfo) {
        discount = restaurantInfo.discount ? (totalPrice * (parseInt(restaurantInfo.discount) / 100)) : 0.00;
        deliveryCharge = restaurantInfo.deliveryCharge ? parseFloat(restaurantInfo.deliveryCharge) : 0.00;
        serviceCharge = 0.50;
        totalPayment = totalPrice;

        if (service_type === "delivery") totalPayment += deliveryCharge;
        if (service_type !== "dine_in") {
            totalPayment -= discount;
            totalPayment += serviceCharge;
        }
    }

    const placeOrder = async () => {
        try {
            const paymentOptions = paymentType.find(item => item.selected === true);

            if (!paymentOptions) {
                showToastWithGravityAndOffset("Payment option required!");
                return false;
            }

            if (!isTermAndConditions) {
                showToastWithGravityAndOffset("Please select terms and conditions!");
                return false;
            }

            const foodItems = cartList.map(item => {
                return {
                    title: item.foodItems.title,
                    option: item.foodItems.option ? item.foodItems.option : null,
                    price: item.foodItems.option ? (parseFloat(item.foodItems.price) + parseFloat(item.foodItems.option.price)) : parseFloat(item.foodItems.price),
                    quantity: item.count,
                    products: item.foodItems.products,
                    allergy: item.foodItems.allergy,
                };
            });

            if (service_type === "dine_in") {
                const cartIds = [];
                cartList.forEach(item => cartIds.push(item._id));

                const payload = {
                    tableNo,
                    restaurant: restaurantId,
                    foodItems,
                    cartIds,
                    paymentMethod: paymentOptions.value === "counter" ? "Counter" : paymentOptions.value,
                    orderFrom: "user",
                    orderStatus: "pending",
                    kitchenNotes,
                };

                const response = await axios.post(`${apiBaseUrl}order/create-dine-in`, payload);

                if (response.data) {
                    showToastWithGravityAndOffset("Order placed successfully!");
                    navigation.navigate("OrderDetails", { orderDetails: response.data.data });
                }
            } else {
                const payload = {
                    customerName,
                    orderNumber: Math.random().toString(36).substring(7),
                    distance,
                    address,
                    deliveryTime: (restaurantInfo.deliveryTime.length > 0 && restaurantInfo.deliveryTime[0]) || "",
                    phoneNumber,
                    user: user["_id"],
                    orderStatus: "pending",
                    restaurant: restaurantId,
                    discount: restaurantInfo.discount ? ((totalPrice * (parseInt(restaurantInfo.discount) / 100)).toFixed(2)) : "0.00",
                    kitchenNotes,
                    orderType: service_type === "collection" ? "pickup" : service_type,
                    deliveryCharge: restaurantInfo.deliveryCharges || 0,
                    price: totalPayment,
                    totalPrice: totalPayment,
                    foodItems: foodItems,
                    paymentMethod: paymentOptions.name,
                };

                setGlobalState({ ...globalState, kitchenNotes: "" });

                if (paymentOptions.value === "card") {
                    navigation.navigate("CardPayment", { orderPayload: payload });
                } else {
                    const response = await axios.post(`${apiBaseUrl}order/create`, payload);

                    if (response.data) {
                        showToastWithGravityAndOffset("Order placed successfully!");
                        navigation.navigate("MyOrder", { isOrderPlaced: true });
                    }
                }
            }
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data, "error.response.data");
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={[globalStyles.flex1, globalStyles.alignItemsBetween]}>
                <View style={[globalStyles.paddingHorizontal5, styles.paymentOptionArea]}>
                    <View>
                        <Text style={styles.paymentOptionLabel}>Choose a Payment Option</Text>
                        <View style={globalStyles.radioButtonArea}>
                            {paymentType.map(item => (
                                <View style={globalStyles.radioButtonContainer} key={item.id}>
                                    <TouchableOpacity onPress={() => onRadioBtnClick(item)}
                                                      style={globalStyles.radioButton}>
                                        {item.selected ? <View style={globalStyles.radioButtonIcon} /> : null}
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onRadioBtnClick(item)}
                                                      style={globalStyles.radioButtonContentArea}>
                                        {item.img &&
                                        <Image style={globalStyles.radioButtonImage} source={item.img} />
                                        }
                                        {item.icon &&
                                        <View style={globalStyles.marginRight1}>
                                            {item.icon}
                                        </View>
                                        }
                                        <Text
                                            style={globalStyles.radioButtonText}>{item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                    {restaurantInfo &&
                    <View style={styles.orderSummaryArea}>
                        <Text style={[globalStyles.f18]}>Your Order</Text>

                        <View style={styles.cartListArea}>
                            {cartList.map((item, index) => (
                                <View style={[globalStyles.flexDirectionRow, globalStyles.justifyBetween]} key={index}>
                                    <Text>{item.count} x {item.foodItems.title}</Text>
                                    <Text>£{parseFloat(item.price * item.count).toFixed(2)}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={globalStyles.paddingTop05}>
                            <View style={[globalStyles.flexDirectionRow, globalStyles.justifyBetween]}>
                                <Text>Sub Total</Text>
                                <Text>£{parseFloat(totalPrice).toFixed(2)}</Text>
                            </View>
                        </View>

                        {service_type !== "dine_in" &&
                        <View style={[globalStyles.flexDirectionRow, globalStyles.justifyBetween]}>
                            <Text>Discount (-)</Text>
                            <Text>£{discount.toFixed(2)}</Text>
                        </View>
                        }

                        {service_type === "delivery" &&
                        <View style={[globalStyles.flexDirectionRow, globalStyles.justifyBetween]}>
                            <Text>Delivery Charge (+)</Text>
                            <Text>£{deliveryCharge.toFixed(2)}</Text>
                        </View>
                        }

                        {service_type !== "dine_in" &&
                        <View style={[globalStyles.flexDirectionRow, globalStyles.justifyBetween]}>
                            <Text>Service Charges (+)</Text>
                            <Text>£{serviceCharge.toFixed(2)}</Text>
                        </View>
                        }

                        <View style={globalStyles.paddingTop05} />

                        <View style={styles.totalPayment}>
                            <Text>Total Payment</Text>
                            <Text>£{totalPayment.toFixed(2)}</Text>
                        </View>

                        <View style={globalStyles.paddingTop1}>
                            <Text>Kitchen Notes : {kitchenNotes}</Text>
                        </View>

                        <View style={globalStyles.paddingTop1}>
                            <Text>Collection : </Text>
                        </View>

                        <View style={globalStyles.paddingTop1}>
                            <Text>Phone : </Text>
                        </View>
                    </View>
                    }
                </View>
                <View style={globalStyles.paddingHorizontal5}>
                    <View style={globalStyles.flexDirectionRow}>
                        <CheckBox
                            value={isTermAndConditions}
                            onValueChange={() => setTermAndConditions(!isTermAndConditions)}
                            tintColors={{ true: "#D2181B", false: "black" }}
                        />
                        <Text style={globalStyles.paddingTop05}>
                            Before your order Please make sure
                            your food Allergy
                            <Pressable onPress={() => navigation.navigate("TermsAndConditions")}>
                                <Text style={globalStyles.textRed}>Terms and Conditions.</Text>
                            </Pressable>
                        </Text>
                    </View>
                    <View style={styles.continueButtonArea}>
                        <TouchableOpacity style={[styles.continueButton]}
                                          onPress={() => placeOrder()}>
                            <Text style={styles.continueText}>Proceed Check out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        justifyContent: "space-between",
    },
    paymentOptionArea: {
        paddingVertical: hp("2%"),
    },
    paymentOptionLabel: {
        fontSize: 18,
        fontWeight: "700",
        color: "#D2181B",
    },
    continueButtonArea: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: hp("2%"),
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
    orderSummaryArea: {
        borderWidth: 1,
        borderColor: "#b4b4b4",
        paddingHorizontal: wp("3%"),
        paddingVertical: hp("1%"),
        borderRadius: 8,
        marginTop: hp("1%"),
    },
    cartListArea: {
        borderBottomColor: "#b4b4b4",
        borderBottomWidth: 1,
        paddingVertical: hp("0.5%"),
    },
    totalPayment: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderColor: "#b4b4b4",
        paddingTop: hp("0.5%"),
    },
});

export default Payment;

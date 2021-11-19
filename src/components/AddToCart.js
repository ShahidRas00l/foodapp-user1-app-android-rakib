import React, { useContext, useEffect, useState, Fragment, useLayoutEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from "react-native";
import globalStyles from "../styles/globalStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import { apiBaseUrl } from "../config";
import Loader from "../utilities/components/Loader";
import Entypo from "react-native-vector-icons/Entypo";

const AddToCart = ({ navigation, route }) => {
    const [state, setState] = useState({
        promoCode: "",
    });
    const { promoCode } = state;
    const [cartList, setCartList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [restaurantInfo, setRestaurantInfo] = useState(null);
    const [restaurantInfoLoading, setRestaurantInfoLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const { restaurantId } = route.params;
    const { user, kitchenNotes } = globalState;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: restaurantInfo ? restaurantInfo.name : "Restaurant",
        });
    }, [navigation, restaurantInfo]);

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
        setIsLoading(false);
        const updateData = data.map(item => {
            if (item.foodItems.products) item.foodItems.products = JSON.parse(item.foodItems.products);
            return item;
        });
        setCartList(updateData);
        return true;
    };

    useEffect(() => {
        if (restaurantId) {
            getRestaurantById(restaurantId).then(res => {
                if (Object.keys(res.data).length > 0) setRestaurantInfo(res.data);
            });
            setRestaurantInfoLoading(false);
        }
    }, [restaurantId]);

    useEffect(() => {
        if (restaurantId && user && Object.keys(user).length > 0) {
            getRestaurantCart(restaurantId).then(res => setRestaurantCart(res.data));
        }
    }, [restaurantId, user]);

    useEffect(() => {
        let totalPrice = 0;
        cartList.forEach(item => totalPrice += (parseInt(item.count) * parseFloat(item.price)));
        setTotalPrice(parseFloat(totalPrice.toFixed(2)));
    }, [cartList]);

    const addToCart = async cartItem => {
        try {
            const payload = {
                user: user["_id"],
                restaurant: restaurantId,
                foodItems: { ...cartItem.foodItems },
            };

            const response = await axios.post(`${apiBaseUrl}food/add-to-cart`, payload);
            if (response.data) getRestaurantCart(restaurantId).then(res => setRestaurantCart(res.data));
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    const removeFromCart = async cartItem => {
        try {
            const response = await axios.post(`${apiBaseUrl}food/sub-from-cart/${cartItem["_id"]}`);
            console.log(response.data);
            if (response.data) getRestaurantCart(restaurantId).then(res => {
                setRestaurantCart(res.data);
                setGlobalState({ ...globalState, cartList: res.data });
            });
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    const cartItemList = cartList.length > 0 ? cartList.map((item, index) => (
        <Fragment key={index}>
            <View style={styles.addedListArea}>
                <View style={styles.addedListAreaContent}>
                    <View style={styles.addButtonArea}>
                        <TouchableOpacity style={globalStyles.paddingHorizontal2}
                                          onPress={() => addToCart(item)}>
                            <AntDesign style={styles.addButtonAreaPlusIcon} name="plus" size={18}
                                       color="black" />
                        </TouchableOpacity>
                        <Text style={styles.addButtonAreaText}>{(parseInt(item.count))}</Text>
                        <TouchableOpacity style={globalStyles.paddingHorizontal2} onPress={() => removeFromCart(item)}>
                            <AntDesign style={styles.addButtonAreaMinusIcon} name="minus" size={18} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contentArea}>
                        <Text style={styles.contentTitle}>{item.foodItems.title}</Text>
                        {item.foodItems.option &&
                        <Text style={styles.contentSize}>({item.foodItems.option.name})</Text>
                        }
                        {item.foodItems.products.length > 0 && item.foodItems.products.map((item, index) => (
                            <Fragment key={index}>
                                <View style={globalStyles.flexDirectionRow}>
                                    <Entypo name="dot-single" size={15} color="black" />
                                    <Text style={styles.contentSize}>
                                        {item.title}
                                    </Text>
                                </View>
                            </Fragment>
                        ))}
                    </View>
                </View>
                <View>
                    <Text
                        style={styles.contentPrice}>£{(parseInt(item.count) * parseFloat(item.price))}</Text>
                </View>
            </View>
        </Fragment>
    )) : <View style={[globalStyles.paddingTop1, globalStyles.paddingLeft5]}>
        <Text style={globalStyles.f17}>No Item Found!</Text>
    </View>;

    return (
        restaurantInfoLoading ?
            <Loader /> :
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.height55}>
                    <View style={styles.addedCartAreaHeader}>
                        <Text style={styles.addedCartAreaHeaderText}>{cartList.length} items</Text>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {isLoading ? <Loader style={globalStyles.marginTop3} /> : cartItemList}
                    </ScrollView>
                </View>
                <View style={globalStyles.paddingHorizontal5}>
                    <View>
                        <Text style={styles.extraKitchenNote}>Extra Kitchen Note</Text>
                        <TextInput
                            value={kitchenNotes}
                            onChangeText={value => setGlobalState({ ...globalState, kitchenNotes: value })}
                            style={styles.kitchenNoteInput}
                            keyboardType={"default"}
                        />
                    </View>
                    <View>
                        <Text style={styles.extraKitchenNote}>Add Promo Code</Text>
                        <TextInput
                            value={promoCode}
                            onChangeText={value => setState({ ...state, promoCode: value })}
                            style={styles.kitchenNoteInput}
                            keyboardType={"default"}
                        />
                    </View>
                    <View style={styles.kitchenNoteButtonArea}>
                        <TouchableOpacity
                            style={[styles.kitchenNoteButton, totalPrice === 0 && globalStyles.bgDisabledGrey]}
                            onPress={() => navigation.navigate("Order", { restaurantId })}
                            disabled={totalPrice === 0}
                        >
                            <Text style={styles.kitchenNoteText}>Check out £{totalPrice}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "space-between",
    },
    height55: {
        height: hp("55%"),
    },
    addedCartAreaHeader: {
        paddingTop: hp("2%"),
        paddingBottom: hp("2%"),
        borderBottomColor: "#dcd6d6",
        borderBottomWidth: 1,
    },
    addedCartAreaHeaderText: {
        paddingLeft: wp("5%"),
        fontSize: 18,
        fontWeight: "700",
        color: "#555555",
    },
    addedListArea: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: wp("5%"),
        paddingVertical: hp("1%"),
        borderBottomColor: "#dcd6d6",
        borderBottomWidth: 1,
    },
    addedListAreaContent: {
        flexDirection: "row",
    },
    addButtonArea: {
        backgroundColor: "#d9d3d3",
        borderRadius: 50,
    },
    addButtonAreaText: {
        paddingVertical: hp("1%"),
        textAlign: "center",
    },
    addButtonAreaPlusIcon: {
        paddingTop: hp("0.5%"),
        fontWeight: "700",
    },
    addButtonAreaMinusIcon: {
        paddingBottom: hp("0.5%"),
        fontWeight: "700",
    },
    contentArea: {
        paddingLeft: wp("5%"),
    },
    contentTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#555555",
    },
    contentSize: {
        fontSize: 12,
        color: "#aca8a8",
    },
    contentDescription: {
        fontSize: 14,
        paddingTop: hp("1%"),
        color: "#555555",
    },
    contentPrice: {
        fontWeight: "bold",
        color: "#555555",
        fontSize: 18,
    },
    extraKitchenNote: {
        paddingVertical: wp("2%"),
        fontSize: 16,
    },
    kitchenNoteInput: {
        paddingVertical: hp("1%"),
        paddingLeft: wp("4%"),
        width: wp("90%"),
        borderColor: "#d9d3d3",
        borderWidth: 1,
        borderRadius: 8,
    },
    kitchenNoteButtonArea: {
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: hp("2%"),
    },
    kitchenNoteButton: {
        backgroundColor: "#D2181B",
        paddingVertical: hp("1.5%"),
        paddingHorizontal: wp("10%"),
        borderRadius: 8,
    },
    kitchenNoteText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
    },
});

export default AddToCart;

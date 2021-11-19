import React, { useEffect, useState, Fragment, useLayoutEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import globalStyles from "../styles/globalStyles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Modal from "react-native-modal";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CheckBox } from "react-native-elements";
import axios from "axios";
import { apiBaseUrl, baseUrl } from "../config";
import Loader from "../utilities/components/Loader";
import { GlobalContext } from "../context/GlobalContext";
import { Picker } from "@react-native-picker/picker";
import { bookFor, timings } from "../utilities/constants";
import moment from "moment";
import { showToastWithGravityAndOffset } from "../utilities/components/ToastMessage";
import SpecialOfferModal from "./SpecialOfferModal";

// Image
import restaurantBgImage from "../assets/image/restaurant-bg.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const RestaurantDetails = ({ navigation, route }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSpecialOfferModalVisible, setSpecialOfferModalVisible] = useState(false);
    const [bookingModalVisible, setBookingModalVisible] = useState(false);
    const [modalState, setModalState] = useState(null);
    const [specialOfferModalState, setSpecialOfferModalState] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [foodItemList, setFoodItemList] = useState([]);
    const [restaurantInfo, setRestaurantInfo] = useState(null);
    const [restaurantInfoLoading, setRestaurantInfoLoading] = useState(true);
    const [foodItemLoading, setFoodItemLoading] = useState(false);
    const [serviceListArea, setServiceListArea] = useState([
        {
            key: "delivery",
            name: "Delivery",
            isActive: false,
            isEnabled: false,
        },
        {
            key: "collection",
            name: "Collection",
            isActive: false,
            isEnabled: false,
        },
        {
            key: "dine_in",
            name: "Dine In",
            isActive: false,
            isEnabled: false,
        },
        {
            key: "table_booking",
            name: "Book a Table",
            isActive: false,
            isEnabled: false,
        },
    ]);
    const [cartList, setCartList] = useState([]);
    const [activeCart, setActiveCart] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isViewBasket, setIsViewBasket] = useState(false);
    const [state, setState] = useState({
        name: "",
        contact: "",
        bookingFor: "",
        guestNo: "",
        date: "",
        bookingFrom: "",
        count: 1,
        isAdd: false,
        twice: false,
        isRemove: false,
    });
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [restaurantHeaderShow, setRestaurantHeaderShow] = useState(true);
    const [specialOfferActive, setSpecialOfferActive] = useState(false);
    const [packageList, setPackageList] = useState([]);
    const [maximumChooseItem, setMaximumChooseItem] = useState(0);
    const [chooseItemList, setChooseItemList] = useState([]);
    const [isSpecialOfferButtonActive, setIsSpecialOfferButtonActive] = useState(false);
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const { restaurantId } = route.params;
    const { user, service_type } = globalState;

    const { name, contact, bookingFor, guestNo, date, bookingFrom, count } = state;

    useLayoutEffect(() => {
        const activeService = serviceListArea.find(item => item.isActive && item);

        navigation.setOptions({
            title: restaurantInfo ? restaurantInfo.name : "Restaurant",
            headerRight: () => (
                activeService ? <View style={styles.menuBarServiceArea}>
                    <Text style={[globalStyles.f16, globalStyles.textWhite]}>{activeService.name}</Text>
                </View> : ""
            ),
        });
    }, [navigation, serviceListArea, restaurantInfo]);

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

    const getRestaurantItemsByCategoryId = async id => {
        try {
            const response = await axios.get(`${apiBaseUrl}food/fetch-category-with-active-foods/${id}`);
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

    useEffect(() => {
        if (restaurantInfo) {
            const updateServiceListArea = serviceListArea.map(item => {
                if (restaurantInfo.isOpen) {
                    if (item.key === "delivery") item.isEnabled = restaurantInfo.deliveryAvailable;
                    if (item.key === "collection") item.isEnabled = restaurantInfo.collectionAvailability;
                    if (item.key === "dine_in") item.isEnabled = restaurantInfo.dineInAvailability;
                }

                if (item.key === "table_booking") item.isEnabled = true;
                return item;
            });

            const filteredServiceListArea = updateServiceListArea.filter(item => item.isEnabled && item);

            const finalServiceListArea = filteredServiceListArea.map((item, index) => {
                if (index === 0 && item.key !== "table_booking") item.isActive = true;
                return item;
            });

            const activeService = serviceListArea.find(item => item.isActive && item);
            const updateGlobalState = { ...globalState };
            updateGlobalState.service_type = activeService ? activeService.key : "";

            setGlobalState(updateGlobalState);
            setServiceListArea(finalServiceListArea);
        }
    }, [restaurantInfo]);

    useEffect(() => {
        if (restaurantId && user && Object.keys(user).length > 0) {
            getRestaurantCart(restaurantId).then(res => setRestaurantCart(res.data));
        }
    }, [restaurantId, user, globalState.cartList]);

    useEffect(() => {
        if (activeCategory) {
            setFoodItemLoading(true);
            getRestaurantItemsByCategoryId(activeCategory["_id"]).then(res => {
                if (Object.keys(res.data).length > 0) {
                    res.data.foodItems && res.data.foodItems.length > 0 && setFoodItemList(res.data.foodItems);
                    setFoodItemLoading(false);
                }
            });
        }
    }, [activeCategory]);

    useEffect(() => {
        let totalPrice = 0;
        cartList.forEach(item => totalPrice += (parseInt(item.count) * parseFloat(item.price)));
        setTotalPrice(parseFloat(totalPrice.toFixed(2)));
    }, [cartList]);

    useEffect(() => {
        if (restaurantInfo && restaurantInfo.isOpen && cartList.length > 0) {
            setIsViewBasket(true);
        }
    }, [cartList, restaurantInfo]);

    const toggleAddToCart = index => {
        if (!restaurantInfo.isOpen) {
            showToastWithGravityAndOffset("Service Not available!");
            return false;
        }

        const foodItem = foodItemList.find((item, key) => key === index);
        const cartItem = cartList.find(item => foodItem["_id"] === item.foodItems["_id"]);
        if (foodItem.options.length > 0) foodItem.basePrice = foodItem.price;
        foodItem.options = foodItem.options.length > 0 ? foodItem.options.map((item, index) => {
            item.checked = index === 0;
            return item;
        }) : [];

        setActiveCart(cartItem);
        setState({
            count: 1,
            isAdd: false,
            twice: false,
            isRemove: false,
        });

        setModalState(foodItem);
        setModalVisible(!isModalVisible);
    };

    const updateServiceType = key => {
        const updateServiceListArea = serviceListArea.map((item, index) => {
            item.isActive = key === index;
            return item;
        });

        const activeService = updateServiceListArea.find(item => item.isActive === true);
        const updateGlobalState = { ...globalState };
        updateGlobalState.service_type = activeService.key;

        setGlobalState(updateGlobalState);
        setServiceListArea(updateServiceListArea);
    };

    const getAllPackages = async () => {
        setSpecialOfferActive(true);
        setRestaurantHeaderShow(false);
        setFoodItemLoading(true);

        try {
            const response = await axios.get(`${apiBaseUrl}food/fetch-package-active/${restaurantId}`);
            if (response.data) setPackageList(response.data.data);
            setFoodItemLoading(false);
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    const toggleSpecialOffer = index => {
        if (!restaurantInfo.isOpen) {
            showToastWithGravityAndOffset("Service Not available!");
            return false;
        }

        let totalChoose = 0;
        const packageItem = packageList.find((item, key) => key === index);
        packageItem.packages = packageItem.packages.map(item => {
            totalChoose += parseInt(item["chooseAny"]);
            item.products = item.products.map(product => {
                if (typeof product === "string") {
                    const returnProduct = JSON.parse(product);
                    returnProduct.isDisabled = false;
                    returnProduct.isSelected = false;
                    return returnProduct;
                } else {
                    product.isDisabled = false;
                    product.isSelected = false;
                    return product;
                }
            });
            return item;
        });

        setMaximumChooseItem(totalChoose);
        setChooseItemList([]);
        setIsSpecialOfferButtonActive(false);
        // console.log(JSON.stringify(packageItem), 204);
        setSpecialOfferModalState(packageItem);
        setSpecialOfferModalVisible(!isSpecialOfferModalVisible);
    };

    const handleSpecialOfferChange = (offerIndex, productIndex) => {
        const updatePackageList = packageList.map(packageItem => {
            if (packageItem._id === specialOfferModalState._id) {
                packageItem.packages.map((offerItem, index) => {
                    if (offerIndex === index) {
                        offerItem.products.map((productItem, key) => {
                            if (productIndex === key) {
                                productItem.isSelected = !productItem.isSelected;
                            }
                            return productItem;
                        });
                    }
                    return offerItem;
                });
            }

            return packageItem;
        });

        updatePackageList.map(packageItem => {
            if (packageItem._id === specialOfferModalState._id) {
                packageItem.packages.map((offerItem, index) => {
                    if (offerIndex === index) {
                        const activeProduct = offerItem.products.filter(productItem => productItem.isSelected && productItem);
                        if (parseInt(offerItem["chooseAny"]) === activeProduct.length) {
                            offerItem.products.map(productItem => {
                                if (!productItem.isSelected) {
                                    productItem.isSelected = false;
                                }
                                return productItem;
                            });
                        }
                    }

                    return offerItem;
                });
            }

            return packageItem;
        });

        updatePackageList.map(packageItem => {
            if (packageItem._id === specialOfferModalState._id) {
                packageItem.packages.map((offerItem, index) => {
                    if (offerIndex === index) {
                        const activeProduct = offerItem.products.filter(productItem => productItem.isSelected && productItem);
                        if (parseInt(offerItem["chooseAny"]) === activeProduct.length) {
                            offerItem.products.map(productItem => {
                                if (!productItem.isSelected) {
                                    productItem.isDisabled = true;
                                }
                                return productItem;
                            });
                        } else {
                            offerItem.products.map(productItem => {
                                productItem.isDisabled = false;
                                return productItem;
                            });
                        }
                    }

                    return offerItem;
                });
            }

            return packageItem;
        });

        let filterActiveItem = [];
        updatePackageList.forEach(packageItem => {
            if (packageItem._id === specialOfferModalState._id) {
                packageItem.packages.forEach(offerItem => {
                    offerItem.products.forEach(productItem => {
                        if (productItem.isSelected) {
                            filterActiveItem.push(productItem);
                        }
                    });
                });
            }
        });

        if (filterActiveItem.length === maximumChooseItem) {
            setIsSpecialOfferButtonActive(true);
            setChooseItemList(filterActiveItem);
        } else {
            setIsSpecialOfferButtonActive(false);
            setChooseItemList([]);
        }

        setPackageList(updatePackageList);
    };

    const addSpecialOffer = async () => {
        try {
            const payload = {
                user: user["_id"],
                restaurant: restaurantId,
                price: specialOfferModalState.price,
                foodItems: {
                    _id: specialOfferModalState._id,
                    title: specialOfferModalState.name,
                    price: specialOfferModalState.price,
                    products: JSON.stringify(chooseItemList),
                },
            };

            const response = await axios.post(`${apiBaseUrl}food/add-to-cart`, payload);

            if (response.data) {
                getRestaurantCart(restaurantId).then(res => {
                    setRestaurantCart(res.data);
                    setSpecialOfferModalVisible(false);
                    setSpecialOfferModalState(null);
                });

                return true;
            }
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    useEffect(() => {
        if (state.isAdd) addToCart(state).then(res => console.log(res, 184));
        if (state.isRemove) removeFromCart().then(res => console.log(res, 185));
    }, [state]);

    const addToCart = async (state) => {
        try {
            const { twice } = state;
            const foodItems = { ...modalState };

            if (foodItems.options.length > 0) {
                const actionOptions = foodItems.options.find(item => item.checked === true);
                foodItems.options = foodItems.options.map(item => {
                    return {
                        _id: item._id,
                        name: item.name,
                        price: item.price,
                    };
                });
                foodItems.option = {
                    _id: actionOptions._id,
                    name: actionOptions.name,
                    price: actionOptions.price,
                };
                foodItems.price = foodItems.basePrice;
                delete foodItems.basePrice;
            }

            const payload = {
                user: user["_id"],
                restaurant: restaurantId,
                foodItems,
            };

            console.log(JSON.stringify(payload), 217);

            if (twice) await axios.post(`${apiBaseUrl}food/add-to-cart`, payload);
            const response = await axios.post(`${apiBaseUrl}food/add-to-cart`, payload);

            if (response.data) {
                getRestaurantCart(restaurantId).then(res => {
                    setRestaurantCart(res.data);
                    const cartItem = res.data.find(item => modalState["_id"] === item.foodItems["_id"]);
                    console.log(cartItem, 232);
                    setActiveCart(cartItem);
                });

                return true;
            }
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    const removeFromCart = async () => {
        try {
            const response = await axios.post(`${apiBaseUrl}food/sub-from-cart/${activeCart["_id"]}`);
            console.log(response.data, 250);
            if (response.data) {
                getRestaurantCart(restaurantId).then(res => setRestaurantCart(res.data));
                return true;
            }
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    const confirmBooking = async () => {
        const payload = {
            name,
            contact,
            bookingFor,
            guestNo,
            date,
            bookingFrom,
            restaurantId,
            userId: user["_id"],
        };

        if (!name) {
            alert("Name is required!");
            return;
        }

        if (!bookingFor) {
            alert("Booking For is required!");
            return;
        }

        if (!guestNo) {
            alert("Guest No is required!");
            return;
        }

        if (!date) {
            alert("Date is required!");
            return;
        }

        if (!bookingFrom) {
            alert("Time is required!");
            return;
        }

        if (guestNo > restaurantInfo.capacity) {
            alert(`Sorry! Our remaining seats on this date are: ${restaurantInfo.capacity}`);
            return;
        }

        try {
            const res = await axios.post(`${apiBaseUrl}restaurant/create-booking`, payload);
            console.log(res.data);
            if (res.data) {
                setBookingModalVisible(false);
                showToastWithGravityAndOffset("Booking saved successfully!");
                alert("We are closed now! We will confirm in our opening time");
                navigation.navigate("MyBookings", { isBookingPlaced: true });
            }
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
                if (error.response.data.error) showToastWithGravityAndOffset(error.response.data.error);
            }
        }
    };

    const handleSizeChange = value => {
        const updateModalState = { ...modalState };
        updateModalState.options = updateModalState.options.length > 0 && updateModalState.options.map(item => {
            if (value["_id"] === item["_id"]) {
                item.checked = true;
                updateModalState.price = parseFloat(updateModalState.basePrice) + parseFloat(item.price);
            } else item.checked = false;
            return item;
        });

        setModalState(updateModalState);
    };

    const activeCategoryBg = item => activeCategory && (activeCategory["_id"] === item["_id"] && !specialOfferActive) ? globalStyles.bgRed : globalStyles.bgWhite;
    const activeCategoryText = item => activeCategory && (activeCategory["_id"] === item["_id"] && !specialOfferActive) ? globalStyles.textWhite : globalStyles.textDark;

    const renderRestaurantInfo = restaurantInfo && Object.keys(restaurantInfo).length > 0 && <>
        <View style={[globalStyles.container, globalStyles.paddingHorizontal0]}>
            {restaurantHeaderShow &&
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
                                <View style={[globalStyles.flexDirectionRow, index !== 0 && globalStyles.paddingLeft2]}
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
                    <Text>
                        Food may contain Celery, Crustacean, Eggs, Fish, Gluten, Lupin, Milk , Molluscs, Mustard,
                        Nuts, Sesame, Soya or Sulphite allergy. Please check the item description or anything else,
                        inform with extra Kitchen Note!
                    </Text>
                </View>
            </>
            }

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
                                    }}
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

            {restaurantInfo.categories && restaurantInfo.categories.length > 0 &&
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
            }

            {activeCategory && !specialOfferActive &&
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
            }

            {specialOfferActive &&
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
            }
        </View>
        {isViewBasket && service_type !== "table_booking" &&
        <TouchableOpacity style={styles.viewBasketArea}
                          onPress={() => navigation.navigate("AddToCart", { restaurantId })}>
            <Text style={styles.viewBasketText}>View Basket</Text>
            <Text style={styles.viewBasketText}>£{totalPrice}</Text>
        </TouchableOpacity>
        }
        <Modal
            isVisible={isModalVisible}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInTiming={500}
            animationOutTiming={500}
            style={globalStyles.modalView}>
            {modalState ?
                <View>
                    <ScrollView>
                        <View style={styles.modalHeaderArea}>
                            <Text style={styles.modalHeaderField}>
                                {modalState.title}
                            </Text>
                            <TouchableOpacity style={styles.modalCloseIconArea}
                                              onPress={() => {
                                                  setState({ ...state, ...{ isAdd: false, isRemove: false } });
                                                  setModalVisible(!isModalVisible);
                                              }}>
                                <AntDesign name="close" size={18} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalBody}>
                            {modalState.description !== "" &&
                            <Text style={styles.modalContentField}>
                                {modalState.description}
                            </Text>
                            }
                            {modalState.options.length > 0 &&
                            <>
                                <View style={styles.addonArea}>
                                    <Text style={globalStyles.fw700}>Choose Size</Text>
                                </View>
                                {modalState.options.map((item, index) => (
                                    <View
                                        key={index}
                                        style={[globalStyles.flexDirectionRow, globalStyles.justifyBetween]}
                                    >
                                        <Text style={[globalStyles.paddingTop1, globalStyles.f16]}>
                                            {item.name}
                                        </Text>
                                        <CheckBox
                                            title={`(+£${item.price})`}
                                            iconRight={true}
                                            checked={item.checked}
                                            onIconPress={() => handleSizeChange(item)}
                                            onPress={() => handleSizeChange(item)}
                                            containerStyle={styles.addonCheckBox}
                                        />
                                    </View>
                                ))}
                            </>
                            }
                            <View style={[globalStyles.flexDirectionRow, globalStyles.justifyCenter]}>
                                <View style={styles.addToArea}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (count > 1) {
                                                const updateState = { ...state };
                                                updateState.count = count - 1;
                                                updateState.isRemove = true;
                                                updateState.isAdd = false;
                                                updateState.twice = false;
                                                setState(updateState);
                                            }
                                        }}
                                    >
                                        <Feather name="minus-circle" size={24} color="#D2181B" />
                                    </TouchableOpacity>
                                    <Text style={globalStyles.f18}>
                                        {count}
                                    </Text>
                                    <TouchableOpacity onPress={() => {
                                        const updateState = { ...state };
                                        updateState.twice = count === 1;
                                        updateState.count = count + 1;
                                        updateState.isAdd = true;
                                        updateState.isRemove = false;
                                        setState(updateState);
                                    }}>
                                        <Feather name="plus-circle" size={24} color="#D2181B" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.addToButtonArea} onPress={() => {
                                if (count === 1) {
                                    const updateState = { ...state };
                                    updateState.count = count + 1;
                                    updateState.isAdd = true;
                                    updateState.isRemove = false;
                                    updateState.twice = false;
                                    setState(updateState);
                                } else {
                                    setState({ ...state, ...{ isAdd: false, isRemove: false } });
                                }
                                setModalVisible(!isModalVisible);
                                setIsViewBasket(true);
                            }}>
                                <Text style={styles.addToButton}>
                                    Add For £{parseFloat(modalState.price) * count}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View> :
                <View>
                    <Text>Not found!</Text>
                </View>
            }
        </Modal>
        <Modal
            isVisible={bookingModalVisible}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInTiming={500}
            animationOutTiming={500}
            style={globalStyles.modalView}>
            <View>
                <ScrollView>
                    <View style={styles.modalHeaderArea}>
                        <Text style={styles.modalHeaderField}>
                            Table Booking
                        </Text>
                        <TouchableOpacity style={styles.modalCloseIconArea}
                                          onPress={() => setBookingModalVisible(false)}>
                            <AntDesign name="close" size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalBody}>
                        <View style={globalStyles.paddingTop1}>
                            <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Name</Text>
                            <TextInput
                                value={name}
                                placeholder={"Ex. Jhon"}
                                style={styles.inputField}
                                keyboardType={"default"}
                                onChangeText={text => setState({ ...state, name: text })}
                            />
                        </View>
                        <View style={globalStyles.paddingTop2}>
                            <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Contact No</Text>
                            <TextInput
                                value={contact}
                                placeholder={"Ex. 132456468"}
                                style={styles.inputField}
                                keyboardType={"default"}
                                onChangeText={text => setState({ ...state, contact: text })}
                            />
                        </View>
                        <View style={globalStyles.paddingTop2}>
                            <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Booking For</Text>
                            <View style={styles.selectionInputArea}>
                                <Picker
                                    style={{ height: 42 }}
                                    selectedValue={bookingFor}
                                    onValueChange={text => setState({ ...state, bookingFor: text })}
                                >
                                    <Picker.Item label={"Select Booking For"} value={""} />
                                    {bookFor.map((item, index) => (
                                        <Picker.Item key={index} label={item} value={item} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={globalStyles.paddingTop2}>
                            <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Number of Guests</Text>
                            <TextInput
                                value={guestNo}
                                placeholder={"Ex. 132456468"}
                                style={styles.inputField}
                                keyboardType={"default"}
                                onChangeText={text => setState({ ...state, guestNo: text })}
                            />
                        </View>
                        <View style={globalStyles.paddingTop2}>
                            <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Date</Text>
                            <View
                                style={styles.dateTimeArea}>
                                <TextInput
                                    style={styles.dateTimeInput}
                                    value={date ? moment(date).format("MM/DD/YYYY") : ""}
                                    editable={false}
                                    keyboardType={"default"}
                                />
                                <TouchableOpacity onPress={() => setDatePickerVisibility(!isDatePickerVisible)}>
                                    <Fontisto style={styles.dateTimeIcon} name="date" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={text => {
                                    setState({ ...state, date: text });
                                    setDatePickerVisibility(!isDatePickerVisible);
                                }}
                                onCancel={() => setDatePickerVisibility(!isDatePickerVisible)}
                            />
                        </View>
                        <View style={globalStyles.paddingTop2}>
                            <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Time</Text>
                            <View style={styles.selectionInputArea}>
                                <Picker
                                    style={{ height: 42 }}
                                    selectedValue={bookingFrom}
                                    onValueChange={text => setState({ ...state, bookingFrom: text })}
                                >
                                    <Picker.Item label={"Select Time"} value={""} />
                                    {timings.map((item, index) => (
                                        <Picker.Item key={index} label={item} value={item} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.continueButtonArea}>
                            <TouchableOpacity
                                style={styles.continueButton}
                                onPress={() => confirmBooking()}
                            >
                                <Text style={styles.continueText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
        <SpecialOfferModal
            isSpecialOfferModalVisible={isSpecialOfferModalVisible}
            setSpecialOfferModalVisible={setSpecialOfferModalVisible}
            specialOfferModalState={specialOfferModalState}
            handleSpecialOfferChange={handleSpecialOfferChange}
            isSpecialOfferButtonActive={isSpecialOfferButtonActive}
            addSpecialOffer={addSpecialOffer}
        />
    </>;

    return (
        restaurantInfoLoading ? <Loader /> : renderRestaurantInfo
    );
};

const styles = StyleSheet.create({
    categoryArea: {
        flexDirection: "row",
    },
    categoryAreaSingle: {
        paddingHorizontal: wp("5%"),
        paddingVertical: hp("0.5%"),
        marginRight: wp("1%"),
        borderRadius: 15,
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("0.5%"),
        marginBottom: hp("1.5%"),
    },
    categoryAreaImage: {
        width: wp("12.5%"),
    },
    dataHeaderText: {
        fontSize: 20,
        fontWeight: "700",
        paddingBottom: hp("1.5%"),
    },
    detailsArea: {
        paddingVertical: hp("1.5%"),
        flexDirection: "row",
        justifyContent: "space-between",
        borderTopColor: "#dcd6d6",
        borderTopWidth: 1,
    },
    detailsAreaLeft: {
        width: wp("70%"),
    },
    detailsAreaTitle: {
        fontSize: 16,
        color: "#2e3333",
    },
    detailsAreaDescription: {
        fontSize: 14,
        color: "#828585",
        paddingTop: hp("0.5%"),
    },
    detailsAreaAmount: {
        fontSize: 14,
        color: "#828585",
        paddingTop: hp("0.5%"),
    },
    detailsAreaRight: {
        width: wp("20%"),
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    detailsAreaRightImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    modalHeaderArea: {
        flexDirection: "row",
        backgroundColor: "#fff",
        justifyContent: "space-between",
        paddingHorizontal: wp("4%"),
        paddingVertical: hp("2%"),
        borderBottomWidth: 1,
        borderBottomColor: "#CDC9C9",
    },
    modalHeaderField: {
        fontSize: wp("5%"),
        color: "#000",
        fontWeight: "600",
    },
    modalCloseIconArea: {
        backgroundColor: "#D2181B",
        width: 30,
        height: 30,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
    },
    modalBody: {
        backgroundColor: "#fff",
        paddingHorizontal: wp("4%"),
        paddingBottom: hp("3.5%"),
    },
    modalContentField: {
        textAlign: "justify",
        lineHeight: 23,
        fontSize: 16,
        color: "#000000",
        paddingTop: hp("1%"),
    },
    addToArea: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: hp("4%"),
        width: wp("50%"),
    },
    addToButtonArea: {
        marginTop: hp("8%"),
        borderRadius: 3,
        backgroundColor: "#D2181B",
        paddingVertical: hp("2%"),
    },
    swiperButton: {
        fontSize: 50,
        color: "#D2181B",
    },
    modalImageArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalImage: {
        width: 180,
        height: 180,
        borderRadius: 100,
    },
    addToButton: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
    },
    viewBasketArea: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: hp("2%"),
        paddingHorizontal: wp("5%"),
        elevation: 5,
        backgroundColor: "#D2181B",
    },
    viewBasketText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    addonArea: {
        paddingTop: hp("3%"),
        paddingBottom: hp("1%"),
        borderBottomColor: "#CDC9C9",
        borderBottomWidth: 1,
        marginBottom: hp("0.5%"),
    },
    addonCheckBox: {
        borderColor: "transparent",
        paddingVertical: hp("0%"),
        paddingHorizontal: wp("0%"),
        backgroundColor: "#fff",
    },
    restaurantInfoArea: {
        paddingHorizontal: wp("5%"),
        paddingTop: hp("1%"),
    },
    favouriteAreaImage: {
        width: wp("100%"),
        height: hp("15%"),
        position: "relative",
    },
    restaurantInfoName: {
        fontSize: 18,
    },
    restaurantInfoAddress: {
        fontSize: 14,
        color: "#828585",
    },
    restaurantInfoHeader: {
        borderBottomColor: "#b4b4b4",
        borderBottomWidth: 1,
    },
    deliveryTimeArea: {
        flexDirection: "row",
        paddingTop: hp("1%"),
        paddingBottom: hp("0.5%"),
    },
    deliveryTimeAreaText: {
        paddingTop: hp("0.2%"),
        paddingLeft: wp("0.5%"),
        paddingRight: wp("1%"),
    },
    minimumOrder: {
        flexDirection: "row",
        margin: hp("0.5%"),
    },
    serviceTypeArea: {
        paddingTop: hp("0.5%"),
        paddingBottom: hp("1%"),
    },
    serviceArea: {
        paddingTop: hp("0.5%"),
        paddingBottom: hp("1%"),
        borderBottomColor: "#b4b4b4",
        borderBottomWidth: 1,
    },
    serviceAreaSingle: {
        paddingHorizontal: wp("3.5%"),
        paddingVertical: hp("0.5%"),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    activeService: {
        backgroundColor: "#666363",
        borderRadius: 15,
    },
    bookingButtonArea: {
        paddingTop: hp("2%"),
        width: wp("90%"),
    },
    bookingButton: {
        backgroundColor: "#D2181B",
        paddingVertical: hp("1.5%"),
        paddingHorizontal: wp("10%"),
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "center",
    },
    bookingText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        paddingLeft: wp("2%"),
    },
    bookingIconImage: {
        width: 30,
        height: 25,
    },
    menuBarServiceArea: {
        paddingHorizontal: wp("4%"),
        paddingVertical: hp("0.5%"),
        borderRadius: 15,
        backgroundColor: "#D2181B",
        marginRight: wp("5%"),
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
    dateTimeButton: {
        backgroundColor: "#27C96D",
        paddingVertical: hp("1.5%"),
        paddingHorizontal: wp("5%"),
        borderRadius: 8,
        width: wp("35%"),
    },
    dateTimeArea: {
        flexDirection: "row",
    },
    dateTimeInput: {
        paddingVertical: hp("1%"),
        paddingLeft: wp("4%"),
        width: wp("82%"),
        borderColor: "#d9d3d3",
        borderWidth: 1,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    dateTimeIcon: {
        paddingVertical: hp("1.5%"),
        width: wp("10%"),
        textAlign: "center",
        backgroundColor: "#D2181B",
        color: "#fff",
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    selectionInputArea: {
        borderColor: "#d9d3d3",
        borderWidth: 1,
        borderRadius: 8,
    },
    logoArea: {
        position: "absolute",
        top: hp("7%"),
        left: wp("5%"),
    },
    logoImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: "#fff",
    },
});

export default RestaurantDetails;

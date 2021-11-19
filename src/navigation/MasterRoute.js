import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GlobalContext } from "../context/GlobalContext";

/* Component */
import Home from "../components/Home";
import Restaurant from "../components/Restaurant";
import RestaurantDetails from "../components/RestaurantDetails";
import AddToCart from "../components/AddToCart";
import Order from "../components/Order";
import Payment from "../components/Payment";
import TermsAndConditions from "../components/TermsAndConditions";
import Chat from "../components/Chat";
import Settings from "../components/Settings";
import Notification from "../components/Notification";
import Profile from "../components/Profile";
import TestComponent from "../components/TestComponent";
import FavouriteOrder from "../components/FavouriteOrder";
import MyOrder from "../components/my-order/MyOrder";
import OrderDetails from "../components/order-details/OrderDetails";
import CardPayment from "../components/CardPayment";
import MyBookings from "../components/MyBookings";

/* Auth Component */
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import ForgetPassword from "../components/auth/ForgetPassword";
import Otp from "../components/auth/Otp";
import Splash from "../components/auth/Splash";

/* Bottom Tab Navigator */
const Tab = createBottomTabNavigator();
const HomeTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: "#D2181B",
                tabStyle: {
                    backgroundColor: "#fff",
                    height: 40,
                },
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Chat"
                component={Chat}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="chat" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="setting" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const withoutHeaderOptions = {
    headerShown: false,
    gestureEnabled: true,
    gestureDirection: "horizontal",
};

const withHeaderOptions = {
    headerShown: true,
    gestureEnabled: true,
    gestureDirection: "horizontal",
};

/* Stack Navigator */
const MainStack = createStackNavigator();
const MasterRoute = () => {
    const { globalState } = useContext(GlobalContext);
    const { sign_in_token, user } = globalState;

    return (
        <NavigationContainer>
            <MainStack.Navigator initialRouteName="Splash">
                {(sign_in_token && user && Object.keys(user).length > 0) ?
                    <>
                        <MainStack.Screen options={withoutHeaderOptions} name={"Home"} children={HomeTabs} />
                        <MainStack.Screen options={{ ...withHeaderOptions, title: "Select Restaurant / Takeaway" }}
                                          name={"Restaurant"} component={Restaurant} />
                        <MainStack.Screen options={({ route }) => ({ title: route.params.name })}
                                          name={"RestaurantDetails"}
                                          component={RestaurantDetails} />
                        <MainStack.Screen options={{ ...withHeaderOptions, title: "Royal Food Court" }}
                                          name={"AddToCart"}
                                          component={AddToCart} />
                        <MainStack.Screen options={{ ...withHeaderOptions, title: "Checkout" }} name={"Order"}
                                          component={Order} />
                        <MainStack.Screen options={{ ...withHeaderOptions, title: "Payment" }} name={"Payment"}
                                          component={Payment} />
                        <MainStack.Screen options={{ ...withHeaderOptions, title: "Terms & Conditions" }}
                                          name={"TermsAndConditions"}
                                          component={TermsAndConditions} />
                        <MainStack.Screen options={{ ...withHeaderOptions, title: "Notifications" }}
                                          name={"Notification"}
                                          component={Notification} />
                        <MainStack.Screen options={{ ...withHeaderOptions, title: "User Profile" }} name={"Profile"}
                                          component={Profile} />
                        <MainStack.Screen options={{ ...withHeaderOptions, title: "Favourites" }}
                                          name={"FavouriteOrder"}
                                          component={FavouriteOrder} />
                        <MainStack.Screen options={{ ...withHeaderOptions, title: "Order List" }} name={"MyOrder"}
                                          component={MyOrder} />
                        <MainStack.Screen options={{ ...withHeaderOptions, title: "Order Details" }}
                                          name={"OrderDetails"}
                                          component={OrderDetails} />
                        <MainStack.Screen options={{ ...withHeaderOptions, title: "Order Details" }}
                                          name={"CardPayment"}
                                          component={CardPayment} />
                        <MainStack.Screen options={{ ...withHeaderOptions, title: "My Bookings" }} name={"MyBookings"}
                                          component={MyBookings} />
                    </>
                    :
                    <>
                        <MainStack.Screen options={withoutHeaderOptions} name={"Splash"} component={Splash} />
                        <MainStack.Screen options={withoutHeaderOptions} name={"SignIn"} component={SignIn} />
                        <MainStack.Screen options={withoutHeaderOptions} name={"SignUp"} component={SignUp} />
                        <MainStack.Screen options={withoutHeaderOptions} name={"ForgetPassword"}
                                          component={ForgetPassword} />
                        <MainStack.Screen options={withoutHeaderOptions} name={"Otp"} component={Otp} />
                    </>
                }
                <MainStack.Screen options={withoutHeaderOptions} name={"TestComponent"} component={TestComponent} />
            </MainStack.Navigator>
        </NavigationContainer>
    );
};

export default MasterRoute;

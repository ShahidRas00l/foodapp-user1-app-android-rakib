import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";
import globalStyles from "../styles/globalStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Badge } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { apiBaseUrl } from "../config";
import moment from "moment";
import { showToastWithGravityAndOffset } from "../utilities/components/ToastMessage";
import Loader from "../utilities/components/Loader";
import { GlobalContext } from "../context/GlobalContext";
import _ from "lodash";

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

const Notification = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { globalState } = useContext(GlobalContext);
    const { user } = globalState;
    const [refreshing, setRefreshing] = React.useState(false);

    const getAllNotifications = async userId => {
        try {
            const response = await axios.get(`${apiBaseUrl}superadmin/owner-notifications/${userId}`);
            if (response.data) {
                const data = _.orderBy(response.data.data, ["createdAt"], ["desc"]);
                setData(data);
                setIsLoading(false);
                return true;
            }
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    useEffect(() => {
        getAllNotifications(user["_id"]).then(res => console.log("ALL NOTIFICATIONS: ", res));
    }, [user]);

    useLayoutEffect(() => {
        navigation.setOptions(
            {
                headerRight: () => (
                    <View style={{ marginRight: wp("5%") }}>
                        <Ionicons name="notifications" size={26} color="#D2181B" />
                        <Badge
                            value={data.length > 0 ? data.length : 0}
                            badgeStyle={{ backgroundColor: "#FF3400" }}
                            status="success"
                            containerStyle={{ position: "absolute", top: -9, right: -6 }}
                        />
                    </View>
                ),
            },
        );
    }, [navigation, data]);

    const deleteNotification = async id => {
        try {
            const response = await axios.delete(`${apiBaseUrl}superadmin/notification/${id}`);
            if (response.data) {
                console.log(response.data);
                showToastWithGravityAndOffset("Notification deleted successfully!");
                getAllNotifications(user["_id"]).then(res => console.log("ALL NOTIFICATIONS: ", res));
            }
        } catch (error) {
            if (error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getAllNotifications(user["_id"]).then(res => console.log("ALL NOTIFICATIONS: ", res));
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const renderItem = data.length > 0 ?
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={globalStyles.paddingTop2}>
                    {data.map((item, index) => (
                        <View style={[styles.notificationArea]} key={index}>
                            <View>
                                <Text style={[globalStyles.f18, globalStyles.fw700, globalStyles.paddingBottom1]}>
                                    {item.title}
                                </Text>
                                <Text style={styles.notificationTime}>{item.description}</Text>
                                <Text
                                    style={styles.notificationTime}>{moment(item.createdAt).format("DD/MM/YYYY hh:mm A")}</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation3]}
                                onPress={() => deleteNotification(item._id)}>
                                <MaterialIcons name="delete" size={22} color="#979494" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView> :
        <Text style={[globalStyles.paddingTop1, globalStyles.paddingLeft5]}>No Notification Yet!</Text>;

    return (
        isLoading ? <Loader /> : renderItem
    );
};

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
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
        notificationArea: {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: hp("2%"),
            paddingHorizontal: wp("5%"),
            backgroundColor: "#fff",
            elevation: 5,
            borderRadius: 10,
            marginHorizontal: wp("5%"),
            marginBottom: hp("2%"),
        },
        notificationTime: {
            color: "#979494",
        },
        loadingArea: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
    },
);

export default Notification;


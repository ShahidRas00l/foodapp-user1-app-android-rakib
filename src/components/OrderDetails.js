import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import globalStyles from "../styles/globalStyles";
import moment from "moment";
import { Table, TableWrapper, Cell } from "react-native-table-component";
import { GlobalContext } from "../context/GlobalContext";

const OrderDetails = ({ route }) => {
    const { orderDetails } = route.params;
    const tableHead = ["Qty", "Description", "Amount"];
    const [tableData, setTableData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { globalState } = useContext(GlobalContext);
    const { user } = globalState;

    useEffect(() => {
        if (orderDetails && orderDetails.foodItems.length > 0) {
            let updateTableData = [];
            let totalAmount = 0;
            orderDetails.foodItems.forEach(item => {
                const qty = parseInt(item.quantity);
                const price = parseFloat(item.price).toFixed(2);
                totalAmount += qty * price;
                const priceText = `£${(qty * price).toFixed(2)}`;
                const arr = [qty, item.title, priceText];
                updateTableData.push(arr);
            });

            setTotalPrice(totalAmount.toFixed(2));
            setTableData(updateTableData);
        }
    }, [orderDetails]);

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.restaurantHeader}>
                        <View>
                            <Text
                                style={[globalStyles.f18, globalStyles.textCenter, globalStyles.fw700]}>{orderDetails.restaurant.name}</Text>
                            <Text style={globalStyles.textCenter}>{orderDetails.restaurant.address}</Text>
                            <Text style={globalStyles.textCenter}>
                                {moment(orderDetails.createdAt).format("DD/MM/YYYY")}
                            </Text>
                            <Text style={globalStyles.textCenter}>{orderDetails.orderNumber}</Text>
                        </View>
                    </View>
                    <View style={styles.tableArea}>
                        <Table>
                            <TableWrapper style={styles.tableHead}>
                                {tableHead.map((item, index) => (
                                    <Cell
                                        key={index}
                                        data={item}
                                        textStyle={[styles.tableText, index === 2 && styles.tableTextRight]}
                                    />
                                ))}
                            </TableWrapper>
                            {tableData.map((rowData, index) => (
                                <TableWrapper
                                    key={index}
                                    style={styles.tableBody}>
                                    {rowData.map((cellData, cellIndex) => (
                                        <Cell
                                            key={cellIndex}
                                            data={cellData}
                                            textStyle={[styles.tableText, cellIndex === 2 && styles.tableTextRight]}
                                        />
                                    ))}
                                </TableWrapper>
                            ))}
                        </Table>
                    </View>
                    <View style={styles.priceArea}>
                        <View style={[globalStyles.flexDirectionRow, globalStyles.justifyBetween]}>
                            <Text style={[globalStyles.fw700, globalStyles.paddingLeft5, globalStyles.paddingBottom1]}>
                                Sub Total
                            </Text>
                            <Text
                                style={[globalStyles.fw700, globalStyles.paddingRight7]}>£{totalPrice ? totalPrice : "0.00"}</Text>
                        </View>
                        <View style={[globalStyles.flexDirectionRow, globalStyles.justifyBetween]}>
                            <Text style={[globalStyles.fw700, globalStyles.paddingLeft5, globalStyles.paddingBottom1]}>
                                Discount (-)
                            </Text>
                            <Text style={[globalStyles.fw700, globalStyles.paddingRight7]}>
                                £{orderDetails.discount ? parseFloat(orderDetails.discount).toFixed(2) : "0.00"}
                            </Text>
                        </View>
                        {orderDetails.orderType === "delivery" &&
                        <View style={[globalStyles.flexDirectionRow, globalStyles.justifyBetween]}>
                            <Text style={[globalStyles.fw700, globalStyles.paddingLeft5, globalStyles.paddingBottom1]}>
                                Delivery Charges (+)
                            </Text>
                            <Text style={[globalStyles.fw700, globalStyles.paddingRight7]}>
                                £{orderDetails.deliveryCharge ? parseFloat(orderDetails.deliveryCharge).toFixed(2) : "0.00"}
                            </Text>
                        </View>
                        }
                        {!orderDetails.tableNo &&
                        <View style={[globalStyles.flexDirectionRow, globalStyles.justifyBetween]}>
                            <Text style={[globalStyles.fw700, globalStyles.paddingLeft5, globalStyles.paddingBottom1]}>
                                Service Charges (+)
                            </Text>
                            <Text style={[globalStyles.fw700, globalStyles.paddingRight7]}>
                                £{"0.50"}
                            </Text>
                        </View>
                        }
                    </View>
                    <View style={styles.totalPriceArea}>
                        <View style={[globalStyles.flexDirectionRow, globalStyles.justifyBetween]}>
                            <Text style={[globalStyles.fw700, globalStyles.paddingLeft5, globalStyles.paddingBottom1]}>
                                Total Payment ({orderDetails.paymentMethod})
                            </Text>
                            <Text style={[globalStyles.fw700, globalStyles.paddingRight7]}>
                                £{orderDetails.totalPrice ? parseFloat(orderDetails.totalPrice).toFixed(2) : "0.00"}
                            </Text>
                        </View>
                    </View>
                    {orderDetails.orderType === "delivery" &&
                    <View style={styles.deliveryArea}>
                        <Text style={[globalStyles.fw700, globalStyles.textCenter, globalStyles.f18]}>
                            Delivered To: {user.name}
                        </Text>
                        <Text style={[globalStyles.fw700, globalStyles.textCenter, globalStyles.f18]}>
                            {orderDetails.address}
                        </Text>
                    </View>
                    }
                    {(orderDetails.orderType === "collection" || orderDetails.orderType === "pickup") &&
                    <View style={styles.deliveryArea}>
                        <Text style={[globalStyles.fw700, globalStyles.textCenter, globalStyles.f18]}>
                            Collection For: {user.name}
                        </Text>
                    </View>
                    }
                    {orderDetails.tableNo &&
                    <View style={styles.deliveryArea}>
                        <Text style={[globalStyles.fw700, globalStyles.textCenter, globalStyles.f18]}>
                            Dine In: {orderDetails.tableNo}</Text>
                    </View>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: hp("2%"),
        paddingHorizontal: wp("5%"),
    },
    radioButtonContainer: {
        flexDirection: "row",
    },
    radioButtonActive: {
        height: 18,
        width: 18,
        backgroundColor: "#F8F8F8",
        borderRadius: 9,
        borderWidth: 1,
        borderColor: "#D2181B",
        alignItems: "center",
        justifyContent: "center",
    },
    radioButton: {
        height: 18,
        width: 18,
        backgroundColor: "#F8F8F8",
        borderRadius: 9,
        borderWidth: 1,
        borderColor: "#adadad",
        alignItems: "center",
        justifyContent: "center",
    },
    radioButtonIconActive: {
        height: 10,
        width: 10,
        borderRadius: 6,
        backgroundColor: "#D2181B",
    },
    radioButtonIcon: {
        height: 10,
        width: 10,
        borderRadius: 6,
        backgroundColor: "#adadad",
    },
    lineActive: {
        height: 20,
        width: 3,
        backgroundColor: "#D2181B",
        marginLeft: 7.5,
    },
    line: {
        height: 20,
        width: 3,
        backgroundColor: "#adadad",
        marginLeft: 7.5,
    },
    timelineArea: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: hp("1%"),
        borderBottomColor: "#b4b4b4",
        borderBottomWidth: 1,
    },
    restaurantHeader: {
        // paddingTop: hp("1%"),
        paddingBottom: hp("1%"),
        borderBottomColor: "#b4b4b4",
        borderBottomWidth: 1,
    },
    tableArea: {
        marginTop: hp("2%"),
        paddingBottom: hp("2%"),
        borderBottomColor: "#b4b4b4",
        borderBottomWidth: 1,
    },
    tableHead: {
        flexDirection: "row",
        height: 40,
        backgroundColor: "#dfdfe3",
    },
    tableBody: {
        flexDirection: "row",
        backgroundColor: "#ebebef",
    },
    tableText: {
        margin: 6,
        fontWeight: "700",
        textAlign: "center",
    },
    tableTextRight: {
        textAlign: "right",
        paddingRight: wp("5%"),
    },
    priceArea: {
        marginTop: hp("2%"),
        paddingBottom: hp("1%"),
        borderBottomColor: "#b4b4b4",
        borderBottomWidth: 1,
    },
    totalPriceArea: {
        marginTop: hp("1%"),
        paddingBottom: hp("1%"),
    },
    deliveryArea: {
        marginTop: hp("2%"),
    },
});

export default OrderDetails;

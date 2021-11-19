import { StyleSheet } from "react-native";

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";

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
        height: hp("20%"),
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
        top: hp("12%"),
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

export default styles;

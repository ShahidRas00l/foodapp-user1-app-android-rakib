import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

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

export default styles;

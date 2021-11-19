import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
    statusButton: {
        borderRadius: 5,
    },
    statusButtonText: {
        paddingVertical: hp("0.2%"),
        paddingHorizontal: wp("1.5%"),
        textTransform: "uppercase",
        fontWeight: "700",
        color: "#fff",
    },
    totalAmountArea: {
        borderTopColor: "#b4b4b4",
        borderTopWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: hp("1%"),
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
});

export default styles;

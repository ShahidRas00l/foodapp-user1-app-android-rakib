import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp("5%"),
    },
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: hp("1%"),
    },
    headerText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },
    f12: {
        fontSize: 12,
    },
    f14: {
        fontSize: 14,
    },
    f16: {
        fontSize: 16,
    },
    f18: {
        fontSize: 18,
    },
    f17: {
        fontSize: 17,
    },
    f22: {
        fontSize: 22,
    },
    textWhite: {
        color: "#fff",
    },
    textDark: {
        color: "#000",
    },
    textRed: {
        color: "#D2181B",
    },
    textGrey: {
        color: "#555555",
    },
    textLightGrey: {
        color: "#e3e3e3",
    },
    textWarning: {
        color: "#eacd07",
    },
    bgWhite: {
        backgroundColor: "#fff",
    },
    bgRed: {
        backgroundColor: "#D2181B",
    },
    bgGrey: {
        backgroundColor: "#555555",
    },
    bgDisabledGrey: {
        backgroundColor: "#c1b7b7",
    },
    bgLightGrey: {
        backgroundColor: "#e3e3e3",
    },
    bgLime: {
        backgroundColor: "#2d971a",
    },
    bgWarning: {
        backgroundColor: "#F5BD00",
    },
    bgSuccess: {
        backgroundColor: "#48BB78",
    },
    bgPink: {
        backgroundColor: "#e805a9",
    },
    bgCyan: {
        backgroundColor: "#0fdec6",
    },
    flex1: {
        flex: 1,
    },
    flexDirectionRow: {
        flexDirection: "row",
    },
    justifyCenter: {
        justifyContent: "center",
    },
    justifyEnd: {
        justifyContent: "flex-end",
    },
    justifyBetween: {
        justifyContent: "space-between",
    },
    alignItemsBetween: {
        justifyContent: "space-between",
    },
    alignItemsCenter: {
        justifyContent: "center",
    },
    fw600: {
        fontWeight: "600",
    },
    fw700: {
        fontWeight: "700",
    },
    paddingLeft0: {
        paddingLeft: wp("0%"),
    },
    paddingLeft05: {
        paddingLeft: wp("0.5%"),
    },
    paddingLeft1: {
        paddingLeft: wp("1%"),
    },
    paddingLeft2: {
        paddingLeft: wp("2%"),
    },
    paddingLeft5: {
        paddingLeft: wp("5%"),
    },
    paddingRight2: {
        paddingRight: wp("2%"),
    },
    paddingRight7: {
        paddingRight: wp("7%"),
    },
    paddingTop0: {
        paddingTop: hp("0%"),
    },
    paddingTop02: {
        paddingTop: hp("0.2%"),
    },
    paddingTop05: {
        paddingTop: hp("0.5%"),
    },
    paddingTop1: {
        paddingTop: hp("1%"),
    },
    paddingTop2: {
        paddingTop: hp("2%"),
    },
    paddingTop3: {
        paddingTop: hp("3%"),
    },
    paddingTop5: {
        paddingTop: hp("5%"),
    },
    paddingBottom05: {
        paddingBottom: hp("0.5%"),
    },
    paddingBottom1: {
        paddingBottom: hp("1%"),
    },
    paddingBottom2: {
        paddingBottom: hp("2%"),
    },
    paddingBottom3: {
        paddingBottom: hp("3%"),
    },
    paddingBottom20: {
        paddingBottom: 20,
    },
    paddingHorizontal2: {
        paddingHorizontal: wp("2%"),
    },
    paddingHorizontal0: {
        paddingHorizontal: wp("0%"),
    },
    paddingHorizontal5: {
        paddingHorizontal: wp("5%"),
    },
    paddingVertical5: {
        paddingVertical: wp("5%"),
    },
    boxShadow: {
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    elevation3: {
        elevation: 3,
    },
    elevation5: {
        elevation: 5,
    },
    modalView: {
        margin: 0,
        justifyContent: "flex-end",
    },
    marginLeft06: {
        marginLeft: wp("0.6%"),
    },
    marginLeft2: {
        marginLeft: wp("2%"),
    },
    marginLeft3: {
        marginLeft: wp("3%"),
    },
    marginLeft4: {
        marginLeft: wp("4%"),
    },
    marginRight1: {
        marginRight: wp("1%"),
    },
    marginRight2: {
        marginRight: wp("2%"),
    },
    marginRight3: {
        marginRight: wp("3%"),
    },
    marginRight4: {
        marginRight: wp("4%"),
    },
    marginTop0: {
        marginTop: wp("0%"),
    },
    marginTop1: {
        marginTop: hp("1%"),
    },
    marginTop2: {
        marginTop: hp("2%"),
    },
    marginTop3: {
        marginTop: hp("3%"),
    },
    marginTop5: {
        marginTop: hp("5%"),
    },
    marginBottom1: {
        marginBottom: hp("1%"),
    },
    marginHorizontal5: {
        marginHorizontal: wp("5%"),
    },
    circleIconArea: {
        backgroundColor: "#fff",
        width: 24,
        height: 24,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingVertical: hp("3%"),
        paddingHorizontal: wp("5%"),
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardHeaderLabel: {
        color: "#555555",
        fontSize: 18,
        fontWeight: "bold",
    },
    borderRed: {
        borderColor: "#D2181B",
        borderWidth: 1,
    },
    borderBottom: {
        borderBottomColor: "#f1ecec",
        borderBottomWidth: 1,
    },
    gmailIcon: {
        width: 30,
        height: 30,
    },
    height25p: {
        height: hp("25%"),
    },
    height18: {
        height: 18,
    },
    loadingArea: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noDataFoundArea: {
        backgroundColor: "#fff",
        paddingHorizontal: wp("3%"),
        paddingVertical: hp("1%"),
        borderRadius: 8,
        marginBottom: hp("2%"),
        marginHorizontal: wp("5%"),
        elevation: 5,
    },
    radioButtonArea: {
        paddingTop: hp("1.5%"),
    },
    radioButtonContainer: {
        flexDirection: "row",
        marginRight: wp("3%"),
        paddingBottom: hp("1.5%"),
    },
    radioButton: {
        height: 22,
        width: 22,
        backgroundColor: "#F8F8F8",
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "#D2181B",
        alignItems: "center",
        justifyContent: "center",
    },
    radioButtonIcon: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: "#D2181B",
    },
    radioButtonContentArea: {
        flexDirection: "row",
        paddingLeft: wp("2%"),
    },
    radioButtonImage: {
        width: 30,
        height: 20,
        marginTop: hp("0.5%"),
        marginRight: wp("2%"),
    },
    radioButtonText: {
        fontSize: 16,
    },
    textCenter: {
        textAlign: "center",
    },
    textRight: {
        textAlign: "right",
    },
    textCapitalize: {
        textTransform: "capitalize",
    },
});

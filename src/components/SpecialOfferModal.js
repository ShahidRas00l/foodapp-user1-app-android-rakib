import React, { Fragment } from "react";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Pressable } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Modal from "react-native-modal";
import globalStyles from "../styles/globalStyles";
import CheckBox from "@react-native-community/checkbox";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const SpecialOfferModal = (props) => {
    const {
        isSpecialOfferModalVisible,
        setSpecialOfferModalVisible,
        specialOfferModalState,
        handleSpecialOfferChange,
        isSpecialOfferButtonActive,
        addSpecialOffer,
    } = props;

    return (
        <Modal
            isVisible={isSpecialOfferModalVisible}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInTiming={500}
            animationOutTiming={500}
            style={globalStyles.modalView}
        >
            {specialOfferModalState ?
                <View>
                    <ScrollView>
                        <View style={styles.modalHeaderArea}>
                            <View>
                                <Text style={styles.modalHeaderField}>{specialOfferModalState.name}</Text>
                                <Text>{specialOfferModalState.description}</Text>
                            </View>
                            <TouchableOpacity style={styles.modalCloseIconArea}
                                              onPress={() => setSpecialOfferModalVisible(!isSpecialOfferModalVisible)}>
                                <AntDesign name="close" size={18} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalBody}>
                            {specialOfferModalState.packages.map((item, index) => (
                                <Fragment key={index}>
                                    <View style={styles.specialOfferBlockArea}>
                                        <Text style={styles.specialOfferBlockAreaHeader}>Choose
                                            any {item["chooseAny"]} item(s) from {item.name}</Text>
                                        {item.products.map((product, key) => {
                                            return <Fragment key={key}>
                                                <View style={styles.specialOfferBlockAreaBody}>
                                                    <Text
                                                        style={styles.specialOfferBlockAreaBodyLabel}>{product.title}</Text>
                                                    <CheckBox
                                                        value={product.isSelected}
                                                        disabled={product.isDisabled}
                                                        onValueChange={() => handleSpecialOfferChange(index, key)}
                                                    />
                                                </View>
                                            </Fragment>;
                                        })}
                                    </View>
                                </Fragment>
                            ))}
                            <View style={styles.addToArea}>
                                <Pressable
                                    style={[styles.addToButtonArea, !isSpecialOfferButtonActive && globalStyles.bgDisabledGrey]}>
                                    <Text
                                        style={styles.addToButton}
                                        onPress={() => isSpecialOfferButtonActive && addSpecialOffer()}
                                    >
                                        Save
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </View> :
                <View>
                    <Text>Not found!</Text>
                </View>
            }
        </Modal>
    );
};


const styles = StyleSheet.create({
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
        paddingBottom: hp("2%"),
    },
    modalContentField: {
        textAlign: "justify",
        lineHeight: 23,
        fontSize: 16,
        color: "#000000",
        paddingTop: hp("1%"),
    },
    specialOfferBlockArea: {
        marginTop: hp("2%"),
        paddingVertical: hp("1%"),
        borderRadius: 8,
        borderColor: "#eee",
        borderWidth: 1,
    },
    specialOfferBlockAreaHeader: {
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        paddingBottom: hp("1%"),
        paddingHorizontal: wp("2%"),
    },
    specialOfferBlockAreaBody: {
        paddingHorizontal: wp("2%"),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    specialOfferBlockAreaBodyLabel: {
        paddingTop: hp("1%"),
        fontSize: 16,
    },
    addToArea: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingTop: hp("2%"),
    },
    addToButtonArea: {
        borderRadius: 8,
        backgroundColor: "#D2181B",
        paddingHorizontal: wp("5%"),
        paddingVertical: hp("1%"),
    },
    addToButton: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
    },
});


export default SpecialOfferModal;

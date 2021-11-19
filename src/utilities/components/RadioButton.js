import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

const RadioButton = ({onPress, selected, label, radioButtonTextStyle}) => {
    return (
        <View style={styles.radioButtonContainer}>
            <TouchableOpacity onPress={onPress} style={styles.radioButton}>
                {selected ? <View style={styles.radioButtonIcon}/> : null}
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
                <Text style={[styles.radioButtonText, radioButtonTextStyle]}>{label}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    radioButtonContainer: {
        flexDirection: "row",
        marginRight: wp('3%')
    },
    radioButton: {
        height: 22,
        width: 22,
        backgroundColor: "#F8F8F8",
        borderRadius: 11,
        borderWidth: 1,
        borderColor: "#27C96D",
        alignItems: "center",
        justifyContent: "center"
    },
    radioButtonIcon: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: "#27C96D"
    },
    radioButtonText: {
        fontSize: 16,
        paddingLeft: wp('2%')
    }
});


export default RadioButton;
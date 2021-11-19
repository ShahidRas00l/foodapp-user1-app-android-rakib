import React from 'react';
import globalStyles from "../../styles/globalStyles";
import {ActivityIndicator, View} from "react-native";

const Loader = (props) => {
    return (
        <View style={[globalStyles.loadingArea]} {...props}>
            <ActivityIndicator size="large" color="#D2181B"/>
        </View>
    );
};


export default Loader;

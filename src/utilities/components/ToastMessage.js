import {ToastAndroid} from "react-native";

export const showToastWithGravityAndOffset = (msg = 'Not found!', duration = ToastAndroid.SHORT,
                                              gravity = ToastAndroid.BOTTOM, xOffset = 25,
                                              yOffset = 50) => {
    ToastAndroid.showWithGravityAndOffset(
        msg,
        duration,
        gravity,
        xOffset,
        yOffset
    );
};
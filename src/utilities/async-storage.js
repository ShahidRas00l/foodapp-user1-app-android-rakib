import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async (key) => {
    try {
        const value = await AsyncStorage.getItem(`@${key}`);
        if (value !== null) return value;
    } catch (error) {
        console.log(error);
    }
}

export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(`@${key}`);
        return true;
    } catch (error) {
        console.log(error);
    }
}
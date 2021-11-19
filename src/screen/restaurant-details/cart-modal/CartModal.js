import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import Modal from "react-native-modal";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import { CheckBox } from "react-native-elements";

import styles from "../styles";
import globalStyles from "../../../styles/globalStyles";

const CartModal = () => {
    return (
        <Modal
            isVisible={isModalVisible}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInTiming={500}
            animationOutTiming={500}
            style={globalStyles.modalView}>
            {modalState ?
                <View>
                    <ScrollView>
                        <View style={styles.modalHeaderArea}>
                            <Text style={styles.modalHeaderField}>
                                {modalState.title}
                            </Text>
                            <TouchableOpacity style={styles.modalCloseIconArea}
                                              onPress={() => {
                                                  setState({ ...state, ...{ isAdd: false, isRemove: false } });
                                                  setModalVisible(!isModalVisible);
                                              }}>
                                <AntDesign name="close" size={18} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalBody}>
                            {modalState.description !== "" &&
                            <Text style={styles.modalContentField}>
                                {modalState.description}
                            </Text>
                            }
                            {modalState.options.length > 0 &&
                            <>
                                <View style={styles.addonArea}>
                                    <Text style={globalStyles.fw700}>Choose Size</Text>
                                </View>
                                {modalState.options.map((item, index) => (
                                    <View
                                        key={index}
                                        style={[globalStyles.flexDirectionRow, globalStyles.justifyBetween]}
                                    >
                                        <Text style={[globalStyles.paddingTop1, globalStyles.f16]}>
                                            {item.name}
                                        </Text>
                                        <CheckBox
                                            title={`(+£${item.price})`}
                                            iconRight={true}
                                            checked={item.checked}
                                            onIconPress={() => handleSizeChange(item)}
                                            onPress={() => handleSizeChange(item)}
                                            containerStyle={styles.addonCheckBox}
                                        />
                                    </View>
                                ))}
                            </>
                            }
                            <View style={[globalStyles.flexDirectionRow, globalStyles.justifyCenter]}>
                                <View style={styles.addToArea}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (count > 1) {
                                                const updateState = { ...state };
                                                updateState.count = count - 1;
                                                updateState.isRemove = true;
                                                updateState.isAdd = false;
                                                updateState.twice = false;
                                                setState(updateState);
                                            }
                                        }}
                                    >
                                        <Feather name="minus-circle" size={24} color="#D2181B" />
                                    </TouchableOpacity>
                                    <Text style={globalStyles.f18}>
                                        {count}
                                    </Text>
                                    <TouchableOpacity onPress={() => {
                                        const updateState = { ...state };
                                        updateState.twice = count === 1;
                                        updateState.count = count + 1;
                                        updateState.isAdd = true;
                                        updateState.isRemove = false;
                                        setState(updateState);
                                    }}>
                                        <Feather name="plus-circle" size={24} color="#D2181B" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.addToButtonArea} onPress={() => {
                                if (count === 1) {
                                    const updateState = { ...state };
                                    updateState.count = count + 1;
                                    updateState.isAdd = true;
                                    updateState.isRemove = false;
                                    updateState.twice = false;
                                    setState(updateState);
                                } else {
                                    setState({ ...state, ...{ isAdd: false, isRemove: false } });
                                }
                                setModalVisible(!isModalVisible);
                                setIsViewBasket(true);
                            }}>
                                <Text style={styles.addToButton}>
                                    Add For £{parseFloat(modalState.price) * count}
                                </Text>
                            </TouchableOpacity>
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


export default CartModal;

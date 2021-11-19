import React from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import moment from "moment";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import { Picker } from "@react-native-picker/picker";

import styles from "../styles";
import globalStyles from "../../../styles/globalStyles";
import { bookFor, timings } from "../../../utilities/constants";

const BookingModal = ({bookingModalVisible, setBookingModalVisible}) => {
    return (
        <Modal
            isVisible={bookingModalVisible}
            animationIn="fadeIn"
            animationOut="fadeOut"
            animationInTiming={500}
            animationOutTiming={500}
            style={globalStyles.modalView}>
            <View>
                <ScrollView>
                    <View style={styles.modalHeaderArea}>
                        <Text style={styles.modalHeaderField}>
                            Table Booking
                        </Text>
                        <TouchableOpacity style={styles.modalCloseIconArea}
                                          onPress={() => setBookingModalVisible(false)}>
                            <AntDesign name="close" size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalBody}>
                        <View style={globalStyles.paddingTop1}>
                            <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Name</Text>
                            <TextInput
                                value={name}
                                placeholder={"Ex. Jhon"}
                                style={styles.inputField}
                                keyboardType={"default"}
                                onChangeText={text => setState({ ...state, name: text })}
                            />
                        </View>
                        <View style={globalStyles.paddingTop2}>
                            <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Contact No</Text>
                            <TextInput
                                value={contact}
                                placeholder={"Ex. 132456468"}
                                style={styles.inputField}
                                keyboardType={"default"}
                                onChangeText={text => setState({ ...state, contact: text })}
                            />
                        </View>
                        <View style={globalStyles.paddingTop2}>
                            <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Booking For</Text>
                            <View style={styles.selectionInputArea}>
                                <Picker
                                    style={{ height: 42 }}
                                    selectedValue={bookingFor}
                                    onValueChange={text => setState({ ...state, bookingFor: text })}
                                >
                                    <Picker.Item label={"Select Booking For"} value={""} />
                                    {bookFor.map((item, index) => (
                                        <Picker.Item key={index} label={item} value={item} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={globalStyles.paddingTop2}>
                            <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Number of Guests</Text>
                            <TextInput
                                value={guestNo}
                                placeholder={"Ex. 132456468"}
                                style={styles.inputField}
                                keyboardType={"default"}
                                onChangeText={text => setState({ ...state, guestNo: text })}
                            />
                        </View>
                        <View style={globalStyles.paddingTop2}>
                            <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Date</Text>
                            <View
                                style={styles.dateTimeArea}>
                                <TextInput
                                    style={styles.dateTimeInput}
                                    value={date ? moment(date).format("MM/DD/YYYY") : ""}
                                    editable={false}
                                    keyboardType={"default"}
                                />
                                <TouchableOpacity onPress={() => setDatePickerVisibility(!isDatePickerVisible)}>
                                    <Fontisto style={styles.dateTimeIcon} name="date" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={text => {
                                    setState({ ...state, date: text });
                                    setDatePickerVisibility(!isDatePickerVisible);
                                }}
                                onCancel={() => setDatePickerVisibility(!isDatePickerVisible)}
                            />
                        </View>
                        <View style={globalStyles.paddingTop2}>
                            <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Time</Text>
                            <View style={styles.selectionInputArea}>
                                <Picker
                                    style={{ height: 42 }}
                                    selectedValue={bookingFrom}
                                    onValueChange={text => setState({ ...state, bookingFrom: text })}
                                >
                                    <Picker.Item label={"Select Time"} value={""} />
                                    {timings.map((item, index) => (
                                        <Picker.Item key={index} label={item} value={item} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.continueButtonArea}>
                            <TouchableOpacity
                                style={styles.continueButton}
                                onPress={() => confirmBooking()}
                            >
                                <Text style={styles.continueText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

export default BookingModal;

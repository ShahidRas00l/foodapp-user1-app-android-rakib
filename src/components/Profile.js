import React, { useContext, useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";
import globalStyles from "../styles/globalStyles";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import { apiBaseUrl } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToastWithGravityAndOffset } from "../utilities/components/ToastMessage";
import Loader from "../utilities/components/Loader";

const Profile = () => {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const { user } = globalState;
  const [inputEditable, setInputEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    postCode: "",
  });

  const { name, email, mobile, address, postCode } = state;

  const getUser = async userId => {
    try {
      const response = await axios.get(`${apiBaseUrl}admin/fetch-owner/${userId}`);
      if (response.data && response.data["adminUser"]) {
        setState(response.data["adminUser"]);
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.data);
      }
    }
  };

  useEffect(() => {
    getUser(user["_id"]).then(res => console.log("USER:", res));
  }, [user]);

  const updateUser = async () => {
    if (inputEditable) {
      const payload = {
        name,
        mobile,
        address,
        postCode,
      };

      try {
        const response = await axios.put(`${apiBaseUrl}admin/update/${user["_id"]}`, payload);
        if (response.data && response.data.result) {
          await AsyncStorage.setItem("@user", JSON.stringify(response.data.result));

          showToastWithGravityAndOffset("Profile updated successfully");
          setGlobalState({
            ...globalState, ...{
              user: response.data.result,
            },
          });

          setState(response.data.result);
        }
      } catch (error) {
        if (error.response.data) {
          console.log(error.response.data);
        }
      }
    }

    setInputEditable(!inputEditable);
  };

  return (
    isLoading ? <Loader /> : <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[globalStyles.card, globalStyles.boxShadow, styles.profileArea]}>
          <View style={globalStyles.cardHeader}>
            <View style={globalStyles.flexDirectionRow}>
              <View
                style={[styles.circleIconArea, globalStyles.boxShadow, globalStyles.elevation5, globalStyles.marginLeft06]}>
                <Feather name="user" size={20} color="#D2181B" />
              </View>
              <Text style={styles.cardHeaderLabel}>Update Profile</Text>
            </View>
            <TouchableOpacity style={[globalStyles.flexDirectionRow, globalStyles.paddingTop05]}
                              onPress={() => updateUser()}>
              {!inputEditable && <MaterialIcons name="edit" size={20} color="#555555" />}
              {inputEditable &&
              <Feather style={globalStyles.marginRight1} name="check-circle" size={20} color="#555555" />
              }
              <Text style={styles.cardHeaderEditText}>{inputEditable ? "Save" : "Edit"}</Text>
            </TouchableOpacity>
          </View>
          <View style={globalStyles.paddingTop3}>
            <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>User ID</Text>
            <TextInput
              value={email}
              placeholder={"E-mail"}
              editable={false}
              style={styles.inputField}
              keyboardType={"default"}
            />
          </View>
          <View style={globalStyles.paddingTop3}>
            <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Full Name</Text>
            <TextInput
              value={name}
              placeholder={"Name"}
              editable={inputEditable}
              style={styles.inputField}
              keyboardType={"default"}
              onChangeText={text => setState({ ...state, name: text })}
            />
          </View>
          <View style={globalStyles.paddingTop3}>
            <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Contact Number</Text>
            <TextInput
              value={mobile}
              placeholder={"Mobile"}
              editable={inputEditable}
              style={styles.inputField}
              keyboardType={"default"}
              onChangeText={text => setState({ ...state, mobile: text })}
            />
          </View>
          <View style={globalStyles.paddingTop3}>
            <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Delivery Address</Text>
            <TextInput
              value={address}
              placeholder={"Address"}
              editable={inputEditable}
              style={styles.inputField}
              keyboardType={"default"}
              numberOfLines={4}
              multiline={true}
              onChangeText={text => setState({ ...state, address: text })}
            />
          </View>
          <View style={globalStyles.paddingTop3}>
            <Text style={[globalStyles.paddingBottom1, styles.inputLabel]}>Post Code</Text>
            <TextInput
              value={postCode}
              placeholder={"Post Code"}
              editable={inputEditable}
              style={styles.inputField}
              keyboardType={"default"}
              onChangeText={text => setState({ ...state, postCode: text })}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  circleIconArea: {
    backgroundColor: "#fff",
    width: 30,
    height: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  cardHeaderLabel: {
    color: "#555555",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: wp("2%"),
    paddingTop: hp("0.5%"),
  },
  cardHeaderEditText: {
    color: "#555555",
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft: wp("0.3%"),
  },
  inputField: {
    paddingVertical: hp("1%"),
    paddingLeft: wp("4%"),
    borderColor: "#d9d3d3",
    borderWidth: 1,
    borderRadius: 8,
  },
  inputLabel: {
    color: "#555555",
  },
  profileArea: {
    marginHorizontal: wp("5%"),
    marginVertical: hp("3%"),
  },
});

export default Profile;

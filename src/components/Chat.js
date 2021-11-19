import React, { useContext, useEffect, useState, Fragment, useRef } from "react";
import firebase from "../services/firebase";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import globalStyles from "../styles/globalStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GlobalContext } from "../context/GlobalContext";
import moment from "moment";
import Loader from "../utilities/components/Loader";
import { showToastWithGravityAndOffset } from "../utilities/components/ToastMessage";
import axios from "axios";
import { apiBaseUrl } from "../config";

const Chat = ({ navigation }) => {
  const { globalState } = useContext(GlobalContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({
    message: "",
  });
  const scrollViewRef = useRef();
  const { user } = globalState;

  const { message } = state;

  useEffect(() => {
    if (user) {
      const chatItems = firebase.database().ref(`${user["_id"]}chat`);
      chatItems.on("value", () => {
        const chats = firebase.database().ref(`${user["_id"]}chat`).child("live-support");
        chats.on("value", (snapshot) => {
          const newItems = snapshot.val();
          let data = [];
          for (const newItem in newItems) {
            data.push({
              id: newItem,
              senderId: newItems[newItem].senderId,
              message: newItems[newItem].message,
              time: newItems[newItem].time,
            });

            // const time = moment(newItems[newItem].time);
            const afterTime = moment(newItems[newItem].time);
            const a = moment(new Date);
            const b = moment(afterTime);
            const diff = a.diff(b, "hours");

            if (diff > 12) {
              const removeItems = firebase.database().ref(`${user["_id"]}chat`).child("live-support").child(newItem);
              removeItems.remove().then(res => console.log(res, 39));
            }
          }
          setData(data);
          setIsLoading(false);
        });
      });
    }
  }, []);

  const sendMessage = async () => {
    if (!message) {
      showToastWithGravityAndOffset("Please type your message!");
      return false;
    }

    const payload = {
      id: user["_id"],
      senderId: "live-support",
      message: message,
      userType: user.type,
    };

    try {
      const response = await axios.post(`${apiBaseUrl}superadmin/send-message`, payload);
      if (response.data && response.data.result) {
        showToastWithGravityAndOffset(response.data.result);
        setState({ ...state, message: "" });
      }
    } catch (error) {
      if (error.response.data) {
        console.log(error.response.data);
      }
    }
  };

  const toggleTabBar = value => {
    navigation.setOptions({ tabBarVisible: value });

    if (value) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 1000);
    } else {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
    return true;
  };

  const chatItem = data.length > 0 ?
    data.map((item, index) => (
      <Fragment key={index}>
        {item.senderId === user["_id"] ?
          <View style={styles.chatLeftArea}>
            <View style={[styles.chatBlock, globalStyles.bgLightGrey]}>
              <Text style={styles.chatSender}>{item.name ? item.name : "Live support"}:</Text>
              <Text style={styles.chatMessage}>{item.message}</Text>
              <Text style={styles.chatTime}>{moment(item.time).format("hh:mm A")}</Text>
            </View>
          </View>
          :
          <View style={styles.chatRightArea}>
            <View style={[styles.chatBlock, globalStyles.bgRed]}>
              <Text style={[styles.chatMessage, globalStyles.textWhite]}>{item.message}</Text>
              <Text style={[styles.chatTime, globalStyles.textLightGrey]}>{moment(item.time).format("hh:mm A")}</Text>
            </View>
          </View>
        }
      </Fragment>
    ))
    :
    <Text style={[globalStyles.paddingTop1, globalStyles.paddingHorizontal5]}>No chat found!</Text>;

  const chatContent = <View style={styles.chatArea}>
    <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
    >
      <View style={globalStyles.marginBottom1}>
        {chatItem}
      </View>
    </ScrollView>
    <View style={[styles.inputArea, globalStyles.boxShadow]}>
      <TextInput
        value={message}
        onChangeText={text => setState({ ...state, message: text })}
        style={styles.textInput}
        keyboardType={"default"}
        placeholder="Type your message here"
        onFocus={() => toggleTabBar(false)}
        onBlur={() => toggleTabBar(true)}
      />
      <TouchableOpacity onPress={() => sendMessage()}>
        <Ionicons style={styles.sendIcon} name="send" size={24} color="#D2181B" />
      </TouchableOpacity>
    </View>
  </View>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.headerTop, globalStyles.boxShadow]}>
        <Text style={[globalStyles.headerText, globalStyles.fw600, globalStyles.f22]}>
          Live Support
        </Text>
      </View>
      {isLoading ? <Loader /> : chatContent}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
  },
  inputArea: {
    flexDirection: "row",
  },
  textInput: {
    paddingVertical: hp("1%"),
    paddingLeft: wp("5%"),
    width: wp("85%"),
  },
  sendIcon: {
    paddingVertical: hp("1.5%"),
    width: wp("15%"),
    textAlign: "center",
  },
  chatArea: {
    flex: 1,
    justifyContent: "space-between",
  },
  chatLeftArea: {
    paddingHorizontal: wp("5%"),
    flexDirection: "row",
    marginTop: hp("1%"),
  },
  chatRightArea: {
    paddingHorizontal: wp("5%"),
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: hp("1%"),
  },
  chatBlock: {
    backgroundColor: "#e3e3e3",
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("0.5%"),
    borderRadius: 8,
  },
  chatSender: {
    fontSize: 12,
    color: "#535252",
  },
  chatMessage: {
    fontSize: 17,
    paddingVertical: hp("0.2%"),
  },
  chatTime: {
    fontSize: 12,
    color: "#535252",
  },
});


export default Chat;

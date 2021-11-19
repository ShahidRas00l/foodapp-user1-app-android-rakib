import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { apiBaseUrl } from "../config";
import HTML from "react-native-render-html";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Loader from "../utilities/components/Loader";
import moment from "moment";
import globalStyles from "../styles/globalStyles";

const TermsAndConditions = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTermsAndConditions = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}pcf/fetch-terms-user`);
      if (response.data && response.data.length > 0) {
        setData(response.data[0]);
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
    getTermsAndConditions().then(res => console.log("TERMS & CONDITIONS: ", res));
  }, []);

  const renderItem = data ?
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={globalStyles.paddingTop1}>
        <Text style={globalStyles.f18}>{data.title}</Text>
        <Text style={[globalStyles.f12, globalStyles.textGrey]}>Updated
          At: {moment(data.updatedAt).format("DD MMM YYYY")}</Text>
      </View>
      <HTML source={{ html: data.description }} />
    </ScrollView>
    :
    <View style={[globalStyles.noDataFoundArea, globalStyles.marginTop3]}>
      <Text>No terms of use available!</Text>
    </View>;

  return (
    isLoading ? <Loader /> : renderItem
  );
};

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      paddingHorizontal: wp("5%"),
    },
    loadingArea: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
    },
  },
);

export default TermsAndConditions;


import "react-native-gesture-handler";
import React, { useEffect, useMemo, useState } from "react";
import MasterRoute from "./src/navigation/MasterRoute";
import { StatusBar } from "react-native";
import { GlobalContext } from "./src/context/GlobalContext";
import { getItem } from "./src/utilities/async-storage";
import axios from "axios";

const App = () => {
    console.disableYellowBox = true;
    const [globalState, setGlobalState] = useState({
        sign_in_token: "",
        user: null,
        service_type: "",
        kitchenNotes: ""
    });

    const value = useMemo(() => {
        return { globalState, setGlobalState };
    }, [globalState, setGlobalState]);

    useEffect(() => {
        const updateGlobalState = { ...globalState };
        getItem("sign_in_token").then(res => {
            if (res) {
                updateGlobalState.sign_in_token = res;
                getItem("user").then(res => {
                    if (res) {
                        updateGlobalState.user = JSON.parse(res);
                        setGlobalState(updateGlobalState);
                    }
                });
            }
        });
    }, []);

    useEffect(() => {
        if (globalState.sign_in_token) {
            axios.interceptors.request.use(function(config) {
                config.headers.common["x-auth-token"] = globalState.sign_in_token;
                return config;
            }, function(error) {
                return Promise.reject(error);
            });
        }
    }, [globalState.sign_in_token]);

    return (
        <GlobalContext.Provider value={value}>
            <StatusBar barStyle="light-content" backgroundColor={"#D2181B"} />
            <MasterRoute />
        </GlobalContext.Provider>
    );
}

export default App;

// export default AppRegistry.registerComponent('Appname', () => App)

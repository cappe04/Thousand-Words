import { Redirect, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setMetadata } from "../src/api";
import { flushStorage, initStorage } from "../src/data";
import { ErrorMessage } from "../components";
import { colors, container } from "../constants";

export default Index = () => {

    const [appIsReady, setAppIsReady] = useState(false);
    const [errorObject, setErrorObject] = useState({ didFail: false, type: "", message: "" });

    useEffect(() => {
        async function prepare() {
            try {
                // Init Data
                await setMetadata();
                await initStorage();
                // await flushStorage(); // clear local data
    
                // Logs storage, temporary
                const storageKeys = await AsyncStorage.getAllKeys();
                storageKeys.forEach(async key => console.info(`${key}: ${await AsyncStorage.getItem(key)}`));

                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                setErrorObject({
                    didFail: true,
                    type: error.name,
                    message: error.message
                });
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);
    const onLayoutRootView = useCallback(async () => {
        if(appIsReady){
            await SplashScreen.hideAsync();
        }
    }, [appIsReady])

    if(!appIsReady) 
        return null;

    return (
        <SafeAreaView style={[container.safe]} onLayout={onLayoutRootView}>
            <StatusBar hidden={false} barStyle={"light-content"}/>
            
            { errorObject.didFail ? (
                <View style={{ justifyContent: "center", flex: 1, }}>
                <ErrorMessage type={errorObject.type} message={errorObject.message} />
                </View>
            ) : /* if not error goto menu */
                router.push("/menu")
            }
        </SafeAreaView>
    )
}
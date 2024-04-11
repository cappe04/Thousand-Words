import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setMetadata } from "../src/api";
import { initStorage } from "../src/data";
import { ErrorMessage } from "../components";
import { colors } from "../constants";

export default Index = () => {

    const [appIsReady, setAppIsReady] = useState(false);
    const [errorObject, setErrorObject] = useState({ didFail: false, type: "", message: "" });

    useEffect(() => {
        async function prepare() {
            try {
                // Init Data
                await setMetadata();
                await initStorage();
    
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
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg, justifyContent: "center" }} onLayout={onLayoutRootView}>
            <StatusBar hidden={false} barStyle={"light-content"}/>
            
            { errorObject.didFail ? (
                <ErrorMessage type={errorObject.type} message={errorObject.message}></ErrorMessage>
            ) : /* should be router.replace */(
                <View>
                    <Text>Loaded Correctly</Text>
                </View>
            ) }
        </SafeAreaView>
    )
}
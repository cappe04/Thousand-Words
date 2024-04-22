import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";

import * as SplashScreen from "expo-splash-screen";

import { setMetadata } from "../src/api";
import { initStorage } from "../src/data";
import { ErrorMessage, Redirect } from "../components";
import { container } from "../constants";

export default Index = () => {
    const [appIsReady, setAppIsReady] = useState(false);
    const [errorObject, setErrorObject] = useState({ didFail: false, type: "", message: "" });
    
    const onLayoutRootView = useCallback(async () => {
        if(appIsReady){
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    useEffect(() => {
        async function prepare() {
            try {
                // Init Data
                await setMetadata();
                await initStorage();

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

    if(!appIsReady) 
        return null;
    return (
        <SafeAreaView style={[container.safe]} onLayout={onLayoutRootView}>
            <StatusBar hidden={false} barStyle={"light-content"}/>
            
            { errorObject.didFail ? (
                <View style={{ justifyContent: "center", flex: 1, }}>
                <ErrorMessage type={errorObject.type} message={errorObject.message} />
                </View>
            ) : (
                <Redirect push href="/menu"/>
            )}
        </SafeAreaView>
    )
}
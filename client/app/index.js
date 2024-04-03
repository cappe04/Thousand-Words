import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ActivityIndicator, View, Text } from "react-native";
import { COLORS } from "../constants";

import api from "../src/api";
import data from "../src/data";

const OnLoad = () => {
    
    const [loading, setLoading] = useState(true);
    
    const loadData = async () => {
        try {
            await api.loadMetadata();
            await data.loadUserdata();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, flex: 1 }}>
            <Stack.Screen options={{headerStyle: { backgroundColor: COLORS.lightWhite }, headerTitle: ""}} />
            { loading ? (
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    flex: 0.9,
                }}>
                    <ActivityIndicator />
                    <Text style={{
                        padding: 10,
                    }}>Loading...</Text>
                </View>
            ) : (
                <Redirect href={"/menu"}/>
            )}
        </SafeAreaView>
    )
}

export default OnLoad;
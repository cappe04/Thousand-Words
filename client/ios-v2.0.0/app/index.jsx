import { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Index = () => {

    const [data, setData] = useState("null");
    
    const loadData = async () => {
        try {
            const value = await AsyncStorage.getItem("test")
            setData(value ?? "null")
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <SafeAreaView>
            <Text>{data}</Text>
        </SafeAreaView>
    )
}

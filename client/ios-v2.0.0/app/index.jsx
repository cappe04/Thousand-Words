import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { fetchTable, fetchBatches, setMetadata } from "../src/api";
import state from "../src/state";

export default Index = () => {

    const [data, setData] = useState(null);

    const loadData = async () => {
        try {
            await setMetadata()
            const data = await fetchBatches("ru", "common", 1, state.metadata.langs.ru.tables.common.formatting);
            setData(data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <SafeAreaView>
            <Text>Hello, World!</Text>
            { data == null ? (
                <View>
                    <Text>NULL</Text>
                </View>
            ) : 
                data[0].words.map((item, i) => <View key={i}>
                    <Text>{item.word}</Text>
                </View>)
            }
        </SafeAreaView>
    )
}

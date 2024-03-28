import { useRouter, Stack } from "expo-router"
import { Pressable, Text, View, SafeAreaView, ScrollView } from "react-native";

import state from "../src/state";
import { COLORS } from "../constants";

export default Menu = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, flex: 1 }}>
            <Stack.Screen 
                options={{
                    headerTitle: "Menu",
                    headerStyle: {
                        backgroundColor: COLORS.lightWhite,
                    }
                }}
            />

            <ScrollView>
                { Object.keys(state.metadata["ru"]).map((table, key) => {
                    return <Pressable onPress={() => {
                        router.push({
                            pathname: "/main",
                            params: {
                                lang: "ru",
                                table: table,
                                id: state.metadata["ru"][table].formatting.complex ? state.userdata["ru"][table].currentId: 0
                            }
                        })
                    }} style={{
                        alignItems: "center",
                        padding: 10,
                        backgroundColor: COLORS.lightGray,
                        borderColor: COLORS.gray2,
                        borderBottomWidth: 1,
                    }} key={key}>
                        <Text>{state.metadata["ru"][table].title}</Text>
                    </Pressable>
                })

                }
            </ScrollView>
        </SafeAreaView>
    )
}
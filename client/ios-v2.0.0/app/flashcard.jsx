import { Pressable, SafeAreaView, Text, View, Image, ScrollView } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import state from "../src/state";
import { colors, container, icons, shadows, text } from "../constants";
import { useState } from "react";
import { FlashcardNavigator } from "../components";
import NavBar from "../components/common/NavBar";


export default function Flashcard() {

    const router = useRouter();
    const { table } = useLocalSearchParams();

    const [currentTabKey, setCurrentTabKey] = useState(0);

    return (
        <SafeAreaView style={container.safeDark}>
            <Stack.Screen options={{
                headerShown: true,
                headerShadowVisible: false,
                headerTitle: "Day 1",
                headerTintColor: colors.fg,
                headerLeft: () => (
                    <Pressable onPress={router.back}>
                        <Image source={icons.menu} tintColor={colors.fg} style={{ width: 30, height: 30 }}/>
                    </Pressable>
                ),
                headerRight: () => /* maybe not, find better integration for day change */(
                    <Pressable onPress={() => router.push("/settings")}>
                        <Image source={icons.settings} tintColor={colors.fg} style={{ width: 30, height: 30 }}/>
                    </Pressable>
                ),
                headerStyle: {
                    backgroundColor: colors.bg,
                },
            }} />   

            <View style={{ backgroundColor: colors.bg, paddingTop: 10 }}>
                <NavBar items={[
                    { key: 0, value: "New Words" },
                    { key: 1, value: "Repeat Words" },
                    { key: 2, value: "Wordbook" },
                ]} callback={key => {setCurrentTabKey(key)}} />
            </View>

                { currentTabKey == 0 && <FlashcardNavigator /> }

        </SafeAreaView>
    )
}
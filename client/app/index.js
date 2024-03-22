import { Stack, useRouter } from "expo-router";
import { View, Text, SafeAreaView } from "react-native"

import { Flashcard, FlashcardNavButton, HeaderIconButton, HeaderWordButton } from "../components"

import { COLORS, SHADOWS } from "../constants";
import icons from "../constants/icons";
import { React, useState } from "react";

const Home = () => {
    const router = useRouter();
    const [temp1, setTemp1] = useState(true)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen 
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: true,
                    headerLeft: () => (
                        <HeaderIconButton icon={icons.MENU} dimension={"60%"} callback={() => {}}/>
                    ),
                    headerRight: () => (
                        <HeaderIconButton icon={icons.OPTIONS} dimension={"60%"} callback={() => {}}/>
                    ),
                    headerTitle: "Day 1",
                }}
            />
    
        <View>
            <HeaderWordButton text={temp1 ? "Today's new words": "Word repetitions"} callback={()=>{ setTemp1(!temp1) }}/>
        </View>

        <View style={{
            marginVertical: 100
        }}>
            <View>
                <Flashcard word={{
                    word: "принести",
                    translation: "to bring",
                    type: "verb",
                }}/>
            </View>
            <View style={{
                display: "flex",
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
            }}>
                <FlashcardNavButton text={"Previous"}/>
                <FlashcardNavButton text={"Next"}/>
            </View>
        </View>

        </SafeAreaView>
    )
}

export default Home;
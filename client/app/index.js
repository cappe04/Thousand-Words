import { Stack, useRouter } from "expo-router";
import { View, Text, SafeAreaView } from "react-native"

import { HeaderIconButton, NavBar, FlashcardArea, Flashcard, FlashcardNavButton } from "../components"

import { COLORS, SHADOWS } from "../constants";
import icons from "../constants/icons";
import { React, useState } from "react";

const Home = () => {
    const router = useRouter();

    const learnWords = [
        { word: "принести", translation: "to bring", type: "verb", },
        { word: "комната", translation: "a room", type: "noun", },
        { word: "часть", translation: "part, share, department", type: "noun", },
        { word: "сегодня", translation: "today", type: "adverb", },
    ];

    const practiceWords = [
        { word: "1", translation: "to bring", type: "verb", },
        { word: "2", translation: "a room", type: "noun", },
        { word: "3", translation: "part, share, department", type: "noun", },
        { word: "4", translation: "today", type: "adverb", },
        { word: "5", translation: "today", type: "adverb", },
    ];

    const [words, setWords] = useState(learnWords)
    
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
    
        
        <View style={{ paddingTop: 17 }}>
            <NavBar callback={(learningMode) => { setWords(learningMode ? learnWords: practiceWords) }}/>
        </View>

        

        <View style={{ paddingTop: 100 }}>
            <FlashcardArea words={words}/>
        </View>
        
        

        </SafeAreaView>
    )
}

export default Home;
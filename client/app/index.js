import { Stack, useRouter } from "expo-router";
import { View, Text, SafeAreaView } from "react-native"

import { HeaderIconButton, NavBar, LearnWords, PracticeWords, WordList } from "../components"

import { COLORS, SHADOWS } from "../constants";
import icons from "../constants/icons";
import { React, useState } from "react";

function getWords(day){
    return [
        {
            day: 5,
            words: [
                { word: "принести", translation: "to bring", type: "verb", },
                { word: "комната", translation: "a room", type: "noun", },
                { word: "часть", translation: "part, share, department", type: "noun", },
                { word: "сегодня", translation: "today", type: "adverb", },
            ]
        },
        {
            day: 4,
            words: [
                { word: "бог", translation: "god", type: "noun" },
                { word: "вместе", translation: "together", type: "adverb" },
                { word: "взгляд", translation: "look, glance; view", type: "noun" },
                { word: "ходить", translation: "to go, walk", type: "verb" },
                { word: "зачем", translation: "what for, why", type: "adverb" },
            ]
        },
        {
            day: 2,
            words: [
                { word: "первый", translation: "first, front, former", type: "adjective, number" },
                { word: "день", translation: "day", type: "noun" },
                { word: "тут", translation: "here, now, then", type: "adverb" },
                { word: "во", translation: "in, at; super, exactly", type: "preposition, particle" },
                { word: "ничто", translation: "nothing", type: "pronoun" },
                { word: "потом", translation: "afterwards, then", type: "adverb" },
                { word: "очень", translation: "very", type: "adverb" },
            ]
        },
    ]
}

const Home = () => {
    const router = useRouter();

    const day = 5;
    const words = getWords(day);
    const [tab, setTab] = useState(0);
    
    const currentWordSet = "words";
    const wordSet = {
        words: {
            header: `Day ${day}`,
            tabsTitle: ["Learn Words", "Practice Words", "Word List"],
            tabsRender: () => {
                return (
                    <View>
                        {tab === 0 && <LearnWords words={words[0]}/>}
                        {tab === 1 && <PracticeWords words={words.slice(1)}/>}
                        {tab === 2 && <WordList words={words} divided={true}/>}
                    </View>
                )
            }
        },
        other: {
            header: "Other",
            tabsTitle: ["Learn Words", "Word List"],
            tabsRender: () => {
                return (
                    <View>
                        {tab === 0 && <LearnWords words={words[0]}/>}
                        {tab === 1 && <WordList words={words} divided={false}/>}
                    </View>
                )
            }
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen 
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: true,
                    headerLeft: () => (
                        <HeaderIconButton icon={icons.MENU} dimension={"60%"} callback={() => {}}/>
                    ),
                    // headerRight: () => (
                    //     <HeaderIconButton icon={icons.OPTIONS} dimension={"60%"} callback={() => {}}/>
                    // ),
                    headerTitle: wordSet[currentWordSet].header,
                }}
            />
        
        <View style={{ paddingTop: 17 }}>
            <NavBar tabs={wordSet[currentWordSet].tabsTitle} callback={(tab) => { setTab(tab) }}/>
        </View>

        { wordSet[currentWordSet].tabsRender() }
        
        

        </SafeAreaView>
    )
}

export default Home;
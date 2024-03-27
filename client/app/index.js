import { Stack, useRouter } from "expo-router";
import { View, Text, SafeAreaView, ActivityIndicator } from "react-native"

import { HeaderIconButton, NavBar, LearnWords, PracticeWords, WordList, FlashcardOptions } from "../components"

import { COLORS, SHADOWS } from "../constants";
import icons from "../constants/icons";
import { React, useEffect, useState } from "react";

async function getTestWords(table, day){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = [
                {
                    day: day,
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
            ];
            resolve(data);
        }, 2000);
    })
}

async function fetchWords(lang, table, day){
    const url = `http://192.168.1.51:5000/lang_api/${lang}?table=${table}`;
    console.log(url);
    const fetchedData = [];

    if(day == undefined){
        const data =  await fetch(url).then(response => response.json());
        fetchedData.push({ day: 0, words: data.map((word) => {
            return { word: word[1], translation: word[2], type: word[3] } 
        })})
    }
    
    const layout = [1, 2, 3, 5, 8, 13, 21];
    const daySize = 20;

    const promises = layout.map(async (i) => {
        const currentDay = day-i+1
        if(currentDay > 0){
            const data = await fetch(url + `&start=${(currentDay-1)*daySize+1}&end=${currentDay*daySize}`).then(response => response.json())
            fetchedData.push({ day: currentDay, words: data.map((word) => {
                return { word: word[1], translation: word[2], type: word[3] }
            })});
        }
    });

    await Promise.all(promises);
    return fetchedData;
}

const Home = () => {
    const router = useRouter();
    
    const [currentDay, setCurrentDay] = useState(1); // load from file
    const [tab, setTab] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [words, setWords] = useState([]);

    const currentLang = "ru"; // load from file or from menu
    const currentTable = "words"; // load from file or from menu

    const getData = async () => {
        setIsLoading(true)
        try {
            const response = await fetchWords(currentLang, currentTable, currentDay);
            // const response = await getTestWords(currentTable, currentDay);
            setWords(response);
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData();
        setTab(0);
    }, [currentDay])
    
    // const words = getWords(currentWordSet, currentDay); // make web requsest

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen 
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerLeft: () => (
                        <HeaderIconButton icon={icons.MENU} dimension={"60%"} callback={() => {}}/>
                    ),
                    headerRight: () => (
                        <HeaderIconButton icon={icons.OPTIONS} dimension={"60%"} callback={() => {setShowOptions(!showOptions)}}/>
                    ),
                    headerTitle: currentTable != "words" ? currentTable: `Day ${currentDay}`,
                }}
            />
        
            {isLoading ? (
                <View style={{
                    marginTop: "30%",
                }}>
                    <ActivityIndicator />
                </View>
            ) : (
                <View>
                    <View style={{ paddingTop: 17 }}>
                        <NavBar 
                            tabs={["Learn Words", "Practice Words", "Word List"]} 
                            callback={(tab) => { setTab(tab) }} 
                            skip={currentTable != "words" ? 1: undefined}
                        />
                    </View>

                    {tab === 0 && <LearnWords words={words[0]}/>}
                    {tab === 1 && <PracticeWords words={words.slice(1)}/>}
                    {tab === 2 && <WordList words={words} divided={currentTable == "words"}/>}
                        
                </View>
            )}
            
            <FlashcardOptions show={showOptions && currentTable == "words"} currentDay={currentDay} setCurrentDay={setCurrentDay}/>
        
        </SafeAreaView>
    )
}

export default Home;
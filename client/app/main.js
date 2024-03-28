import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, SafeAreaView, ActivityIndicator } from "react-native"

import { HeaderIconButton, NavBar, LearnWords, PracticeWords, WordList, FlashcardOptions } from "../components"

import { COLORS, SHADOWS } from "../constants";
import icons from "../constants/icons";
import { React, useEffect, useState } from "react";

import state from "../src/state";
import api from "../src/api";


const Main = () => {
    const router = useRouter();

    const { id, table, lang } = useLocalSearchParams();
    const metadata = state.metadata[lang][table];
    const userdata = state.userdata[lang][table];

    const [currentId, setCurrentId] = useState(parseInt(id)); // load from file
    const [tab, setTab] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [words, setWords] = useState([]);

    const getData = async () => {
        setIsLoading(true)
        try {
            const response = metadata.formatting.complex 
                ? await api.fetchBaches(lang, table, currentId)
                : await api.fetchWords(lang, table);
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
        if(metadata.formatting.complex)
            userdata.currentId = currentId;
    }, [currentId])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen 
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerLeft: () => (
                        <HeaderIconButton icon={icons.MENU} dimension={"60%"} callback={router.back}/>
                    ),
                    headerRight: () => (
                        <HeaderIconButton icon={icons.OPTIONS} dimension={"60%"} callback={() => {setShowOptions(!showOptions)}}/>
                    ),
                    headerTitle: metadata.formatting.complex ? (metadata.formatting.batch_title.title + (metadata.formatting.batch_title.index ? ` ${currentId}`: "")): metadata.title,
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
                            skip={!metadata.formatting.complex ? 1: undefined}
                        />
                    </View>

                    {tab === 0 && <LearnWords words={metadata.formatting.complex ? words[0].words: words}/>}
                    {tab === 1 && <PracticeWords words={words.slice(1)}/>}
                    {tab === 2 && <WordList words_or_batch={words} is_batch={metadata.formatting.complex} batch_title={metadata.formatting.batch_title?.title}/>}
                        
                </View>
            )}
            
            <FlashcardOptions show={showOptions && metadata.formatting.complex} currentId={currentId} setCurrentId={setCurrentId} batch_title={metadata.formatting.batch_title?.title}/>
        
        </SafeAreaView>
    )
}

export default Main;
import { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, SafeAreaView, Text, View, Image, ScrollView } from "react-native";

import { colors, container, icons, shadows, text } from "../constants";
import { ErrorMessage, FlashcardNavigator, FlashcardWordList, NavBar } from "../components";

import state from "../src/state";
import { setHistory, getHistory, updateHistory } from "../src/data";
import { fetchBatch, fetchBatches } from "../src/api";

export default function Flashcard() {
    const router = useRouter();
    const { table } = useLocalSearchParams();

    const metadata = state.metadata.langs[state.currentLang].tables[table];
    const complex = metadata.formatting.complex;

    const [currentId, setCurrentId] = useState(getHistory(state.currentLang, table) ?? 1);
    const [wordBatches, setWordBatches] = useState([]);
    const [currentTabKey, setCurrentTabKey] = useState(0);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [errorObject, setErrorObject] = useState({
        didFail: false,
    })
    
    function getTitle(){
        if(!complex) return metadata.title;
        const { title, index } = metadata.formatting.batch_title;
        return title + (index ? ` ${currentId}`: "");
    }

    async function getData(){
        if(!complex) return [await fetchBatch(state.currentLang, table)];
        return await fetchBatches(state.currentLang, table, currentId, metadata.formatting);
    }

    async function onUpdate(){
        try{
            setHistory(state.currentLang, table, currentId);
            await updateHistory();
            const data = await getData(); 
            setWordBatches(data);
        } catch (error){
            setErrorObject({
                didFail: true,
                type: error.name,
                message: error.message
            });
        } finally {
            setHasLoaded(true);
        }
    }

    useEffect(() => {
        onUpdate();
    }, [currentId]);
    
    const navBarItems = [
        { key: 0, value: "New Words" },
        { key: 2, value: "Wordbook" },
    ];
    if(complex) navBarItems.splice(1, 0, { key: 1, value: "Repeat Words" });
    
    return (
        <SafeAreaView style={container.safeDark}>
            <Stack.Screen options={{
                headerShown: true,
                headerShadowVisible: false,
                headerTitle: getTitle(),
                headerTintColor: colors.fg,
                headerLeft: () => (
                    <Pressable onPress={() => router.replace("/menu")}>
                        <Image source={icons.menu} tintColor={colors.fg} style={{ width: 30, height: 30 }}/>
                    </Pressable>
                ),
                headerRight: () => { if(complex) return (
                    <Pressable onPress={() => router.push({ pathname: "/flashcard_settings", params: { table: table }})}>
                        <Image source={icons.settings} tintColor={colors.fg} style={{ width: 30, height: 30 }}/>
                    </Pressable>
                )},
                headerStyle: {
                    backgroundColor: colors.bg,
                },
            }} />

            
            { errorObject.didFail ? (
                <View style={{ justifyContent: "center", paddingTop: "5%" }}>
                    <ErrorMessage type={errorObject.type} message={errorObject.message}/>
                </View>
            ) : (
                <View style={{ flex: 1, }}>    
                    <View style={{ backgroundColor: colors.bg, paddingTop: 10 }}>
                        <NavBar items={navBarItems} callback={key => {setCurrentTabKey(key)}} />
                    </View>
                    { hasLoaded && currentTabKey == 0 && <FlashcardNavigator batch={wordBatches[0]}/> }
                    { hasLoaded && currentTabKey == 1 && <FlashcardNavigator batches={wordBatches.slice(1)}/> }
                    { hasLoaded && currentTabKey == 2 && <FlashcardWordList batches={wordBatches}/> }
                </View>
            )}
        </SafeAreaView>                
    )
}


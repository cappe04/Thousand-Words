import { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, SafeAreaView, Text, View, Image, ScrollView } from "react-native";

import { colors, container, icons, shadows, text } from "../constants";
import { ErrorMessage, FlashcardNavigator, FlashcardWordList, NavBar } from "../components";

import state from "../src/state";
import { setHistory, getHistory, updateHistory } from "../src/data";
import { fetchBatches } from "../src/api";

export default function Flashcard() {
    // TODO: be able to read non-complex tables.
    const router = useRouter();
    const { table } = useLocalSearchParams();

    const metadata = state.metadata.langs[state.currentLang].tables[table];

    const [currentId, setCurrentId] = useState(getHistory(state.currentLang, table) ?? 1);
    const [wordBatches, setWordBatches] = useState([]);
    const [currentTabKey, setCurrentTabKey] = useState(0);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [errorObject, setErrorObject] = useState({
        didFail: false,
    })
    
    useEffect(() => {
        async function onUpdate(){
            try{
                setHistory(state.currentLang, table, currentId);
                await updateHistory();
                const data = await fetchBatches(state.currentLang, table, currentId, metadata.formatting);
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
        onUpdate();
    }, [currentId]);
    
    
    return (
        <SafeAreaView style={container.safeDark}>
            <Stack.Screen options={{
                headerShown: true,
                headerShadowVisible: false,
                headerTitle: "Day 1", // TODO: Use metadata formatting.
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

            
            { errorObject.didFail ? (
                <View style={{ justifyContent: "center", paddingTop: "5%" }}>
                    <ErrorMessage type={errorObject.type} message={errorObject.message}/>
                </View>
            ) : (
                <View style={{ flex: 1, }}>    
                    <View style={{ backgroundColor: colors.bg, paddingTop: 10 }}>
                        <NavBar items={[
                            { key: 0, value: "New Words" },
                            { key: 1, value: "Repeat Words" }, // TODO: turn of if not complex
                            { key: 2, value: "Wordbook" },
                        ]} callback={key => {setCurrentTabKey(key)}} />
                    </View>
                    { hasLoaded && currentTabKey == 0 && <FlashcardNavigator batch={wordBatches[0]}/> }
                    { hasLoaded && currentTabKey == 1 && <FlashcardNavigator batches={wordBatches.slice(1)}/> }
                    { hasLoaded && currentTabKey == 2 && <FlashcardWordList batches={wordBatches}/> }
                </View>
            )}
        </SafeAreaView>                
    )
}


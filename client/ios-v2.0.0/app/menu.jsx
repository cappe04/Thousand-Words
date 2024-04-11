import { SafeAreaView, Text, View } from "react-native";
import { useRouter } from "expo-router"

import { colors, container, text } from "../constants";
import { DropDown, MenuTableList } from "../components";
import state from "../src/state";
import { updateCurrentLang } from "../src/data";
import { useState } from "react";


export default function Menu(){

    const getLangString = (lang) => {
        const native = state.metadata.langs[lang].meta.native;
        const en = state.metadata.langs[lang].meta.en;
        return `${native} (${en})`;
    }

    const getCurrentTabels = () => {
        if(state.currentLang == null) return null;
        const tables = state.metadata.langs[state.currentLang].tables;
        return Object.keys(tables).map(table => {
            return { key: table, value: tables[table].title }
        })
    }
    
    const router = useRouter();
    const [currentLangString, setCurrentLangString] = useState(state.currentLang == null ? null: getLangString(state.currentLang));
    const [tableItems, setTableItems] = useState(getCurrentTabels());

    const langItems = Object.keys(state.metadata.langs).map(lang => {
        return { key: lang, value: getLangString(lang) };
    });

    return (
        <SafeAreaView style={container.safe}>
            
            <View style={{top: "50%"}}>
                <MenuTableList items={tableItems} callback={table => router.push(
                    {
                        pathname: "/flashcard",
                        params: {
                            table: table,
                        }
                    }
                )}/>
            </View>
            <View style={{top: "-90%"}}>
                <View style={{alignItems: "center"}}>
                    <Text style={[text.medium, { padding: 10 }]}>Selected Language:</Text>
                </View>
                <View style={{paddingHorizontal: 10}}>
                    <DropDown items={langItems} defualt={currentLangString} callback={async lang => {
                        setCurrentLangString(lang);
                        state.currentLang = lang;
                        setTableItems(getCurrentTabels())
                        await updateCurrentLang();
                    }}/>
                </View>
            </View>
        </SafeAreaView>
    )
}
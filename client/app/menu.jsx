import { Pressable, SafeAreaView, Text, View, Image, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router"

import { colors, container, text, icons } from "../constants";
import { DropDown, MenuTableList } from "../components";
import state from "../src/state";
import { updateCurrentLang } from "../src/data";
import { useState } from "react";


export default function Menu(){

    const getLangString = (lang) => {
        const native = state.metadata.langs[lang].meta.native;
        const en = state.metadata.langs[lang].meta.en;
        return `${native} [${en}]`;
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
            <Stack.Screen options={{
                headerShown: true,
                headerShadowVisible: false,
                headerTitle: "",
                headerBackVisible: false,
                headerStyle: {
                    backgroundColor: colors.bg,
                },
                headerRight: () => (
                    <Pressable onPress={() => router.push("/settings")}>
                        <Image source={icons.settings} tintColor={colors.fg} style={{ width: 30, height: 30 }}/>
                    </Pressable>
                )
            }} />
            <View style={styles.tableContainer}>
                <MenuTableList items={tableItems} callback={table => router.push({
                        pathname: "/flashcard",
                        params: {
                            table: table,
                        }
                    }
                )}/>
            </View>
            <View style={styles.langContainer}>
                <View style={styles.langTextContainer}>
                    <Text style={text.medium}>Selected Language:</Text>
                </View>
                <View style={styles.langDropDownContainer}>
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

const styles = StyleSheet.create({
    tableContainer: {
        top: "50%",
    },
    langContainer: {
        top: "-90%",
    },
    langTextContainer: {
        alignItems: "center",
        padding: 10,
    },
    langDropDownContainer: {
        paddingHorizontal: 10,
    },
})
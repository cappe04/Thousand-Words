import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { container, text, icons, colors } from "../constants";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { getHistory, setHistory, updateHistory } from "../src/data";
import state from "../src/state";
import { SettingsMenu } from "../components";

export default function Settings(){

    const router = useRouter();

    const { table } = useLocalSearchParams();
    const metadata = state.metadata.langs[state.currentLang].tables[table];

    const [currentId, setCurrentId] = useState(getHistory(state.currentLang, table));

    function confirmSettings(){
        setHistory(state.currentLang, table, currentId);
        updateHistory();
        router.replace({ pathname: "/flashcard", params: { table: table } });
    }

    function incrementButton(symbol){
        const icon = symbol === "plus" ? icons.plus: icons.minus
        const func = symbol === "plus" ? () => { setCurrentId(currentId + 1) }: 
                                         () => { setCurrentId(Math.max(currentId - 1, 1)) }
        return (
            <Pressable style={styles.incrementIdButtonContainer} onPress={func}>
                <Image source={icon} tintColor={colors.fg} style={styles.increamentIdButtonImage}/>
            </Pressable>
        )
    }

    return (
        <SettingsMenu onBack={router.back} onConfirm={confirmSettings}>
            <View style={styles.incrementOptionContainer}>
                <Text style={text.large}>{ `${metadata.formatting.batch_title.title}:` }</Text>
                <View style={styles.incrementIdContainer}>
                    { incrementButton("minus") }
                    <View style={styles.incrementIdText}>
                        <Text style={text.medium}>{ currentId }</Text>
                    </View>
                    { incrementButton("plus") }
                </View>
            </View>

            <View style={styles.resetOptionContainer}>
                <View style={styles.resetText}>
                    <Text style={text.small}>Reset course to default settings.</Text>
                </View>
                <Pressable onPress={() => setCurrentId(1)} style={styles.resetButton}>
                    <Text style={text.medium}>Reset</Text>
                </Pressable>
            </View>
        </SettingsMenu>
    );
}

const styles = StyleSheet.create({
    incrementOptionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    incrementIdContainer: {
        backgroundColor: colors.bg,
        borderRadius: 10,
        flexDirection: "row",
    },
    incrementIdText: {
        paddingVertical: 10,
    },
    incrementIdButtonContainer: {
        padding: 10,
        justifyContent: "center",
    },
    increamentIdButtonImage: {
        width: 20,
        height: 20,
    },
    resetOptionContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "10%",
        justifyContent: "space-between",
    },
    resetText: {
        width: "60%",
    },
    resetButton: {
        backgroundColor: colors.hl,
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
    },
})
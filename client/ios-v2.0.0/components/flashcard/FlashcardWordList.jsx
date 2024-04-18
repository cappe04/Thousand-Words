import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, container, text } from "../../constants";

function Item({ word }){

    return (
        <View style={styles.itemContainer}>
            <Text style={text.large}>{word.word}</Text>
            <View style={styles.itemTranslationContainer}>
                <Text style={text.medium}>{word.translation}</Text>
                <Text style={text.extraSmall}>{word.type}</Text>
            </View>
        </View>
    )
}

export default function FlashcardWordList({ batches }){
    const words = batches.reduce((a, b) => {
        a.push(...b.words);
        return a;
    }, []);

    return (
        <SafeAreaView style={container.safeDark}>
            <View style={styles.headerContainer}>
                <Text style={text.extraLarge}>Wordbook</Text>
                <Text style={text.small}>All the words available in both the New Words tab and the Repeat Words tab will be shown here.</Text>
            </View>
            <ScrollView bounces={false}>
                { words.map((word, key) => <Item word={word} key={key}/>) }
                <View style={styles.endOfListContainer}>
                    <Text style={styles.endOfListText}>This is the end of the word list. More words will be shown here as you progress. You can manualy progress in Settings.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: colors.bg,
        marginHorizontal: 10,
        borderRadius: 10,
        marginTop: 10,
        padding: "5%",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    itemTranslationContainer: {
        alignItems: "flex-end",
        width: "50%",
    },
    headerContainer: {
        backgroundColor: colors.bg,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: colors.fg,
    },
    endOfListContainer: {
        paddingHorizontal: "5%",
        marginTop: "10%",
        marginBottom: "5%",
    },
    endOfListText: {
        ...text.small,
        textAlign: "center",
    },
})
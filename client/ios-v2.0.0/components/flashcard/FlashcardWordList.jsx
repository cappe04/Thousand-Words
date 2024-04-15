import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { colors, container, text } from "../../constants";

function Item({ word }){

    return (
        <View style={{
            backgroundColor: colors.bg,
            marginHorizontal: 10,
            borderRadius: 10,
            marginTop: 10,
            padding: "5%",
            justifyContent: "space-between",
            flexDirection: "row",
        }}>
            <Text style={text.large}>{word.word}</Text>
            <View style={{
                alignItems: "flex-end",
            }}>
                <Text style={text.medium}>{word.translation}</Text>
                <Text style={text.extraSmall}>{word.type}</Text>
            </View>
        </View>
    )
}

export default function FlashcardWordList({ batches }){
    let words;
    if(batches.length == 1){

        words = batches[0].words;
    }
    else{

        words = batches.reduce((a, b) => a.push(b.words), []);
    }

    return (
        <SafeAreaView style={container.safeDark}>
            <View style={{
                backgroundColor: colors.bg,
                padding: 10,
                borderBottomWidth: 1,
                borderColor: colors.fg,
                // borderBottomLeftRadius: 10,
                // borderBottomRightRadius: 10,
            }}>
                <Text style={text.extraLarge}>Wordbook</Text>
                <Text style={text.small}>All the words available in both the New Words tab and the Repeat Words tab will able to be seen here. Altough it's still recomended to practice them through the other tabs.</Text>
            </View>
            <ScrollView bounces={false}>
                { words.map((word, key) => <Item word={word} key={key}/>) }
                <View style={{ paddingHorizontal: "5%", marginTop: "10%", marginBottom: "5%"}}>
                    <Text style={[text.small, { textAlign: "center" }]}>This is the end of the world list. More words will be shown here as you progress. You can manualy progress in Settings.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
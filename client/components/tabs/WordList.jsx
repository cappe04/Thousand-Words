import { ScrollView, Text, View } from "react-native"
import WordListItem from "../widgets/WordListItem"
import { COLORS } from "../../constants"

function listTitle(main, second){
    return (
        <View style={{
            borderBottomWidth: 2,
            borderBottomColor: COLORS.gray,
            padding: 10,
            paddingTop: 40
        }}>
            <Text style={{
                fontSize: 25
            }}>
                { main }
            </Text>
            { second && <Text style={{
                fontSize: 15,
                color: COLORS.gray2
            }}>
                { second }
            </Text>}
        </View>
    )
}

export default WordList = ({ words, divided }) => {
    const flatWords = words.reduce((a, b) => {
        a.push(...b.words);
        return a;
    }, []);

    return (
        <ScrollView style={{
            paddingHorizontal: 10,
        }}>
            <View style={{marginBottom: 50}}>
                { !divided && flatWords.map((word, i) => <WordListItem word={word} key={i}/>) }
                { 
                    divided && words.map((wordCluster, i) => 
                        <View key={i}>
                            { i==0 && listTitle("Today's words: ", `Day ${wordCluster.day}`) }
                            { i==1 && listTitle("Word's from yesterday: ", `Day ${wordCluster.day}`) }
                            { i>=2 && listTitle(`Word's from day ${wordCluster.day}:`) }
                            { wordCluster.words.map((word, i) => <WordListItem word={word} key={i}/>) }
                        </View>
                    )
                }
            </View>
        </ScrollView>
    )
}
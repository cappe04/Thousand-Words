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

export default WordList = ({ words_or_batch, is_batch, batch_title }) => {
    return (
        <ScrollView style={{
            paddingHorizontal: 10,
        }}>
            <View style={{marginBottom: 50}}>
                { !is_batch && words_or_batch.map((word, key) => <WordListItem word={word} key={key}/>) }
                { is_batch && words_or_batch.map((batch, i) => 
                        <View key={i}>
                            { i==0 && listTitle("Today's words: ", `${batch_title} ${batch.id}`) }
                            { i==1 && listTitle("Words from before: ", `${batch_title} ${batch.id}`) }
                            { i>=2 && listTitle(`Words from ${batch_title} ${batch.id}:`) }
                            { batch.words.map((word, key) => <WordListItem word={word} key={key}/>) }
                        </View>
                    )
                }
            </View>
        </ScrollView>
    )
}
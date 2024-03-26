import { View, Text } from "react-native"
import FlashcardArea from "../containers/FlashcardArea"


export default LearnWords = ({ words }) => {
    return (
        <View style={{ paddingTop: 100 }}>
            { words.words.length > 0 ? <FlashcardArea words={words.words}/>: <Text>No Words!</Text> }
        </View>
    )
}
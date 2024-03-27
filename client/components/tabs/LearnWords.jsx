import { View, Text } from "react-native"
import FlashcardArea from "../containers/FlashcardArea"


export default LearnWords = ({ words }) => {

    const ErrorMessage = () => {
        return (
            <Text>No Words!</Text>
        )
    }

    if(words === undefined || words.words.length == 0) return (<ErrorMessage />)

    return (
        <View style={{ paddingTop: 100 }}>
            <FlashcardArea words={words.words}/>
        </View>
    )
}
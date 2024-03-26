import { View, Text } from "react-native"
import FlashcardArea from "../containers/FlashcardArea"


export default PracticeWords = ({ words }) => {
    const practiceWords = words.reduce((a, b) => {
        a.push(...b.words);
        return a;
    }, []);

    return (
        <View style={{ paddingTop: 100 }}>
            { practiceWords.length > 0 ? <FlashcardArea words={practiceWords}/>: <Text>Day 1 propably!</Text> }
        </View>
    )
}
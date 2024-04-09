import { View, Text } from "react-native"
import FlashcardArea from "../containers/FlashcardArea"


export default PracticeWords = ({ words }) => {
    const practiceWords = words.reduce((a, b) => {
        a.push(...b.words);
        return a;
    }, []);

    const ErrorMessage = () => {
        return (
            <Text>Day 1 propably!</Text>
        )
    }

    if(practiceWords.length == 0) return (<ErrorMessage />)

    return (
        <View style={{ paddingTop: 100 }}>
            <FlashcardArea words={practiceWords}/>
        </View>
    )
}
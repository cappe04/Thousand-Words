import { View } from "react-native"

import Flashcard from "../widgets/flashcard/Flashcard";
import FlashcardNavButton from "../widgets/flashcard/FlashcardNavButton";
import { useState } from "react";

const FlashcardArea = ({ words }) => {
    const [wordIndex, setWordIndex] = useState(0);

    return (
        <View>
            <View>
                <Flashcard word={words[wordIndex % words.length]}/>
            </View>
            <View style={{
                display: "flex",
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
            }}>
                <FlashcardNavButton text={"Previous"} 
                    callback={ () => { setWordIndex(wordIndex-1) }
                }/>
                <FlashcardNavButton text={"Next"} 
                    callback={ () => { setWordIndex(wordIndex+1) }}
                />
            </View>
        </View>
    )
}

export default FlashcardArea;
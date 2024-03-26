import { View } from "react-native"

import Flashcard from "../widgets/flashcard/Flashcard";
import FlashcardNavButton from "../widgets/flashcard/FlashcardNavButton";
import { useState } from "react";

function shuffleArray(array) {
    const newArray = [...array]; // Create a shallow copy of the original array
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate random index from 0 to i
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements at i and j
    }
    return newArray;
}

const FlashcardArea = ({ words }) => {
    const [wordIndex, setWordIndex] = useState(0);
    const [flipped, setFlipped] = useState(false)

    const onNext = () => {
        if(wordIndex+1 == words.length){
            words.push(...shuffleArray(words));
        }
        setWordIndex(wordIndex+1);
    }

    return (
        <View>
            <View>
                <Flashcard word={words[wordIndex % words.length]} flipped={flipped} setFlipped={setFlipped}/>
            </View>
            <View style={{
                display: "flex",
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
            }}>
                <FlashcardNavButton text={"Previous"} 
                    callback={() => { 
                        setWordIndex(Math.max(wordIndex-1, 0)); 
                        setFlipped(false); 
                }}/>
                <FlashcardNavButton text={"Next"} 
                    callback={() => {
                        onNext();
                        setFlipped(false);
                }}/>
            </View>
        </View>
    )
}

export default FlashcardArea;
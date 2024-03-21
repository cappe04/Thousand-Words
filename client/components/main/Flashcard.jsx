import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { COLORS, SHADOWS } from "../../constants";

const Flashcard = ({ word }) => {
    const [flipped, setFlipped] = useState(false)

    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={ () => {setFlipped(!flipped); }}
            activeOpacity={0.8}
        >
            <View style={styles.textContainer}>
                <Text style={styles.textBig}>{flipped ? word.translation : word.word}</Text>
                <Text style={styles.textSmall}>{flipped ? word.type : ""}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default Flashcard;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.lightWhite,
        alignItems: "center",
        borderRadius: 25,
        marginHorizontal: 50,
        marginVertical: 25,
        ...SHADOWS.small,
    },

    textBig: {
        fontSize: 30
    },
    textSmall: {
        fontSize: 12,
        color: COLORS.gray
    },
    textContainer: {
        paddingVertical: 100,
        justifyContent: "center",
        alignItems: "center",
    }
})
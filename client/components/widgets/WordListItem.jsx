import { StyleSheet, Text, View } from "react-native"
import { COLORS } from "../../constants"


export default WordListItem = ({ word }) => {

    
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.word} adjustsFontSizeToFit={true} numberOfLines={1}>{ word.word }</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.translation} adjustsFontSizeToFit={true} numberOfLines={2}>{ word.translation }</Text>
            </View>
            <View style={[styles.textContainer, {
                flex: 0.5,
            }]}>
                <Text style={styles.type} adjustsFontSizeToFit={true} numberOfLines={2}>{ word.type }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray2,
        padding: 10
    },

    textContainer: {
        flex: 1,
    },

    word: {
        fontWeight: "bold",
        fontSize: 25,
    },

    translation: {
        fontSize: 25,
        alignItems: "center"
    },

    type: {
        color: COLORS.gray2,
        fontStyle: "italic",
        fontSize: 12,
        width: 40,
    }

})


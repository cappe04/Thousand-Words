import { StyleSheet, View } from "react-native";

import { FlashcardNavButton } from "../"

import { COLORS, SHADOWS } from "../../constants";

const FlashcardNav = () => {
    return (
        <View style={styles.container}>
            <FlashcardNavButton text={"Previous"}/>
            <FlashcardNavButton text={"Next"}/>
        </View>
    )
}

export default FlashcardNav;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    }
})
import { Image, StyleSheet, Text, View } from "react-native";

import { icons, text } from "../../constants"

export default function ErrorMessage({ type, message }){
    return (
        <View style={styles.container}>
            <Image source={icons.error} style={styles.image}/>
            <Text style={[text.makeBold(text.small), { paddingBottom: 5 }]}>{ type }</Text>
            <Text style={[text.small, { textAlign: "center" }]}>{ message }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "5%",
    },

    image: {
        width: 70,
        height: 70,
        margin: 20
    },
})
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const ScreenHeaderBtn = ( { text, callback } ) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.5} onPress={callback}>
                <Text style={styles.textContainer}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ScreenHeaderBtn;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.lightWhite,
        alignItems: "center",
    },
    textContainer: {
        color: COLORS.gray,
        fontSize: 15
    },
});

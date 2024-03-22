import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const ScreenHeaderBtn = () => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={1}>
            <Text style={styles.text}>Today's words</Text>
        </TouchableOpacity>
    );
};

export default ScreenHeaderBtn;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.lightWhite,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    text: {
        color: COLORS.gray,
        paddingBottom: 15,
        fontSize: 15
    },
});

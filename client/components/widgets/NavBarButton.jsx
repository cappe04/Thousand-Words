import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { COLORS } from "../../constants";

const NavBarButton = ({ id, text, activated, callback }) => {
    return (
        <TouchableOpacity style={
            [styles.container, { backgroundColor: activated ? COLORS.gray2: COLORS.lightWhite }]
        } onPress={() => { callback(id); }} activeOpacity={1}>
            <Text style={
                [styles.text, { color: activated ? COLORS.lightWhite: COLORS.gray2 }]
            }>{ text }</Text>
        </TouchableOpacity>
    )
};

export default NavBarButton;

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 50,
        borderColor: COLORS.gray2,
        alignItems: "center",
        marginHorizontal: 5,
        paddingHorizontal: 15,
        paddingVertical: 2,
    },
    
    text: {
        fontSize: 17
    },
})
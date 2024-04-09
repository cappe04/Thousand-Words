import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const HeaderIconButton = ({ icon, dimension, callback, color }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={callback}>
            <Image
                source={icon}
                resizeMode='cover'
                style={[styles.button(dimension), {tintColor: color}]}
            />
        </TouchableOpacity>
    );
};

export default HeaderIconButton;

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    button: (dimension) => ({
        width: dimension,
        height: dimension,
    }),
});

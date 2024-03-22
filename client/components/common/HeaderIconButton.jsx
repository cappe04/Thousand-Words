import { Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const ScreenHeaderBtn = ({ icon, dimension, callback }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={callback}>
            <Image
                source={icon}
                resizeMode='cover'
                style={styles.button(dimension)}
            />
        </TouchableOpacity>
    );
};

export default ScreenHeaderBtn;

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.lightWhite,
        justifyContent: "center",
        alignItems: "center",
    },
    button: (dimension) => ({
        width: dimension,
        height: dimension,
    }),
});

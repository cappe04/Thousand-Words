import { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, text, icons, shadows } from "../../constants";

export default function FlashcardNavigator(){

    const rotation = useRef(new Animated.Value(0)).current;

    const [count, setCound] = useState(0);
    const [cardHidden, setCardHidden] = useState(true);
    
    const words = [
        "Galoboj",
        "Pidar",
        "Boogie Gomosexual",
        "Pidaras",
    ];
    const meanings = [
        "Ljusblå",
        "Gay",
        "Boogie är gay",
        "Gay",
    ];

    const left = () => {
        setCound(count - 1 >= 0 ? count - 1: 0);
        setCardHidden(true);
        rotation.setValue(0);
    }

    const right = () => {
        setCound(count + 1);
        setCardHidden(true);
        rotation.setValue(0);
    }
    
    Animated.timing(rotation, { toValue: !cardHidden, useNativeDriver: true, duration: 250 }).start();

    return (
        <View style={styles.mainContainer}>
            <Pressable style={styles.cardContainer} onPress={() => { setCardHidden(!cardHidden) }}>
                <Animated.View style={styles.cardAnimated(true, rotation)}>
                    <Text style={text.extraLarge}>
                        {words[count%words.length]}
                    </Text>
                </Animated.View>
                <Animated.View style={styles.cardAnimated(false, rotation)}>
                    <Text style={[text.extraLarge, { color: colors.hl, fontWeight: "500" }]}>
                        {meanings[count%meanings.length]}
                    </Text>
                </Animated.View>
            </Pressable>

            <View style={styles.navigatorContainer}>
                <Pressable onPress={left} style={styles.navigatorArrow}>
                    <Image source={icons.goto_arrow} style={styles.navigatorArrowIcon("180deg")}/>
                </Pressable>
                <Pressable style={styles.navigatorShow} onPress={() => { setCardHidden(!cardHidden) }}>
                    <Text style={text.large}>
                        Reveal
                    </Text>
                </Pressable>
                <Pressable onPress={right} style={styles.navigatorArrow}>
                    <Image source={icons.goto_arrow} style={styles.navigatorArrowIcon("0deg")}/>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.bg,
        display: "flex",
        justifyContent: "space-between",
    },
    cardContainer: {
        height: "40%",
        marginTop: "10%",
    },
    cardAnimated: (front, rotation) => ({
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        height: "100%",
        backgroundColor: front ? colors.sd: colors.fg,
        borderRadius: "30%",
        marginHorizontal: "5%",
        position: "absolute",
        borderWidth: 1,
        borderColor: front ? colors.sd: colors.hl, 
        ...shadows.small,

        backfaceVisibility: "hidden",

        transform: [
            { 
                rotateX: rotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: front ? ["0deg", "180deg"]: ["180deg", "360deg"],
                }),
            },
        ] 

    }),
    navigatorContainer: {
        height: "25%",
        backgroundColor: colors.sd,
        borderTopLeftRadius: "30%",
        borderTopRightRadius: "30%",
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row",
        ...shadows.smallTop,
    },
    navigatorArrow: {
        paddingHorizontal: 24,
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    navigatorArrowIcon: (rotation) => ({
        width: 20,
        height: 20,
        transform: [{rotateZ: rotation}],
        tintColor: colors.fg
    }),
    navigatorShow: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        height: "40%",
        borderRadius: 10,
        backgroundColor: colors.hl,
    },

})
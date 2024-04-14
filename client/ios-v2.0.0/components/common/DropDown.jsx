import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { icons, colors, text, shadows } from "../../constants";
import { useRef, useState } from "react";

function Item({ message, onPress, id }) {
    return (
        <Pressable style={styles.itemContainer} onPress={() => onPress(id)}>
            <Text style={[text.medium, { color: colors.bg, fontWeight: "300", }]} numberOfLines={1}>
                {message + " " + "...".repeat(100)}
            </Text>
        </Pressable>
    )
}

export default function DropDown({ items, defualt, callback }) {

    const [showMenu, setShowMenu] = useState(false);
    const [buttonMessage, setButtonMessage] = useState(defualt ?? "Select Language");

    const dropAnim = useRef(new Animated.Value(0)).current;

    const interpolateDropAnim = (start, end) => {
        return dropAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [start, end],
        })
    }

    const createItem = (item) => {
        const onPress = (key) => {
            setShowMenu(false);
            setButtonMessage(items.find(item => item.key == key).value);
            callback(key);
        }
        return <Item message={item.value} id={item.key} onPress={onPress} key={item.key}/>
    }

    Animated.timing(dropAnim, { toValue: showMenu, useNativeDriver: true, duration: 150 }).start();

    return (
        <View>
            <Animated.View style={styles.buttonAnimation(showMenu, interpolateDropAnim(10, 0))}>
                <Pressable style={styles.buttonContainer} onPress={() => setShowMenu(!showMenu)}>
                    <View style={styles.buttonOffset}/>{ /* To offset image */ }
                    <Text style={text.large}>
                        { buttonMessage }
                    </Text>
                    <Animated.View style={
                        styles.buttonArrow(showMenu, interpolateDropAnim("360deg", "180deg"))
                    }>
                        <Image 
                            source={icons.dropdown} 
                            tintColor={colors.default_text} 
                            style={{ width: 10, height: 10 }}
                        />
                    </Animated.View>
                </Pressable>
            </Animated.View>
            <Animated.View style={styles.menuAnimation(showMenu, dropAnim)}>
                <View style={styles.menuContainer}>
                    <ScrollView style={styles.menuScrollView} indicatorStyle="black">
                        { items.map(item => createItem(item)) }
                    </ScrollView>
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        justifyContent: "space-between",
        display: "flex",
    },
    buttonAnimation: (menuShown, animation) => ({
        backgroundColor: colors.hl,
        borderRadius: 10,
        zIndex: 2,
        borderBottomLeftRadius: animation,
        borderBottomRightRadius: animation,
        ...(menuShown ? shadows.small: {}),
    }),
    buttonContainer: {
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row",
    },
    buttonOffset: {
        width: 10,
        padding: 10,
    },
    buttonArrow: (menuShown, animation) => ({
        padding: 10,
        transform: [{
            rotateZ: animation
        }]
    }),
    menuAnimation: (menuShown, animation) => ({
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: [{ scaleY: animation }],
        pointerEvents: "box-none",
        zIndex: 1,
    }),
    menuContainer: {
        backgroundColor: colors.fg,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        top: "100%",
        position: "absolute",
        marginRight: 1,
        marginLeft: 2,
    },
    menuScrollView: {
        paddingVertical: 10,
    },
})
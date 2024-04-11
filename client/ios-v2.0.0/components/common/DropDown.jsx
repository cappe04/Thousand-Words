import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { icons, colors, text } from "../../constants";
import { useState } from "react";

function Button({ message, onPress }){

    return (
        <Pressable style={styles.buttonContainer} onPress={onPress}>
            { /* To offset image */ }
            <View style={{ width: 10, padding: 10 }}/>

            { /* Main Text */ }
            <Text style={ text.large }>{ message }</Text>

            { /* Image */ }
            <View style={{ padding: 10 }}>
                <Image 
                    source={icons.dropdown} 
                    tintColor={colors.default_text} 
                    style={{ width: 10, height: 10 }}
                />
            </View>
        </Pressable>
    )
}

function Item({ message, onPress, id }) {
    return (
        <Pressable style={styles.itemContainer} onPress={() => onPress(id)}>
            <Text style={text.mediumBlack}>{message}</Text>
        </Pressable>
    )
}

function Menu({ items, onPress }) {
    return (
        <View style={styles.menuContainer}>
            <ScrollView style={styles.menuScrollView}>
                { items.map(item => <Item 
                    message={item.value}
                    id={item.key}
                    onPress={onPress}
                    key={item.key}
                />) }
            </ScrollView>
        </View>
    )
}

export default function DropDown({ items, defualt, callback }) {

    const [showMenu, setShowMenu] = useState(false);
    const [buttonMessage, setButtonMessage] = useState(defualt ?? "Select Language")

    return (
        <View>
            <Button message={buttonMessage} onPress={() => setShowMenu(!showMenu)}/>
            { showMenu && <Menu items={items} onPress={(id) => {
                setShowMenu(false);
                setButtonMessage(items.find(item => item.key == id).value);
                callback(id);
            }} /> }
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: colors.hl,
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row",
        borderRadius: 10,
    },

    itemContainer: {
        marginHorizontal: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },

    menuContainer: {
        width: "100%",
        height: "500%",
        position: "absolute",
        top: "100%",
    },

    menuScrollView: {
        backgroundColor: colors.fg,
        borderRadius: 10,
        height: "100%",
        paddingVertical: 10,
    },
})
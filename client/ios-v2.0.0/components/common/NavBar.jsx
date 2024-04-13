import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants";
import { useState } from "react";


function NavBarItem({ title, selected, _key, onSelect }) {


    return (
        <Pressable style={styles.itemContainer(selected)} onPress={() => onSelect(_key)}>
            <Text style={styles.itemText(selected)}>{title}</Text>
        </Pressable>
    )
}

export default function NavBar({ items, callback }) {

    const [selectedKey, setSelectedKey] = useState(items[0].key);

    const onSelect = key => {
        setSelectedKey(key);
        callback(key);
    }

    return (
        <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                { items.map(item => <NavBarItem 
                    title={item.value}
                    selected={item.key == selectedKey}
                    _key={item.key}
                    onSelect={onSelect}
                    key={item.key}
                />)}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: (selected) => ({
        borderColor: colors.hl,
        borderWidth: 1,
        borderRadius: "100%",
        paddingHorizontal: 10,
        marginHorizontal: 5,
        backgroundColor: selected ? colors.hl: colors.fg,
    }),
    itemText: (selected) => ({
        color: selected ? colors.fg: colors.hl,
        fontWeight: selected ? "normal": "500",
        fontSize: 24,
    }),
})
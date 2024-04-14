import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants";
import { useState, useRef } from "react";


function NavBarItem({ title, selected, _key, onSelect }) {

    let width = 0;

    const onLayout = (event) => {
        width = event.nativeEvent.layout.width;
    }

    return (
        <Pressable onLayout={onLayout} style={styles.itemContainer(selected)} onPress={() => onSelect(_key, width)}>
            <Text style={styles.itemText(selected)}>{title}</Text>
        </Pressable>
    )
}

export default function NavBar({ items, callback }) {

    const [selectedKey, setSelectedKey] = useState(items[0].key);
    const scrollRef = useRef();
    
    const onSelect = (key, itemWidth) => {
        if(key == selectedKey) return;
        
        // Scroll to clicked item
        scrollRef.current.scrollTo({
            x: itemWidth * items.findIndex(item => item.key == key),
            animated: true,
        })

        setSelectedKey(key);
        callback(key);
    }

    return (
        <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={scrollRef}>
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
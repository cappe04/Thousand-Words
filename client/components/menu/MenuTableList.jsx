import { Text, View, Image, ScrollView, Pressable, StyleSheet } from "react-native";
import { colors, icons, text } from "../../constants";


function Item({ title, id, onPress }){

    return (
        <Pressable style={styles.item} onPress={() => {onPress(id)}}>
            <Text style={text.medium}>{ title }</Text>
            <Image source={icons.goto_arrow} tintColor={colors.fg} style={{ width: 10, height: 10 }} />
        </Pressable>
    )
}

export default function MenuTableList({ items, callback }){

    return (
        <View>
            <View style={{ paddingLeft: 24, marginBottom: 5, }}>
                <Text style={text.makeBold(text.small)}>Available Courses:</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                { items == null ? (
                    <View style={{alignItems: "center", padding: 16,}}>
                        <Text style={text.small}>There are no available courses now,</Text>
                        <Text style={text.small}>please select a language first.</Text>
                    </View>
                ) : (
                <View>
                    { items.map(item => <Item title={item.value} id={item.key} onPress={callback} key={item.key}/>) }
                </View>
                ) }
                
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 10,
        borderColor: colors.fg,
        borderBottomWidth: 1,
    },

    scrollView: {
        borderColor: colors.fg,
        borderTopWidth: 2,
        paddingHorizontal: 10,
        height: "100%",
        backgroundColor: colors.sd,
    },
})
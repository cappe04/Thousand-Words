import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { COLORS } from "../../constants";

function TableItem({ tablename, table, callback, id }){

    return (
        <Pressable onPress={() => {
            callback(tablename);
        }} style={itemStyle.container}>
            <View style={itemStyle.textContainer}>
                <Text style={itemStyle.textBig}>{ table.title + "..." }</Text>
            </View>
        </Pressable>
    )
}

export default TableList = ({ tables, callback }) => {

    return (
        <ScrollView style={listStyle.container}>
            { Object.keys(tables).map((tablename) => 
                <TableItem 
                    tablename={tablename} 
                    table={tables[tablename]} 
                    callback={callback} 
                    key={tablename}
                />
            ) }
        </ScrollView>    
    )
}

const itemStyle = StyleSheet.create({
    container: {
        padding: 20,
    },

    textContainer: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },

    textSmall: {
        fontSize: 10,
        color: COLORS.gray2,
    },

    textBig: {
        fontSize: 17,
    },
})

const listStyle = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
        height: "100%",
    }
})
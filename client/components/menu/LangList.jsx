import { Text, StyleSheet, Pressable, ScrollView } from "react-native"
import { iso_639_1 } from "iso-639"

function LangItem({ lang, callback }){

    return (
        <Pressable onPress={() => {
            callback(lang);
        }} style={itemStyle.container}>
            <Text style={itemStyle.textBig}>{ iso_639_1[lang].nativeName }</Text>
        </Pressable>
    )
}

export default LangList = ({ langs, callback }) => {

    return (
        <ScrollView style={listStyle.container}>
            { Object.keys(langs).map((lang) => 
                <LangItem 
                    lang={lang} 
                    callback={callback} 
                    key={lang}
                />
            ) }
        </ScrollView>
    )
}

const itemStyle = StyleSheet.create({
    container: {
        padding: 20,
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
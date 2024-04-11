import { Pressable, SafeAreaView, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router"
import state from "../src/state";
import { container, text } from "../constants";


export default function Flashcard() {

    const router = useRouter();
    const { table } = useLocalSearchParams();

    return (
        <SafeAreaView style={container.safe}>
            <Text style={text.medium}>{ state.currentLang }</Text>
            <Text style={text.medium}>{ table }</Text>
            <Pressable onPress={router.back}>
                <Text style={text.makeBold(text.medium)}>Back</Text>
            </Pressable>
        </SafeAreaView>
    )
}
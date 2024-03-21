import { Stack, useRouter } from "expo-router";
import { View, Text, SafeAreaView } from "react-native"

import { Flashcard, FlashcardNav } from "../components"

import { COLORS, SHADOWS } from "../constants";

const Home = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen 
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <Text style={{color: COLORS.primary, fontSize: 17, padding: 10}}>Previous Day</Text>
                    ),
                    headerRight: () => (
                        <Text style={{color: COLORS.primary, fontSize: 17, padding: 10}}>Next Day</Text>
                    ),
                    headerTitle: "Day 1",
                }}
            />
    
        <View style={{
            marginVertical: 100
        }}>
            <View>
                <Flashcard word={{
                    word: "война",
                    translation: "war",
                    type: "noun",
                }}/>
            </View>

            <View>
                <FlashcardNav />
            </View>
        </View>

        </SafeAreaView>
    )
}

export default Home;
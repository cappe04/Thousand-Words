import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { container, text, icons, colors } from "../constants";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";


export default function Settings(){

    const router = useRouter();

    const { settings } = useLocalSearchParams();

    return (
        <SafeAreaView style={container.safe}>
            <Stack.Screen options={{
                headerShown: true,
                headerLeft: () => (
                    <Pressable onPress={router.back}>
                        <Image source={icons.arrow_left} tintColor={colors.fg} style={{ width: 30, height: 30 }}/>
                    </Pressable>
                ),
                headerShadowVisible: false,
                headerTitle: "Settings",
                headerTintColor: colors.fg,
                headerStyle: {
                    backgroundColor: colors.bg,
                },
            }} />
            <View>
                <Text style={text.large}>Settings page</Text>
            </View>
        </SafeAreaView>
    );
}
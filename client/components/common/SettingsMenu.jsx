import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors, container, icons, text } from "../../constants";
import { Stack } from "expo-router";


export default function SettingsMenu({ children, onBack, onConfirm }){
    return (
        <SafeAreaView style={container.safeDark}>
            <Stack.Screen options={{
                headerShown: true,
                headerLeft: () => (
                    <Pressable onPress={onBack}>
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
            <View style={styles.childrenContainer}>
                { children }
            </View>


            <View style={styles.buttonContainer}>
                <Pressable onPress={onBack} style={styles.buttonBack}>
                    <Text style={text.large}>Back</Text>
                </Pressable>
                <Pressable onPress={onConfirm} style={styles.buttonConfirm}>
                    <Text style={text.large}>Confirm</Text>
                </Pressable>
            </View>                
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    childrenContainer: {
        margin: "10%",
    },
    buttonContainer: {
        flexDirection: "row",
    },
    buttonBack: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: colors.bg,
        marginLeft: "5%",
        marginRight: "2.5%",
    },
    buttonConfirm: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: colors.hl,
        marginLeft: "2.5%",
        marginRight: "5%",
    },
})
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, text } from "../constants";
import { SettingsMenu } from "../components";
import { useRouter } from "expo-router";
import { useState } from "react";
import { flushStorage } from "../src/data";

export default function Settings(){
    const router = useRouter();

    const [cacheCleared, setCacheCleared] = useState(false);

    async function confrimSettings(){
        if(cacheCleared){
            await flushStorage();
        }
        router.replace("/menu");
    }

    return (
        <SettingsMenu onBack={router.back} onConfirm={confrimSettings}>
            <View style={styles.clearCacheContainer}>
                <View style={styles.clearCacheText}>
                    <Text style={text.medium}>Clear user cache.</Text>
                </View>
                <Pressable onPress={() => setCacheCleared(true)} style={styles.clearCacheButton(!cacheCleared)}>
                    <Text style={[text.medium, cacheCleared ? { color: colors.gray2 }: {}]}>
                        {cacheCleared ? "Cleared": "Clear"}
                    </Text>
                </Pressable>
            </View>
        </SettingsMenu>
    )
}

const styles = StyleSheet.create({
    clearCacheContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "10%",
        justifyContent: "space-between",
    },
    clearCacheText: {
        width: "60%",
    },
    clearCacheButton: (active) => ({
        borderColor: active ? colors.hl: colors.gray2,
        backgroundColor: active ? colors.hl: colors.gray,
        padding: 10,
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 2,
    }),
})
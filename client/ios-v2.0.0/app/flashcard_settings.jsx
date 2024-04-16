import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { container, text, icons, colors } from "../constants";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { getHistory, setHistory, updateHistory } from "../src/data";
import state from "../src/state";

export default function Settings(){

    const router = useRouter();

    const { table } = useLocalSearchParams();
    const metadata = state.metadata.langs[state.currentLang].tables[table];

    const [currentId, setCurrentId] = useState(getHistory(state.currentLang, table));

    function confirmSettings(){
        setHistory(state.currentLang, table, currentId);
        updateHistory();
        router.replace({ pathname: "/flashcard", params: { table: table } });
    }

    return (
        <SafeAreaView style={container.safeDark}>
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
            <View style={{ margin: "10%" }}>
                <View style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <Text style={text.large}>{ `${metadata.formatting.batch_title.title}:` }</Text>
                    <View style={{
                        backgroundColor: colors.bg,
                        borderRadius: 10,
                        flexDirection: "row",
                    }}>
                        <Pressable style={{
                            padding: 10,
                            justifyContent: "center",
                        }} onPress={() => setCurrentId(currentId > 1 ? currentId - 1: 1)}>
                            <Image source={icons.goto_arrow} tintColor={colors.fg} style={{
                                width: 20,
                                height: 20,
                            }}/>
                        </Pressable>
                        <View style={{
                            paddingVertical: 10,
                        }}>
                            <Text style={text.medium}>{ currentId }</Text>
                        </View>
                        <Pressable style={{
                            padding: 10,
                            justifyContent: "center",
                        }} onPress={() => setCurrentId(currentId + 1)}>
                            <Image source={icons.goto_arrow} tintColor={colors.fg} style={{
                                width: 20,
                                height: 20,
                            }}/>
                        </Pressable>
                    </View>
                </View>

                <View>
                    <Text>Reset</Text>
                </View>

            </View>

            <View style={{
                flexDirection: "row",
            }}>
                <Pressable onPress={router.back} style={{
                    backgroundColor: colors.bg,
                    padding: 10,
                    flex: 1,
                    alignItems: "center",
                    borderRadius: 10,
                    marginLeft: "5%",
                    marginRight: "2.5%",
                }}>
                    <Text style={text.large}>Back</Text>
                </Pressable>
                <Pressable onPress={confirmSettings} style={{
                    backgroundColor: colors.hl,
                    padding: 10,
                    flex: 1,
                    marginRight: "5%",
                    marginLeft: "2.5%",
                    alignItems: "center",
                    borderRadius: 10,
                }}>
                    <Text style={text.large}>Confirm</Text>
                </Pressable>
            </View>                
        </SafeAreaView>
    );
}
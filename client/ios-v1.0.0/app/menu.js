import { useRouter, Stack } from "expo-router"
import { Pressable, Text, View, SafeAreaView, ScrollView, StyleSheet } from "react-native";

import state from "../src/state";
import { COLORS } from "../constants";
import { common } from "../components";
import icons from "../constants/icons";
import { menu } from "../components"
import { useEffect, useState } from "react";
import { iso_639_1 } from "iso-639";

export default Menu = () => {
    const router = useRouter();

    const [currentLang, setCurrentLang] = useState(state.userdata.current_lang);

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, flex: 1 }}>
            <Stack.Screen 
                options={{
                    headerTitle: "Menu 2",
                    headerStyle: {
                        backgroundColor: COLORS.lightWhite,
                    },
                    headerRight: () => (
                        <common.HeaderIconButton icon={icons.OPTIONS} dimension={"60%"} callback={() => {
                            setCurrentLang(null)
                        }}/>
                    )
                }}
            />

            { currentLang == null ? (
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 25, padding: 10, }}>
                        {"Select Language"}
                    </Text>
                    <menu.LangList langs={state.metadata} callback={setCurrentLang}/>
                </View>
            ) : (
                <View style={{ alignItems: "center" }}>
                    <Text style={{ fontSize: 25, padding: 10, }}>
                        {`Select Course [${iso_639_1[currentLang].nativeName}]`}
                    </Text>
                    <menu.TableList 
                        tables={state.metadata[currentLang]} 
                        callback={(tablename) => router.push({
                            pathname: "/main",
                            params: {
                                lang: currentLang,
                                table: tablename
                            }
                        })}
                    />
                </View>
            )}
        </SafeAreaView>
    )
}
// Loads data stored locally
import AsyncStorage from '@react-native-async-storage/async-storage';

/*

currentLang: null

history: {
    ru: {
        common: 2
    }
}

*/

// Create all required fields in storage if they don't exists
export async function initStorage(){
    const createIfNull = async (key, value) => {
        if(await AsyncStorage.getItem(key) == null)
            await AsyncStorage.setItem(key, value)
    }

    await createIfNull("history", JSON.stringify({}));
}

export async function flushStorage(){
    const data = await AsyncStorage.getAllKeys();
    await Promise.all(data.map(async key => await AsyncStorage.removeItem(key)));
    await initStorage();
}

export async function getHistory(lang, table){
    const history = JSON.parse(await AsyncStorage.getItem("history"));
    return history[lang]?.[table];
}

export async function updateHistory(lang, table, id){
    const history = JSON.parse(await AsyncStorage.getItem("history"));
    
    if(history[lang] == undefined)
        history[lang] = {}
    
    history[lang][table] = id

    await AsyncStorage.setItem("history", JSON.stringify(history));
}

export async function getCurrentLang(){
    return await AsyncStorage.getItem("currentLang");
}
export async function setCurrentLang(lang){
    return await AsyncStorage.setItem("currentLang", lang);
}
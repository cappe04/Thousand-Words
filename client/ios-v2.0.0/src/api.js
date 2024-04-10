// Fetches data from the api
import { HOST, PORT } from "@env"
import state from "./state";

const proxy = `http://192.168.1.51:5000/api/`; //`http://${HOST}:${PORT}/api/`

class Word {
    constructor(word, translation, type){
        this.word = word;
        this.translation = translation;
        this.type = type;
    }
}

class Batch {
    constructor(id, words, title, use_index){
        this.id = id;
        this.words = words;
        this.title = title;
        this.use_index = use_index
    }
}

async function fetchData(url){
    return await fetch(proxy + url).then(res => {
        try {
            return res.json()
        } catch {
            return res
        }
    });
}

export async function setMetadata(){
    state.metadata = await fetchData("info/metadata")
}

export async function fetchTable(lang, table, intervall=undefined){
    let url = `lang/${lang}?table=${table}`
    if(intervall != undefined)
        url += `&start=${intervall[0]}&end=${intervall[1]}`;

    const data = await fetchData(url);
    return data.map((item) => new Word(item[1], item[2], item[3]));
}

export async function fetchBatches(lang, table, id, formatting){
    const data = []

    const promises = formatting.batch_layout.map(async (i) => {
        const currentId = id-i+1;
        if(currentId <= 0) return;
        const words = await fetchTable(lang, table, 
                                       [(currentId-1)*formatting.batch_size+1, formatting.batch_size*currentId]);
        data.push(new Batch(currentId, words, formatting.batch_title.title, 
                            formatting.batch_title.index));                              
    })
    await Promise.all(promises);
    data.sort((a, b) => b.id - a.id);

    return data;
}
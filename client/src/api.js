import state from "./state"

const proxy = "http://192.168.1.51:5000/api/"

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

    getTitle() {
        return this.title + this.use_index ? " " + this.id: ""
    }
}


async function fetchData(url){
    return await fetch(proxy + url).then(response => response.json());
}

async function loadMetadata(){
    state.metadata = await fetchData("info/metadata")
}

async function fetchWords(lang, table){
    const response = await fetchData(`lang/${lang}?table=${table}`);
    return Object.keys(response).map((i) => {
        const word = response[i];
        return new Word(word[1], word[2], word[3])
    });
}

async function fetchBaches(lang, table, id){
    if(state.metadata == null) await loadMetadata();

    const metadata = state.metadata[lang][table];
    
    const layout = metadata.formatting.batch_layout;
    const size = metadata.formatting.batch_size;
    
    const data = [];

    const promises = layout.map(async (i) => {
        const currentId = id-i+1;
        if(currentId <= 0) return;
        const response = await fetchData(
            `lang/${lang}?table=${table}&start=${(currentId-1)*size+1}&end=${currentId*size}`)
        
        data.push(
            new Batch(currentId, Object.keys(response).map((i) => {
                const word = response[i];
                return new Word(word[1], word[2], word[3]);
            }), metadata.formatting.batch_title.title, metadata.formatting.batch_title.index))
    })
    await Promise.all(promises);

    data.sort((a, b) => b.id - a.id)

    return data;
}

export default {
    loadMetadata,
    fetchWords,
    fetchBaches,
}



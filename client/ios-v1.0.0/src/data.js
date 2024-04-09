import state from "./state"

const proxy = "../data/"

async function fetchFile(path) {
    return await fetch(proxy + path)
}


async function loadUserdata(){

    // TODO: try again
    // const data = await fetchFile("user/userdata.json");

    // console.log(data);

    state.userdata = 
    {
        current_lang: "ru",
    
        history: {
            "ru": {
                "common": {
                    current_id: 10
                }
            }
        }
    };
}

export default {
    loadUserdata,
}
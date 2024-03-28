import state from "./state"

export async function loadUserdata(){
    // maybe load from metadata if not exists, but first load from file
    state.userdata = {
        "ru": {
            "common": {
                currentId: 5
            }
        }
    };
}
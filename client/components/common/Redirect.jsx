import { useRouter } from "expo-router"
import { useEffect } from "react"


export default function Redirect({ href, params, push, replace }){
    const router = useRouter();
    const data = {
        pathname: href,
        params: params
    };

    useEffect(() => {
        if (push) {
            router.push(data);
        } else if (replace) {
           router.replace(data); 
        }
    }, []);   
}
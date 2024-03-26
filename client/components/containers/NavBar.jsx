import { ScrollView, StyleSheet, View } from "react-native";
import NavBarButton from "../widgets/NavBarButton";
import { useState, useRef, useEffect } from "react";
import { COLORS } from "../../constants";

function createButton(id, text, callback, activeIndex){
    return (
        <NavBarButton id={id} text={text} activated={activeIndex==id} callback={callback}/>
    )
}

const NavBar = ({ tabs, callback, disableIndex }) => {

    const [activeIndex, setActiveIndex] = useState(0)
    const scrollRef = useRef();

    const onPress = (id) =>{
        if(id == activeIndex) return;

        if(id==0){
            scrollRef.current.scrollTo({ y: 0, animated: true })

        } else if(id==tabs.length-1){
            scrollRef.current.scrollToEnd({ animated: true })
        }

        setActiveIndex(id);
        callback(id);
    }

    useEffect(() => {
        scrollRef.current.scrollToEnd({ animated: true });
    }, []);

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={scrollRef}>
            <View style={styles.container}>
            {
                tabs.map((tab, i) => <NavBarButton 
                    key={i} id={i} text={tab} activated={activeIndex==i} callback={onPress}
                />)
            }
            </View>
        </ScrollView>
    )
};

export default NavBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 5,
    }
})
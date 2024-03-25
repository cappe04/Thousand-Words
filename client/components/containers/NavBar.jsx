import { ScrollView, StyleSheet, View } from "react-native";
import NavBarButton from "../widgets/NavBarButton";
import { useState } from "react";


const NavBar = ({ callback }) => {

    const [learningMode, setLearningMode] = useState(true)
    const buttonPressed = () =>{

        if(learningMode){
            // Load Practice Mode
            setLearningMode(false);
            callback(false)
        } else {
            // Load Learing Mode
            setLearningMode(true);
            callback(true)
        }
    }

    return (
        <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
            <NavBarButton text={"Learn Words"} activated={learningMode} callback={buttonPressed}/>
            <NavBarButton text={"Practice Words"} activated={!learningMode} callback={buttonPressed}/>
            <NavBarButton text={"Word List"} activated={false} callback={() => {}}/>
        </ScrollView>
    )
};

export default NavBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // justifyContent: "center",
        paddingHorizontal: 5,
    }
})
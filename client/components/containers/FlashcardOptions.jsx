import { Text, View } from "react-native";
import HeaderIconButton from "../widgets/HeaderIconButton";
import { COLORS, SHADOWS } from "../../constants";
import icons from "../../constants/icons";

export default FlashcardOptions = ({ show, currentDay, setCurrentDay }) => {
    if (!show) return

    return (
        <View style={{ position: "absolute", width: "100%", height: "15%", }}>
            <View style={{
                backgroundColor: COLORS.lightWhite,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: COLORS.gray2,
            }}>
                <Text style={{
                    fontSize: 20
                }}>Set day</Text>
                <View style={{
                    flexDirection: "row",
                    backgroundColor: COLORS.lightGray,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 15,
                    marginLeft: 50,
                }}>
                    <View style={{marginHorizontal: 10}}>
                        <HeaderIconButton icon={icons.MINUS} dimension={"60%"} color={COLORS.primary} callback={()=>{setCurrentDay(Math.max(currentDay-1, 1))}}/>
                    </View>
                    
                    <Text style={{
                        fontSize: 20
                    }}>{currentDay}</Text>
                    <View style={{marginHorizontal: 10}}>
                        <HeaderIconButton icon={icons.PLUS} color={COLORS.primary} dimension={"60%"} callback={()=>{setCurrentDay(currentDay+1)}}/>
                    </View>
                </View>

            </View>
        </View>
    )
}
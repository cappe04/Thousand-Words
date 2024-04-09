import { Text, View } from "react-native";
import HeaderIconButton from "../widgets/HeaderIconButton";
import { COLORS, SHADOWS } from "../../constants";
import icons from "../../constants/icons";

export default FlashcardOptions = ({ show, currentId, setCurrentId, batch_title }) => {
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
                }}>{`Set ${batch_title}`}</Text>
                <View style={{
                    flexDirection: "row",
                    backgroundColor: COLORS.lightGray,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 15,
                    marginLeft: 50,
                }}>
                    <View style={{marginHorizontal: 10}}>
                        <HeaderIconButton icon={icons.MINUS} dimension={"60%"} color={COLORS.primary} callback={()=>{setCurrentId(Math.max(currentId-1, 1))}}/>
                    </View>
                    
                    <Text style={{
                        fontSize: 20
                    }}>{currentId}</Text>
                    <View style={{marginHorizontal: 10}}>
                        <HeaderIconButton icon={icons.PLUS} color={COLORS.primary} dimension={"60%"} callback={()=>{setCurrentId(currentId+1)}}/>
                    </View>
                </View>

            </View>
        </View>
    )
}
import { Pressable, Alert } from "react-native";
import Text from "./Text";

const AppBarTab = ({text}) => {
  return (
    <Pressable
      onPress={()=> Alert.alert('App bar tab was pressed')}
    >
      <Text color="textAppBar" fontSize="heading" fontWeight="bold">{text}</Text>
    </Pressable>
  )
};

export default AppBarTab;

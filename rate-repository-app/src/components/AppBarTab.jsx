import { View, StyleSheet } from "react-native";
import { Link } from 'react-router-native';
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  }
})

const AppBarTab = ({ text, route }) => {
  return (
    <View style={styles.container}>
      <Link to={route}>
        <Text color="textAppBar" fontSize="heading" fontWeight="bold">{text}</Text>
      </Link>
    </View>
  );
};

export default AppBarTab;

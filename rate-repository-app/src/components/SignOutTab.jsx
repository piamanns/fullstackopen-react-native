import { View, StyleSheet } from "react-native";
import { Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import useSignOut from "../hooks/useSignOut";

const styles = StyleSheet.create({
  container: {
    padding: 20,
  }
})

const SignOutTab = () => {
  const signOut = useSignOut();

  const handleSignOut = async() => {
    await signOut();
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handleSignOut}
        style={({pressed}) => [
          {
            opacity: pressed ? 0.85 : 1,
            backgroundColor: pressed ? '#000000' : theme.colors.bgAppBar,
          },
          styles.wrapperCustom,
        ]}
      >
        <Text color="textAppBar" fontSize="heading" fontWeight="bold">
          Sign out
        </Text>
      </Pressable>
    </View>
  );
};

export default SignOutTab;

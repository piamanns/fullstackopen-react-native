import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.colors.bgAppBar,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text="Repositories" route="/"/>
      <AppBarTab text="Sign in" route="/signin"/>
    </View>
  );
};

export default AppBar;

import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import SignOutTab from './SignOutTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.bgAppBar,
  }
});

const AppBar = () => {
const { data } = useQuery(GET_CURRENT_USER);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" route="/"/>
        {data && data.me
          ? <SignOutTab/>
          : <AppBarTab text="Sign in" route="/signin"/>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;

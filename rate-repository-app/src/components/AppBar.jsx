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
          ? <>
              <AppBarTab text="Create a review" route="/createreview"/>
              <SignOutTab/>
            </>
          : <>
              <AppBarTab text="Sign in" route="/signin"/>
              <AppBarTab text="Sign up" route="/signup"/>
            </>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;

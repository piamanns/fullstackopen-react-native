import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import SignOutTab from './SignOutTab';
import theme from '../theme';
import useCurrentUser from '../hooks/useCurrentUser';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.bgAppBar,
  }
});

const AppBar = () => {
  const { currentUser } = useCurrentUser();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" route="/"/>
        {currentUser
          ? <>
              <AppBarTab text="Create a review" route="/createreview"/>
              <AppBarTab text="My reviews" route="/reviewlist"/>
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

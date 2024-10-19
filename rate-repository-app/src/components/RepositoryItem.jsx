import { View, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';
import theme from '../theme';
import BasicInfo from './BasicInfo'
import Stats from './Stats';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bgItem,
    padding: 20,
    gap: 20,
  }
});

const openUrl = (url) => {
  try {
    console.log("attempting to open", url)
    Linking.openURL(url)
  } catch (e) {
    console.log(e);
  }
};

const RepositoryItem = ({ item, showLinkBtn=false }) => (
  <View testID="repositoryItem" key={item.id} style={styles.container}>
    <BasicInfo item={item} />
    <Stats
      starsCount={item.stargazersCount}
      forksCount={item.forksCount}
      reviewCount={item.reviewCount}
      ratingAverage= {item.ratingAverage}
    />
    {showLinkBtn &&
      <Button label="Open in GitHub" onBtnPress={() => {openUrl(item.url)}} />
    }
  </View>
);

export default RepositoryItem;

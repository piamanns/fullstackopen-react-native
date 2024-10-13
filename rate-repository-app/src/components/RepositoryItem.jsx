import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import BasicInfo from './BasicInfo'
import Stats from './Stats';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bgItem,
    padding: 20,
    gap: 20,
  },
});

const RepositoryItem = ({item}) => (
  <View testID="repositoryItem" key={item.id} style={styles.container}>
    <BasicInfo item={item} />
    <Stats
      starsCount={item.stargazersCount}
      forksCount={item.forksCount}
      reviewCount={item.reviewCount}
      ratingAverage= {item.ratingAverage}
    />
  </View>
);

export default RepositoryItem;


import { View, FlatList, StyleSheet} from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bgItem,
    padding: 20
  },
  separator: {
    height: 10,
  },
});

const RepositoryView = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_REPOSITORY_BY_ID, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading data...</Text>
      </View>
    );
  }
  if (error) {
    console.log(`Error: ${error}`);
    return (
      <View style={styles.container}>
        <Text>Oops! Something went wrong.</Text>
      </View>
    )
  }

  const reviews = data.repository.reviews
    ? data.repository.reviews.edges.map(edge => edge.node)
    : [];

  const ReviewSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem item={item} title={item.user.username}/>}
      ItemSeparatorComponent={ReviewSeparator}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={data.repository} showLinkBtn={true} />}
      ListHeaderComponentStyle={{ marginBottom: 10 }}
    />
  );
}

export default RepositoryView;

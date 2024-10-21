
import { View, FlatList, StyleSheet} from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';
import { format } from "date-fns";
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.bgItem,
    padding: 20
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.colors.bgItem,
    padding: 20,
    gap: 20
  },
  reviewRating: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reviewText: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
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

  const ReviewItem = ({ review }) => (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewRating}>
        <Text color='primary' fontWeight='bold' fontSize='heading'>{review.rating}</Text>
      </View>
      <View style={styles.reviewText}>
        <Text fontWeight='bold'>{review.user.username}</Text>
        <Text color='textSecondary' style={{ marginBottom: 5}}>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ReviewSeparator}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={data.repository} showLinkBtn={true} />}
      ListHeaderComponentStyle={{ marginBottom: 10 }}
    />
  );
}

export default RepositoryView;

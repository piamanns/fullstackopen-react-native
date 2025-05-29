import { FlatList, View, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';
import Text from './Text';
import theme from '../theme';
import useCurrentUser from '../hooks/useCurrentUser';

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: theme.colors.bgItem,
    padding: 20,
  },
  reviewItemContainer: {
    backgroundColor: theme.colors.bgItem,
    padding: 20,
  },
    separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewContainer = ({ reviews }) => {
  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  if (reviewNodes.length === 0) {
    return (
      <View style={styles.messageContainer}>
        <Text>You have not created any reviews yet.</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => {
        return (
          <ReviewItem item={item} title={item.repository.fullName}/>
        )}
      }
    />
  )
}

const ReviewList = () => {
  const { currentUser, error, loading } = useCurrentUser(true);

  if (loading) {
    return (
      <View style={styles.messageContainer}>
        <Text>Loading data...</Text>
      </View>
    );
  }
  if (error) {
    console.log(`Error: ${error}`);
    return (
      <View style={styles.messageContainer}>
        <Text>Oops! Something went wrong.</Text>
      </View>
    )
  }

  return (
    <>
      {currentUser
        ? <ReviewContainer reviews={currentUser.reviews}/>
        : <View style={styles.messageContainer}>
            <Text color='error'>Sign in to view your own reviews </Text>
          </View>
      }
    </>
  )
}

export default ReviewList;

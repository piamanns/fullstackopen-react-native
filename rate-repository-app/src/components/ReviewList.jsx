import { FlatList, View, StyleSheet, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import ReviewItem from './ReviewItem';
import Text from './Text';
import Button from './Button';
import theme from '../theme';
import useCurrentUser from '../hooks/useCurrentUser';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.bgItem,
    justifyContent: 'space-between',
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  messageContainer: {
    backgroundColor: theme.colors.bgItem,
    padding: 20,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewListContainer = ({ reviews, refetchReviews }) => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

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

  const openRepoView = (repoId) => {
    navigate(`/${repoId}`);
  }

  const handleDelete = async (deleteReviewId) => {
    try {
      await deleteReview({ deleteReviewId });
      refetchReviews();
    } catch (e) {
      console.log(e);
    }
  }

  const openDeleteAlert = (reviewId) => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel delete review'),
      },
      {text: 'Delete', onPress: () => handleDelete(reviewId)},
    ]);
  }

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => {
        return (
          <>
            <ReviewItem item={item} title={item.repository.fullName}/>
            <View style={styles.buttonsContainer}>
              <Button label="View repository" onBtnPress={() => openRepoView(item.repository.id)}/>
              <Button
                label="Delete review"
                type='delete'
                onBtnPress={() => openDeleteAlert(item.id)}
              />
            </View>
          </>
        )}
      }
    />
  )
}

const ReviewList = () => {
  const { currentUser, error, loading, refetch } = useCurrentUser(true);

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
        ? <ReviewListContainer reviews={currentUser.reviews} refetchReviews={refetch}/>
        : <View style={styles.messageContainer}>
            <Text color='error'>Sign in to view your own reviews </Text>
          </View>
      }
    </>
  )
}

export default ReviewList;

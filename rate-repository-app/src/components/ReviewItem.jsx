import { View, StyleSheet } from 'react-native';
import { format } from "date-fns";
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
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
});

const ReviewItem = ({ item, title }) => {
  return(
    <View style={styles.reviewContainer}>
      <View style={styles.reviewRating}>
        <Text color='primary' fontWeight='bold' fontSize='heading'>{item.rating}</Text>
      </View>
      <View style={styles.reviewText}>
        <Text fontWeight='bold'>
          {title}
        </Text>
        <Text color='textSecondary' style={{ marginBottom: 5}}>{format(new Date(item.createdAt), "dd.MM.yyyy")}</Text>
        <Text>{item.text}</Text>
      </View>
    </View>
  )
};

export default ReviewItem;

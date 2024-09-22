import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
  }
});

const StatItem = ({ value, description }) => {
  const convertToThousands = (value) => {
    return (value/1000).toFixed(1);
  };

  return (
    <View style={styles.statItem}>
      <Text fontWeight='bold'>
        {value >= 1000 ? `${convertToThousands(value)}k` : value}
      </Text>
      <Text color='textSecondary'>{description}</Text>
    </View>
  );
};

const Stats = ({ starsCount, forksCount, reviewCount, ratingAverage }) => {
  return (
    <View style={styles.container}>
      <StatItem value={starsCount} description='Stars' />
      <StatItem value={forksCount} description='Forks' />
      <StatItem value={reviewCount} description='Reviews' />
      <StatItem value={ratingAverage} description='Rating' />
    </View>
  );
};

export default Stats;

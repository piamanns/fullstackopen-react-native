import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  avatarImg: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  description: {
    flexShrink: 1,
    gap: 6,
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginTop: 4,
    padding: 6,
    alignSelf: 'flex-start',
  }
});

const BasicInfo = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatarImg}
        source={{
          uri: item.ownerAvatarUrl
        }}
      />
      <View style={styles.description}>
        <Text fontSize='subheading' fontWeight='bold'>
          {item.fullName}
        </Text>
        <Text color='textSecondary'>{item.description}</Text>
        <View style={styles.language}>
          <Text color='textButton'>{item.language}</Text>
        </View>
      </View>
    </View>
  );
};

export default BasicInfo;

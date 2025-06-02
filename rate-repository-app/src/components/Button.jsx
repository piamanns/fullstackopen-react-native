import { View, Pressable, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexGrow: 1,
  },
  buttonMain: {
    borderRadius: 4,
    padding: 12,
  },
  buttonText: {
    textAlign: 'center'
  }
});

const Button = ({ label, onBtnPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onBtnPress}
        style={({pressed}) => [
          styles.buttonMain,
          {
            backgroundColor: pressed
              ? theme.colors.secondary
              : theme.colors.primary
          },
        ]}
      >
        <Text color='textButton' fontWeight='bold' style={styles.buttonText}>
          {label}
        </Text>
      </Pressable>
    </View>
  )
};

export default Button;

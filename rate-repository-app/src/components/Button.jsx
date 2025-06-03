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

const Button = ({ label, onBtnPress, type='basic' }) => {
  const bgColor = type === 'delete' ?  theme.colors.delete : theme.colors.primary;
  const bgColorPressed = type === 'delete' ? theme.colors.deleteSecondary : theme.colors.secondary;

  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={onBtnPress}
        style={({pressed}) => [
          styles.buttonMain,
          {
            backgroundColor: pressed
              ? bgColorPressed
              : bgColor
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

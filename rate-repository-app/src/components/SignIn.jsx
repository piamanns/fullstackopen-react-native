import { useFormik } from 'formik';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    padding: 20,
    gap: 20,
    backgroundColor: theme.colors.bgItem,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  button: {
    borderRadius: 4,
    padding: 12,
  },
  buttonText: {
    textAlign: 'center'
  }
})

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values)
    }
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={styles.textInput}
      />
      <TextInput
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry={true}
        style={styles.textInput}
      />
      <View>
        <Pressable
          onPress={formik.handleSubmit}
          style={({pressed}) => [
            styles.button,
            {
              backgroundColor: pressed
                ? theme.colors.secondary
                : theme.colors.primary
            },
          ]}
        >
          <Text color='textButton' fontWeight='bold' style={styles.buttonText}>
            Sign in
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default SignIn;

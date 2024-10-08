import { useFormik } from 'formik';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';


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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;
      try {
        const authResult = await signIn({ username, password });
        console.log(`User ${username} is authenticated`)
        console.log(`Access token: ${authResult.data.authenticate.accessToken}`)
        navigate('/')
      } catch (e) {
        console.log(e);
      }
    }
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[
          styles.textInput,
          {borderColor: formik.touched.username && formik.errors.username
            ? theme.colors.error
            : theme.colors.border
          }
        ]}
      />
      {formik.touched.username && formik.errors.username && (
         <Text color='error'>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry={true}
        style={[
          styles.textInput,
          {borderColor: formik.touched.password && formik.errors.password
            ? theme.colors.error
            : theme.colors.border
          }
        ]}
      />
      {formik.touched.password && formik.errors.password && (
         <Text color='error'>{formik.errors.password}</Text>
      )}
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

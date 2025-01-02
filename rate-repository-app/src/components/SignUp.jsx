import { View, TextInput, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import useSignUp from '../hooks/useSignUp'
import useSignIn from '../hooks/useSignIn'
import Text from './Text';
import Button from './Button';
import theme from '../theme';
import * as yup from 'yup';


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
    .min(5, 'Username length must be at least 5 characters')
    .max(30, 'Username max length is 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password length must be at least 5 characters')
    .max(50, 'Password max length is 50 characters')
    .required('Password is required'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required'),
});

const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirm: '',
    },
    validationSchema,
    onSubmit
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
      <TextInput
        placeholder='Confirm password'
        value={formik.values.confirm}
        onChangeText={formik.handleChange('confirm')}
        secureTextEntry={true}
        style={[
          styles.textInput,
          {borderColor: formik.touched.confirm && formik.errors.confirm
            ? theme.colors.error
            : theme.colors.border
          }
        ]}
      />
      {formik.touched.confirm && formik.errors.confirm && (
         <Text color='error'>{formik.errors.confirm}</Text>
      )}
      <Button label='Sign up' onBtnPress={formik.handleSubmit}></Button>
    </View>
  );
}

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const newUser = await signUp({
        username,
        password
      });
      if (newUser) {
        console.log("created user", newUser)
        await signIn({ username, password });
        console.log("signed in user", username)
        navigate('/')
      }
    } catch (e) {
      console.log(e);
    }
  }

  return <SignUpContainer onSubmit={onSubmit}/>
}

export default SignUp;

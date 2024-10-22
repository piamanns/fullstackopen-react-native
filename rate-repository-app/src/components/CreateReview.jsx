import { useFormik } from 'formik';
import { View, TextInput, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import theme from '../theme';
import Button from './Button';
import * as yup from 'yup';
import Text from './Text';
import useAddReview from '../hooks/useAddReview';


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
  ownername: yup
    .string('Owner name should be a string')
    .required('Repository owner name is required'),
  reponame: yup
    .string('Repository name should be a string')
    .required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be an number in the range 0-100')
    .integer('Rating must be an integer')
    .min(0, 'The minimum value for a rating is 0')
    .max(100, 'The maximum value for a rating is 100')
    .required('Rating is required'),
  description: yup
    .string()
});


const CreateReviewContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      ownername: '',
      reponame: '',
      rating: '',
      review: ''
    },
    validationSchema,
    onSubmit
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Repository owner name'
        style={styles.textInput}
        value={formik.values.ownername}
        onChangeText={formik.handleChange('ownername')}
        onSubmit
      />
      {formik.touched.ownername && formik.errors.ownername && (
         <Text color='error'>{formik.errors.ownername}</Text>
      )}
      <TextInput
        placeholder='Repository name'
        style={styles.textInput}
        value={formik.values.reponame}
        onChangeText={formik.handleChange('reponame')}
      />
      {formik.touched.reponame && formik.errors.reponame && (
         <Text color='error'>{formik.errors.reponame}</Text>
      )}
      <TextInput
        placeholder='Rating between 0 and 100'
        style={styles.textInput}
        value={formik.values.rating}
        onChangeText={(value) => formik.setFieldValue('rating', parseFloat(value))}
      />
      {formik.touched.rating && formik.errors.rating && (
         <Text color='error'>{formik.errors.rating}</Text>
      )}
      <TextInput
        placeholder='Review'
        style={styles.textInput}
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
        multiline={true}
        numberOfLines={5}
        textAlignVertical='top'
      />
       {formik.touched.review && formik.errors.review && (
         <Text color='error'>{formik.errors.review}</Text>
      )}
      <Button label='Create a review' onBtnPress={formik.handleSubmit}></Button>
    </View>
  )
};

const CreateReview = () => {
  const [addReview] = useAddReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownername, reponame, rating, review } = values;
    try {
      const reviewedRepo = await addReview({
        ownername,
        reponame,
        rating,
        review
      });
      if (reviewedRepo) {
        navigate(`/${reviewedRepo}`)
      }
    } catch (e) {
      console.log(e);
    }
  }

  return <CreateReviewContainer onSubmit={onSubmit}/>
};

export default CreateReview;

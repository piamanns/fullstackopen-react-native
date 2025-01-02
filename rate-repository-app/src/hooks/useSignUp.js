import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
    const [createUser, result] = useMutation(CREATE_USER);

    const signUp = async ({ username, password }) => {
      const signUpResult = await createUser({
        variables: { username, password }
      });
      if (signUpResult.data?.createUser) {
        const newUser = signUpResult.data?.createUser.username;
        return newUser;
      }
      return null;
    }
    return [signUp, result];
}

export default useSignUp;

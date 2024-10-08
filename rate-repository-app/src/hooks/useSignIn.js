import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [authenticate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const authResult = await authenticate({
      variables: { username, password }
    })
    if (authResult.data?.authenticate) {
      await authStorage.setAccessToken(
        authResult.data.authenticate.accessToken
      );
      apolloClient.resetStore();
    }
    return authResult;
  };

  return [signIn, result];
};

export default useSignIn;

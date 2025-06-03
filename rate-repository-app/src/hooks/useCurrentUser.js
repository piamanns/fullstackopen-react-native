import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useCurrentUser = (includeReviews=false) => {
  const { data, error, loading, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  return { currentUser: data ? data.me : null, error, loading, refetch };
};

export default useCurrentUser;

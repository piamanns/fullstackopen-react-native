import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';

const useSingleRepository = ({ id, first=2 }) => {
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY_BY_ID, {
      variables: { id, first },
      fetchPolicy: 'cache-and-network',
    });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor
      }
    });
  };

  return {
    data,
    error,
    loading,
    fetchMore: handleFetchMore,
  };
};

export default useSingleRepository;

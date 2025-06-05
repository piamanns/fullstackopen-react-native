import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const parseOrder = (order) => {
  let orderBy;
  let orderDirection;

  switch(order) {
    case "highest":
      orderBy = "RATING_AVERAGE"
      orderDirection = "DESC"
      break;
    case "lowest":
      orderBy = "RATING_AVERAGE"
      orderDirection = "ASC"
      break;
    default:
      orderBy = "CREATED_AT"
      orderDirection = "DESC"
  }
  return { orderBy, orderDirection };
}

const useRepositories = ({ first, order, searchKeyword }) => {
    // console.log("Find repositories matching keyword", searchKeyword);
    const { orderBy, orderDirection } = parseOrder(order);
    const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
      variables: {
        first,
        orderBy,
        orderDirection,
        searchKeyword
      }
    });

    const handleFetchMore = () => {
      const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

      if (!canFetchMore) {
        return;
      }

      fetchMore({
        variables: {
          after: data.repositories.pageInfo.endCursor,
          orderBy,
          orderDirection,
          searchKeyword,
        }
      });
    };

    return {
      repositories: data ? data.repositories : null,
      fetchMore: handleFetchMore,
      loading,
      ...result
    };
};

export default useRepositories;

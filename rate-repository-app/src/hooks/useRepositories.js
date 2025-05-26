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

const useRepositories = ({ order, searchKeyword }) => {
    // console.log("Find repositories matching keyword", searchKeyword);
    const { orderBy, orderDirection } = parseOrder(order);
    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
      variables: { orderBy, orderDirection, searchKeyword}
    });
    return { repositories: data ? data.repositories : null, error, loading };
};

export default useRepositories;

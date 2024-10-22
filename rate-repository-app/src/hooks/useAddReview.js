import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useAddReview = () => {
  const [createReview, result] = useMutation(CREATE_REVIEW);

  const addReview = async ({ ownername, reponame, rating, review }) => {
    const addResult = await createReview({
      variables: { ownername, reponame, rating, review }
    });
    if (addResult.data?.createReview) {
      const reviewedRepo = addResult.data?.createReview.repositoryId;
      return reviewedRepo;
    }
    return null;
  }

  return [addReview, result];
};

export default useAddReview;

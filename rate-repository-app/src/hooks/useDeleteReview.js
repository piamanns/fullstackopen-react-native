import { useMutation } from '@apollo/client';
import { DELETE_REVIEW_BY_ID } from '../graphql/mutations';


const useDeleteReview = () => {
  const [deleteReviewById, result] = useMutation(DELETE_REVIEW_BY_ID);

  const deleteReview = async ({ deleteReviewId }) => {
    await deleteReviewById({
      variables: { deleteReviewId }
    });
  }

  return [deleteReview, result]
}

export default useDeleteReview;

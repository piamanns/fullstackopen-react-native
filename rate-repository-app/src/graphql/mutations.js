import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
  mutation AuthenticateUser($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation CreateReview($ownername: String!, $reponame: String!, $rating: Int!, $review: String) {
    createReview(review: {
        ownerName: $ownername,
        rating: $rating,
        repositoryName: $reponame,
        text: $review
      }) {
      repositoryId
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(user: {
      username: $username,
      password: $password
    }) {
      id
      username
    }
  }
`
export const DELETE_REVIEW_BY_ID = gql`
  mutation DeleteReview($deleteReviewId: ID!){
    deleteReview(id: $deleteReviewId)
  }
`

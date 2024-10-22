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

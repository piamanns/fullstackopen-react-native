import { RepositoryListContainer } from '../../components/RepositoryList';
import { render, screen, within } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);
      screen.debug();

      const repositoryItems = screen.getAllByTestId('repositoryItem');

      const countInThousands = (value) => {
        if (value > 1000) {
          return `${(value/1000).toFixed(1)}k`;
        } else {
          return value.toString();
        }
      };

      repositoryItems.forEach((repoItem, index) => {
        // renders repository's name
        const expectedName = repositories.edges[index].node.fullName;
        expect(within(repoItem).getByText(expectedName)).toBeDefined();
        // renders description
        const expectedDescription = repositories.edges[index].node.description;
        expect(within(repoItem).getByText(expectedDescription)).toBeDefined();
        // renders language
        const expectedLanguage = repositories.edges[index].node.language
        expect(within(repoItem).getByText(expectedLanguage)).toBeDefined();
        // renders forks count
        const expectedForkCountStr = countInThousands(repositories.edges[index].node.forksCount);
        expect(within(repoItem).getByText(expectedForkCountStr)).toBeDefined();
        // renders star count
        const expectedStarCountStr = countInThousands(repositories.edges[index].node.stargazersCount);
        expect(within(repoItem).getByText(expectedStarCountStr)).toBeDefined();
        // renders rating average
        const expectedRatingAvgStr = repositories.edges[index].node.ratingAverage.toString()
        expect(within(repoItem).getByText(expectedRatingAvgStr)).toBeDefined();
        // renders review count
        const expectedReviewCountStr = countInThousands(repositories.edges[index].node.reviewCount)
        expect(within(repoItem).getByText(expectedReviewCountStr)).toBeDefined();
      })
    });
  });
});

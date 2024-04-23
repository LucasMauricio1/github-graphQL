// api.ts
import { RepositoryDetails } from './apiTypes'

export async function load(
  searchValue: string,
  afterCursor: string | null = null,
): Promise<{
  repositoriesData: RepositoryDetails[]
  endCursor: string | null
}> {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
  const query = `
    query SearchRepositories($searchValue: String!, $afterCursor: String) {
      search(query: $searchValue, type: REPOSITORY, first: 50, after: $afterCursor) {
        nodes {
          ... on Repository {
            name
            description
            owner {
              login
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { searchValue, afterCursor } }),
    })

    const data = await response.json()
    const repositoriesData = data.data.search.nodes
    const endCursor = data.data.search.pageInfo.endCursor

    return { repositoriesData, endCursor }
  } catch (error) {
    console.error('Erro ao carregar dados do GitHub:', error)
    throw error
  }
}

export async function loadRepositoryDetails(
  owner: string | null,
  repoName: string | null,
): Promise<RepositoryDetails> {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
  const query = `
    query {
      repository(owner: "${owner}", name: "${repoName}") {
        name
        description
        owner {
          login
        }
        stargazerCount
        createdAt
        issues {
          totalCount
        }
        pullRequests {
          totalCount
        }
        defaultBranchRef {
          target {
            ... on Commit {
              history {
                totalCount
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    const data = await response.json()
    return data.data.repository as RepositoryDetails
  } catch (error) {
    throw new Error('Erro ao carregar detalhes do repositório')
  }
}

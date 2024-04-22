export async function load(searchValue: string) {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
  const query = `
    query SearchRepositories($searchValue: String!) {
      search(query: $searchValue, type: REPOSITORY, first: 10) {
        nodes {
          ... on Repository {
            name
            description
            owner {
              login
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
      body: JSON.stringify({ query, variables: { searchValue } }),
    })

    const data = await response.json()
    return data.data.search.nodes
  } catch (error) {
    console.error('Erro ao carregar dados do GitHub:', error)
    throw error
  }
}

export interface RepositoryDetails {
  name: string
  description: string | null
  owner: {
    login: string
  }
  stargazerCount: number
  createdAt: string
  issues: {
    totalCount: number
  }
  pullRequests: {
    totalCount: number
  }
  defaultBranchRef: {
    target: {
      history: {
        totalCount: number
      }
    }
  }
}

export interface SearchResult {
  name: string
  login: string
  description: string | null
}

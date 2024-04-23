/* eslint-disable react-hooks/rules-of-hooks */
import { RepositoryDetails } from './apiTypes'
import { load } from './api'
import { setAfterCursor } from '../redux/cursorSlice'
import { setSearchValue } from '../redux/searchSlice'
import { Dispatch } from 'redux'

interface SearchResult {
  name: string
  login: string
  description: string | null
}

export const handleSearch = async (searchValue: string, dispatch: Dispatch) => {
  dispatch(setSearchValue(searchValue))
  try {
    if (searchValue) {
      const { repositoriesData, endCursor } = await load(searchValue)
      const mappedData: SearchResult[] = repositoriesData.map(
        (repo: RepositoryDetails) => ({
          name: repo.name,
          description: repo.description,
          login: repo.owner.login,
        }),
      )
      dispatch(setAfterCursor(endCursor))
      return mappedData
    }
  } catch (error) {
    console.error('Erro ao carregar repositórios:', error)
  }
}

export const handleLoadMore = async (
  searchValue: string,
  afterCursor: string,
  dispatch: Dispatch,
) => {
  try {
    if (searchValue) {
      const { repositoriesData, endCursor } = await load(
        searchValue,
        afterCursor,
      )
      const mappedData = repositoriesData.map((repo: RepositoryDetails) => ({
        name: repo.name,
        description: repo.description,
        login: repo.owner.login,
      }))
      dispatch(setAfterCursor(endCursor))
      return mappedData
    }
    return []
  } catch (error) {
    console.error('Erro ao carregar mais repositórios:', error)
    return []
  }
}

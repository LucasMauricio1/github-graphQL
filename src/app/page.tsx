'use client'

import { useState } from 'react'
import {
  InputSearch,
  Header,
  RepositoryCard,
  Modal,
  Cursor,
} from './components'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { closeModal, openModal } from './redux/modalSlice'
import { handleLoadMore, handleSearch } from './services/apiFunctions'

interface SearchResult {
  name: string
  login: string
  description: string | null
}

export default function Home() {
  const [repositories, setRepositories] = useState<SearchResult[]>([])

  const dispatch = useDispatch()
  const { isOpen } = useSelector((state: RootState) => state.modal)
  const { afterCursor } = useSelector((state: RootState) => state.cursor)
  const { searchValue } = useSelector((state: RootState) => state.search)

  const handleSearchValue = async (value: string) => {
    try {
      const result = await handleSearch(value, dispatch)
      if (result) {
        setRepositories(result)
      }
    } catch (error) {
      console.error('Erro ao lidar com a busca:', error)
    }
  }

  const handleLoadMoreClick = async () => {
    try {
      if (searchValue && afterCursor) {
        const result = await handleLoadMore(searchValue, afterCursor, dispatch)
        setRepositories((prev) => [...prev, ...result])
      }
    } catch (error) {
      console.error('Erro ao lidar com a carga adicional:', error)
    }
  }

  const handleCardClick = (repo: SearchResult) => {
    dispatch(openModal({ owner: repo.login, repoName: repo.name }))
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <Header
        title="Repositórios no GitHub"
        subtitle="Procure por repositórios de qualquer desenvolvedor do mundo no GitHub"
      />
      <div className="mt-2 flex w-full items-center justify-center p-4">
        <div className="flex w-1/2 flex-col border border-white p-4">
          <InputSearch
            type="text"
            placeholder="Pesquisar"
            className="w-full p-2"
            onSearch={(searchValue) => handleSearchValue(searchValue)}
          />
        </div>
      </div>
      {repositories && (
        <div className="users-list">
          {repositories.map((repo, index) => (
            <RepositoryCard
              repository={repo}
              key={index}
              onClick={() => handleCardClick(repo)}
            />
          ))}
        </div>
      )}
      {repositories.length > 0 && <Cursor onClick={handleLoadMoreClick} />}
      <Modal isOpen={isOpen} onClose={() => dispatch(closeModal())} />
    </main>
  )
}

'use client'

import { useState } from 'react'
import { Header } from './components/Header'
import Input from './components/Input'
import { load } from './services/api'
import { RepositoryCard } from './components/RepositoryCard'
import { Modal } from './components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { closeModal, openModal } from './redux/modalSlice'

interface SearchResult {
  name: string
  login: string
  description: string | null
}

export default function Home() {
  const [repositories, setRepositories] = useState<SearchResult[]>([])

  const dispatch = useDispatch()
  const { isOpen } = useSelector((state: RootState) => state.modal)

  const handleSearch = async (searchValue: string) => {
    try {
      const data = await load(searchValue)

      const mappedData = data.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        login: repo.owner.login,
      }))

      setRepositories(mappedData)
    } catch (error) {
      console.error('Erro ao carregar repositórios:', error)
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
          <Input
            type="text"
            placeholder="Pesquisar"
            className="w-full p-2"
            onSearch={handleSearch}
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
      <Modal isOpen={isOpen} onClose={() => dispatch(closeModal())} />
    </main>
  )
}

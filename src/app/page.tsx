'use client'

import { useState } from 'react'
import { Header } from './components/Header'
import Input from './components/Input'
import { load } from './services/api'
import { RepositoryCard } from './components/RepositoryCard'

interface searchResult {
  name: string
  login: string
  description: string | null
}

export default function Home() {
  const [repositories, setRepositories] = useState<searchResult[]>([])

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
            <RepositoryCard repository={repo} key={index} />
          ))}
        </div>
      )}
    </main>
  )
}

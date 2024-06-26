'use client'

import React, { useEffect, useState } from 'react'
import { loadRepositoryDetails } from '../../services/api'
import { RepositoryDetails } from '@/app/services/apiTypes'
import Image from 'next/image'
import { formatDateToBr } from '@/app/utils/formatDate'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'
import { Icon } from '../Icon'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export function Modal({ isOpen, onClose }: ModalProps) {
  const { owner, repoName } = useSelector((state: RootState) => state.modal)

  const [repositoryDetails, setRepositoryDetails] =
    useState<RepositoryDetails | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchRepositoryDetails = async () => {
      setIsLoading(true)
      try {
        const details = await loadRepositoryDetails(owner, repoName)
        setRepositoryDetails(details)
      } catch (error) {
        console.error('Erro ao carregar detalhes do repositório:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (isOpen) {
      fetchRepositoryDetails()
    }
  }, [isOpen, owner, repoName])

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          {isLoading ? (
            <p className="text-white">Carregando detalhes do repositório...</p>
          ) : (
            repositoryDetails && (
              <div className="flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
                <div className="modal-content max-w-[80%] rounded-lg bg-white p-6 shadow-md">
                  <div className="flex w-full justify-end">
                    <button
                      onClick={onClose}
                      className="text-gray-500 hover:opacity-80 focus:outline-none"
                    >
                      <Icon name="X" color="gray" size={25} />
                    </button>
                  </div>
                  <div className="mb-4 flex flex-col items-center justify-center">
                    <Image
                      src={`https://avatars.githubusercontent.com/${owner}`}
                      alt={`${owner}-avatar`}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <h1 className="ml-2 text-xl font-semibold text-cyan-900">
                      {repositoryDetails.owner.login}
                    </h1>
                    <h2 className="ml-2 text-lg font-semibold">
                      {repositoryDetails.name}
                    </h2>
                  </div>
                  <p className="mb-4 text-gray-600">
                    {repositoryDetails.description ||
                      'Sem descrição disponível'}
                  </p>
                  <table className="w-full">
                    <tbody>
                      <tr className="bg-gray-100 hover:bg-gray-200">
                        <td className="px-4 py-2 font-semibold">
                          Quantidade de commits
                        </td>
                        <td className="px-4 py-2">
                          {
                            repositoryDetails.defaultBranchRef.target.history
                              .totalCount
                          }
                        </td>
                      </tr>
                      <tr className="bg-gray-100 hover:bg-gray-200">
                        <td className="px-4 py-2 font-semibold">Issues</td>
                        <td className="px-4 py-2">
                          {repositoryDetails.issues.totalCount}
                        </td>
                      </tr>
                      <tr className="bg-gray-100 hover:bg-gray-200">
                        <td className="px-4 py-2 font-semibold">
                          Pull-Requests
                        </td>
                        <td className="px-4 py-2">
                          {repositoryDetails.pullRequests.totalCount}
                        </td>
                      </tr>
                      <tr className="bg-gray-100 hover:bg-gray-200">
                        <td className="px-4 py-2 font-semibold">
                          Estrelas ganhas
                        </td>
                        <td className="px-4 py-2">
                          {repositoryDetails.stargazerCount}
                        </td>
                      </tr>
                      <tr className="bg-gray-100 hover:bg-gray-200">
                        <td className="px-4 py-2 font-semibold">Criado em</td>
                        <td className="px-4 py-2">
                          {formatDateToBr(repositoryDetails.createdAt)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  )
}

'use client'

import React, { useEffect, useState } from 'react'
import { loadRepositoryDetails } from '../../services/api'
import { RepositoryDetails } from '@/app/services/apiTypes'
import Image from 'next/image'
import { formatDateToBr } from '@/app/utils/formatDate'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'

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
                  <button
                    onClick={onClose}
                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="mb-4 flex items-center justify-center">
                    <Image
                      src={`https://avatars.githubusercontent.com/${owner}`}
                      alt={`${owner}-avatar`}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <h2 className="ml-2 text-xl font-semibold">
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

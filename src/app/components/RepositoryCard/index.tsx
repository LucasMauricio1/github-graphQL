import Image from 'next/image'

interface RepositoryProps {
  repository: {
    name: string
    description?: string | null
    login: string
  }
  onClick: () => void
}

export function RepositoryCard({
  repository: { name, description, login },
  onClick,
}: RepositoryProps) {
  return (
    <button
      className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md transition hover:opacity-80 active:opacity-60"
      onClick={onClick}
    >
      <div className="overflow-hidden">
        <Image
          src={`https://avatars.githubusercontent.com/${login}`}
          alt={`${login} avatar`}
          width={48}
          height={48}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-bold md:text-base">{name}</p>
        <p className="text-lg font-bold text-cyan-900 md:text-base">{login}</p>
        {description && <p className="text-sm md:text-xs">{description}</p>}
      </div>
    </button>
  )
}

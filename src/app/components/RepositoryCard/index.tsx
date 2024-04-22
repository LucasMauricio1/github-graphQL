import Image from 'next/image'

interface RepositoryProps {
  repository: {
    name: string
    description?: string | null
    login: string
  }
}

export function RepositoryCard({
  repository: { name, description, login },
}: RepositoryProps) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
      <div className="overflow-hidden">
        <Image
          src={`https://avatars.githubusercontent.com/${login}`}
          alt={`${login} avatar`}
          width={48}
          height={48}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg font-bold md:text-base">{name}</p>
        {description && <p className="text-sm md:text-xs">{description}</p>}
      </div>
    </div>
  )
}

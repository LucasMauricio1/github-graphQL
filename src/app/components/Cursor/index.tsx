import { Icon } from '../index'

interface CursorProps {
  onClick: () => void
}

export function Cursor({ onClick }: CursorProps) {
  return (
    <button
      onClick={onClick}
      className="mb-4 mt-4 flex items-center justify-center gap-2 rounded-md bg-white p-4 hover:opacity-80"
    >
      <h1 className="flex items-center justify-center font-bold text-cyan-900">
        Carregar mais...
      </h1>
      <Icon name="ChevronDown" color="#008080" size={20} />
    </button>
  )
}

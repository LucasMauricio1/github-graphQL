interface HeaderProps {
  title: string
  subtitle: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="text-center text-gray-400">{subtitle}</p>
    </div>
  )
}

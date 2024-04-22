import { Header } from './components/Header'
import Input from './components/Input'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Header
        title="Repositórios no GitHub"
        subtitle="Procure por repositórios de qualquer desenvolvedor do mundo no GitHub"
      />
      <div className="mt-4 flex w-full items-center justify-center p-4">
        <div className="flex w-1/2 flex-col border border-white p-4 md:flex-row">
          <Input
            type="text"
            placeholder="Pesquisar"
            className="mb-2 w-full px-3 py-2 md:mb-0 md:mr-2 md:w-2/3"
          />
          <select name="País" id="" className="w-full px-3 py-2 md:w-1/3">
            <option value="brasil">Brasil</option>
            <option value="argentina">Argentina</option>
          </select>
        </div>
      </div>
    </main>
  )
}

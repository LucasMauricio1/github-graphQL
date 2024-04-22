export async function load() {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
  const query = `{
    repository(name: "teste-node", owner: "LucasMauricio1") {
      name
      description
      primaryLanguage {
        name
      }
      stargazerCount
      createdAt
    }
  }`

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Erro ao carregar dados do GitHub:', error)
  }
}

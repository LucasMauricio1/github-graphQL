export function formatDateToBr(dataString: string): string {
  const data = new Date(dataString)

  if (isNaN(data.getTime())) {
    throw new Error('Data inválida')
  }

  const dia = String(data.getDate()).padStart(2, '0')
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const ano = data.getFullYear()
  return `${dia}/${mes}/${ano}`
}

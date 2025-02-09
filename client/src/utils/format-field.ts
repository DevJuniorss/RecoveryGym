export const formatField = (text?: string | null) => {
  if (text && text !== '') return text

  return 'Não informado'
}

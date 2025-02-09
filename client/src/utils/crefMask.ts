import { ChangeEvent } from 'react'

export function crefMask(e: ChangeEvent<HTMLInputElement>) {
  let value = e.target.value

  // Remove todos os caracteres que não sejam dígitos ou letras
  value = value.replace(/[^\dA-Za-z]/g, '')

  // Limita o tamanho do valor a 12 caracteres (6 dígitos + 1 letra + 2 letras para UF + separadores)
  value = value.slice(0, 9) // Máximo: 123456GUF

  // Adiciona os separadores conforme o tamanho do valor
  if (value.length > 7) {
    value = value.replace(/(\d{6})([A-Za-z]{1})([A-Za-z]{1,2})/, '$1-$2/$3')
  } else if (value.length > 6) {
    value = value.replace(/(\d{6})([A-Za-z]{1})/, '$1-$2')
  }

  e.target.value = value

  return e
}

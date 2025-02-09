import { ChangeEvent } from 'react'

export function cpfMask(e: ChangeEvent<HTMLInputElement>) {
  let value = e.target.value

  // Remove todos os caracteres que não sejam dígitos
  value = value.replace(/\D/g, '')

  // Limita o tamanho do valor a 11 dígitos
  value = value.slice(0, 11)

  // Adiciona os pontos e o traço conforme o tamanho do valor
  if (value.length > 9) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4')
  } else if (value.length > 6) {
    value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3')
  } else if (value.length > 3) {
    value = value.replace(/(\d{3})(\d+)/, '$1.$2')
  }

  e.target.value = value

  return e
}

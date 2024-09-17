export const splitLongString = (str: string, maxLength: number): string[] => {
  const result = []
  let currentIndex = 0

  // Mientras no se haya recorrido toda la cadena
  while (currentIndex < str.length) {
    // Se calcula el índice de la siguiente subcadena
    let nextIndex = currentIndex + maxLength
    // Si no se ha llegado al final de la cadena
    if (nextIndex < str.length) {
      // Se busca el último punto antes de la longitud máxima
      const periodIndex = str.lastIndexOf('.', nextIndex)
      // Si se encontró un punto antes de la longitud máxima
      if (periodIndex > currentIndex) {
        // Se ajusta el índice de la siguiente subcadena
        nextIndex = periodIndex + 1
      }
    }
    // Se agrega la subcadena al resultado
    result.push(str.slice(currentIndex, nextIndex).trim())
    // Se actualiza el índice actual
    currentIndex = nextIndex
  }

  return result
}

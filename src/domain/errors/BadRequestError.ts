export class BadRequestError extends Error {
  constructor() {
    super('Erro! Verifique se os dados enviados estão corretos e tente novamente mais tarde.')
    this.name = 'BadRequestError'
  }
}

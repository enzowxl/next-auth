export class IncorrectUser extends Error {
  constructor() {
    super('Email/password incorrect')
  }
}

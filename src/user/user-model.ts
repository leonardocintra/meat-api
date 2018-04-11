const users = [
  {
    name: 'Leonardo Cintra',
    email: 'leonardo.ncintra@outlook.com'
  },
  {
    name: 'Juliana Cintra',
    email: 'juliana.ncintra@outlook.com'
  },
  {
    name: 'Sara Cintra',
    email: 'sara.ncintra@outlook.com'
  },
  {
    name: 'Daniel Cintra',
    email: 'daniel.ncintra@outlook.com'
  },
]

export class User {
  static findAll(): Promise<any[]> {
    return Promise.resolve(users)
  }
}
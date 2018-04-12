export const environment = {
  server: {
    port: process.env.SERVER_PORT || 3000
  },
  db: {
    url: process.env.DB_URL || 'mongodb://github:github@meat0-shard-00-00-prsen.mongodb.net:27017,meat0-shard-00-01-prsen.mongodb.net:27017,meat0-shard-00-02-prsen.mongodb.net:27017/test?ssl=true&replicaSet=meat0-shard-0&authSource=admin'
  }
}
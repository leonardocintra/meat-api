export const environment = {
  server: {
    port: process.env.SERVER_PORT || 3000
  },
  db: {
    url: process.env.DB_URL || 'mongodb://github:github@ds014368.mlab.com:14368/meatdb'
  },
  security: {
    saltRounds: process.env.SALT_ROUNDS || 10
  }
}
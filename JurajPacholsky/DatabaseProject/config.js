const env = process.env;

const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || 'freedb.tech',
    user: env.DB_USER || 'freedbtech_juuuuuurrrrkkkkooooo',
    password: env.DB_PASSWORD || 'deamOOnko10',
    database: env.DB_NAME || 'freedbtech_jjjjjjjjjjjuuuuurrrrrkkkooooo',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;
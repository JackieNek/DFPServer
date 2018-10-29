const dbUser = 'nguyenductai';
const dbPassword = 'nguyenductai1234';
const dbName = 'dfp-database'

module.exports = {
  PORT: 8000,
  URL: `mongodb://${dbUser}:${dbPassword}@ds145043.mlab.com:45043/${dbName}`,
  DB_NAME: dbName
};
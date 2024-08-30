
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres'
    }
  );
}

module.exports = sequelize;


// Trying to get Render to work
// const Sequelize = require("sequelize");
// require('dotenv').config();

// const {
//   DB_USER,
//   DB_PASSWORD,
//   DB_HOST,
//   DB_NAME,
//   NODE_ENV = "production"
// } = process.env;

// let db = 
// NODE_ENV === "production"
//   ? new Sequelize({
//       datbase: DB_NAME,
//       dialect: "postgres",
//       host: DB_HOST,
//       port: 3001,
//       username: DB_USER,
//       password: DB_PASSWORD,
//       pool: {
//         max: 3,
//         min: 1,
//         idle: 10000
//       },
//       dialectOptions: {
//         ssl: {
//           require: true,
//           rejectUnauthorized: false
//         }
//       },
//   })
//   : new Sequelize(
//     `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
//       logging: false, native: false
//     }
//   )

// module.exports = sequelize;

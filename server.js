// const express = require('express');
// const session = require('express-session');
// const routes = require('./controller');
// const exphbs = require('express-handlebars');
// const hbs = exphbs.create({});
// const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const nodemailer = require('nodemailer');

// const app = express();
// const PORT = process.env.PORT || 3001;

// const sess = {
//   secret: 'Super secret secret',
//   cookie: {
//     maxAge: 60 * 60 * 1000,
//     httpOnly: true,
//     secure: false,
//     sameSite: 'strict',
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(session(sess));

// app.use(routes);

// async function main (){

//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false, // use false for STARTTLS; true for SSL on port 465
//     auth: {
//       user: process.env.GMAIL_USER,
//       pass: process.env.GMAIL_PASS,
//     }
//   });
//   const info = await transporter.sendMail({
//     from: process.env.GMAIL_USER,
//     to: 'reviewergeneric90@gmail.com',
//     subject: 'Signup successful!',
//     text: 'Thanks for signiing up for Reel Insights, the best place to post your worst movie opinions!'
//   })
//   console.log("message sent:" + info.messageId)
// }

// main().catch(error => console.log(error))
// // Keep this sync setting set to false and just use the seed file to update the database
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });

// -----------------------

const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { sequelize } = require("./models");
const homeRoutes = require("./controllers/homeRoutes");
const apiRoutes = require("./controllers/apiRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/api", apiRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

const sequelize = require('../config/connection');
const { Users, Likes, Reviews } = require("../models");
const { userdata, likedata, reviewdata } = require("./seeds");


const seedDatabase = async () => {
  try {
    // Sync database and clear existing data
    await sequelize.sync({ force: true });

    // Seed Users
    const seededUsers = await Users.bulkCreate(userdata, {
      individualHooks: true,
      returning: true
    });
    console.log(`${seededUsers.length} users have been created.`);

    // Seed Likes
    const seededLikes = await Likes.bulkCreate(likedata, {
      returning: true
    });
    console.log(`${seededLikes.length} likes have been created.`);

    // Seed Reviews
    const seededReviews = await Reviews.bulkCreate(reviewdata, {
      individualHooks: true,
      returning: true
    });
    console.log(`${seededReviews.length} reviews have been created.`);

    console.log("Seeding complete!");
  } catch (err) {
    console.error(`Seeding failed: ${err.message}`);
  } finally {
    process.exit(0);
  }
};


//   await sequelize.sync({ force: true });

//   let seededUsers = []
//   try {
//     seededUsers = await User.bulkCreate(userdata, {
//       individualHooks: true,
//       returning: true
//     })
//   } catch(err) {
//     console.log(`Seeding failed: ${err.message}`)
//   }

//   console.log(`${seededUsers.length} users have been created.`)

//   /* ===== any more seed operations go here ==================== */

//   let seededMovies = []
//   try {
//     seededMovies = await Movie.bulkCreate(moviedata, {
//       individualHooks: true,
//       returning: true
//     })
//   } catch(err) {
//     console.log(`Seeding failed: ${err.message}`)
//   }

//   console.log(`${seededMovies.length} users have been created.`)

//   console.log("Seeding complete!")
//   process.exit(0);
// }

seedDatabase();
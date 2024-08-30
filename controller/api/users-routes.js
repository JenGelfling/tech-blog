const router = require('express').Router();
const { Users } = require('../../models');


// router.get("api/users", async (req, res) => {
//     try {
//       const userData = await Users.findAll({})
//       res.json({ status: "success", payload: userData })
//       console.log(userData)
//     } catch(err){
//       console.log(userData)
//       res.status(500).json({ status: "error", payload: err.message })
//     }
//   })

//Create a new user
  // router.post('/users', async (req, res) => {
  //   try {
  //     const userData = await Users.create(req.body);
  
  //     req.session.save(() => {
  //       req.session.user_id = userData.id;
  //       req.session.logged_in = true;
  
  //       res.status(200).json(userData);
  //     });
  //   } catch (err) {
  //     res.status(400).json(err);
  //   }
  // });




// CREATE new user
// router.post('/', async (req, res) => {
//   try {
//     const dbUserData = await User.create({ //user.create is because I don't have user obj info yet
//       fname: req.body.fname,
//       lname: req.body.lname,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     req.session.save(() => {
//       req.session.logged_in = true;

//       res.status(200).json(dbUserData);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   try {
//     const dbUserData = await User.findOne({
//       where: {
//         email: req.body.email,
//       },
//     });

//     if (!dbUserData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password. Please try again!' });
//       return;
//     }

//     const validPassword = await dbUserData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password. Please try again!' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.logged_in = true;
//       console.log(
//         'File: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
//         req.session.cookie
//       );

//       res
//         .status(200)
//         .json({ user: dbUserData, message: 'You are now logged in!' });
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // Logout
// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;
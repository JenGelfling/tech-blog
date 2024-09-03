const router = require("express").Router();

const apiRoutes = require("./apiRoutes.js");
const homeRoutes = require("./home-routes.js");
const { User, Post, Comment } = require("../models");

router.use("/api", apiRoutes);

//Login route

//Todo: this is brekaing the login
// router.post("/api/login", async(req, res) => {
//   console.log("body", req.body)
//     console.log("HERE DAMNIT")
//     try {
//       const userData = await Users.findOne({ where: { email: req.body.email } });

//       if (!userData) {
//         res
//           .status(400)
//           .json({ message: 'Incorrect email or password, please try again' });
//         return;
//       }

//       const validPassword = await userData.checkPassword(req.body.password);

//       if (!validPassword) {
//         res
//           .status(400)
//           .json({ message: 'Incorrect email or password, please try again' });
//         return;
//       }

//       req.session.save(() => {
//         req.session.user_id = userData.id;
//         req.session.logged_in = true;

//         res.json({ user: userData, message: 'You are now logged in!' });
//       });

//     } catch (err) {
//       res.status(400).json(err);
//     }

//       res.json({ status: "ok" })
// })

router.post("/api/users", async (req, res) => {
  console.log("body", req.body); //This is printing as an empty array
  try {
    const userData = await Users.create(req.body);
    console.log(userData);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

  // console.log("HERE DAMMIT")

  // res.json({ status: "ok" })
});

router.post("/api/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//REVIEWS

router.get("/api/reviews", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const reviewData = await Reviews.findAll({
      include: [
        {
          model: Reviews,
          attributes: ["title"],
        },
      ],
    });

    // Serialize data so the template can read it
    const reviews = reviewData.map((review) => review.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("post-page", {
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/api/review/:id", async (req, res) => {
  try {
    const reviewData = await Reviews.findByPk(req.params.id, {
      include: [
        {
          model: Reviews,
          attributes: ["title"],
        },
      ],
    });

    const review = reviewData.get({ plain: true });

    res.render("reviews", {
      ...review,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/api/reviews", async (req, res) => {
  console.log("POST review");
  console.log(req.body);
  try {
    const dbReviewData = await Reviews.create(req.body);
    res.json({ status: "success", payload: dbReviewData });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
});

router.delete("/api/reviews/:id", async (req, res) => {
  try {
    const reviewData = await Reviews.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: "No review found with this id!" });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Likes routes

router.post("/api/likes", async (req, res) => {
  try {
    const dbLikesData = await Likes.create(req.body);
    res.json({ status: "success", payload: dbLikesData });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
});

//removing that like
router.delete("/api/likes/:id", async (req, res) => {
  try {
    const dbLikesData = await Likes.destroy({ where: { id: req.params.id } });
    res.json({ status: "success", payload: dbLikesData });
  } catch (err) {
    res.status(500).json({ status: "error", payload: err.message });
  }
});

router.use("/", homeRoutes);

module.exports = router;

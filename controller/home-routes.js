
  const router = require('express').Router();

  const { Likes, Reviews, Users } = require('../models');
  
  
  // Added some things here to be able to test stuff:
  // Route to render the search results page
  require('dotenv').config();
  
  const apiKey = process.env.apiKey
  
  // router.get('/search-results', (req, res) => {
  //   res.render('/search-results');
  // });
  
  // Route to fetch movie data
  router.get('/movie', async (req, res) => {
      const { title } = req.query;
  
    if (!title) {
      return res.status(400).json({ error: 'Title parameter is required' });
    }
  
    const url = `https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.Response === 'False') {
        return res.status(404).json({ error: data.Error });
      }
      console.log(data);
      res.json(data);
    } catch (error) {
      console.error('Fetch Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Route to fetch like data
  router.get("/api/likes", async (req, res) => {
    try {
      const likeData = await Likes.findAll({})
      res.json({ status: "success", payload: likeData })
      console.log(likeData)
    } catch(err){
      res.status(500).json({ status: "error", payload: err.message })
    }
  });
  
  // Route to fetch review data
  router.get("/api/reviews", async (req, res) => {
    try {
      const reviewData = await Reviews.findAll({
        include: Users,
        as: 'author'
      })
      console.log(reviewData)
      res.json({ status: "success", payload: reviewData })
  
    } catch(err){
      res.status(500).json({ status: "error", payload: err.message })
    }
  })
  
  // Route to post new review data
  router.post("/api/reviews", async (req, res) => {
    console.log(req.session);
    try {
      const reviewData = await Reviews.create({...req.body, author_id: req.session.user_id || 1})
      res.json({ status: "success", payload: reviewData })
      console.log(reviewData)
    } catch(err){
      res.status(500).json({ status: "error", payload: err.message })
    }
  })
  
  router.get("/api/users", async (req, res) => {
    try {
      const userData = await Users.findAll({})
      res.json({ status: "success", payload: userData })
      console.log(userData)
    } catch(err){
      res.status(500).json({ status: "error", payload: err.message })
    }
  }) 
  
  // ------------------- end of added testing stuff. Maybe move the above to other files if it works out.
  
  router.get('/', async (req, res) => {
      try {
        const dbReviewData = await Reviews.findAll({ include: Users });
        const reviews = dbReviewData.map((review) =>
          review.get({ plain: true })
        );
        const userData = await Reviews.findAll({ include: Users });
        const users = userData.map((user) =>
          user.get({ plain: true })
        );
        console.log(reviews)
        res.render('homepage', {reviews, users, logged_in: req.session.logged_in});
        // console.log(req.session.logged_in)
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });
  
  
    router.get('/reviews/:id', async (req, res) => {
      try {
        const dbReviewData = await Reviews.findByPk(req.params.id, {
          include: [{model: Reviews,
              attributes: [
                'id',
                'title',
                'author_id',
                'like_id',
                'is_public',
              ],
            },
          ],
        });
   
        const review = dbReviewData.get({ plain: true });
        res.render('reviews', { review });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });
  
    router.get('/', async (req, res) => {
      try {
        const dbLikesData = await Likes.findAll({});
        const likes = dbLikesData.map((like) =>
          like.get({ plain: true })
        );
        console.log(likes)
        res.render('homepage', {reviews});
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });
  
    // router.get('/profile', (req, res) => {
    //   if (req.session.logged_in) {
    //     res.redirect('/profile');
    //     return;
    //   }
    //   res.render('profile');
    // });
  
  const bcrypt = require('bcrypt');
  
  router.post('/login', async (req, res) => {
    console.log("POST login");
  
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
  
    try {
      // Find user by email
      const user = await Users.findOne({ where: { email } });
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }
  
      // Compare provided password with hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (isPasswordValid) {
        // Set session variables
        req.session.logged_in = true;
        req.session.user = {
          id: user.id,
          email: user.email
        };
  
        // Respond with success
        return res.status(200).json({
          success: true,
          message: 'Login successful'
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  });
  
    // router.post('/login', async (req, res) => {
    //   console.log("post login")
    //   console.log(req.session.logged_in)
    //   if (req.session.logged_in) {
    //     console.log("posting")
    //     res.status().json("200", {logged_in})
    //       res.redirect('/');
    //       return;
    //   } else {
    //     res.render('login');
    //   }
    // });
  
    router.get('/login', (req, res) => {
      console.log("HERE!")
      const sessionData = req.session;
      console.log(req.session)
      if (req.session.logged_in) {
        console.log("why am I")
        res.render("homepage", {logged_in: true })
          // res.redirect('/');
          return sessionData;
      } else {
        console.log(sessionData)
        res.render('login');
      } console.log(sessionData);
    });
  
    router.get('/search-results', (req, res) => {
      console.log("HERE!!!")
      console.log(req.session.logged_in)
      if (req.session.logged_in) {
        console.log("you get to search!")
        res.render("search-results", {
          logged_in: req.session.logged_in
        })
          // res.redirect('/');
          // return;
      } else {
        res.render('login');
      }
    });
  
    // router.get('/movie-page', (req, res) => {
    //   console.log("HERE!!!")
    //   console.log(req.session)
    //   if (req.session.logged_in) {
    //     console.log("why am I here")
    //     res.render("homepage")
    //       // res.redirect('/');
    //       // return;
    //   } else {
    //     res.render('movie-page');
    //   }
    // });
  
  
    // router.get('/post-page', (req, res) => {
    //   console.log("HERE!!!")
    //   console.log(req.session)
    //   if (req.session.logged_in) {
    //     console.log("why am I here")
    //     res.render("homepage")
    //       res.redirect('/');
    //       return;
    //   } else {
    //     res.render('post-page');
    //   }
    // });

    router.get('/post-page', (req, res) => {
      console.log("HERE!!!")
      console.log(req.session)
      if (req.session.logged_in) {
        console.log("why am I here")
        res.render("post-page", {
          logged_in: req.session.logged_in
        })
          
          return;
      } else {
        res.render('login');
      }
    });
  
  
    module.exports = router;
  
const { Reviews } = require('../../models');
const router = require('express').Router();


router.get('/review', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const reviewData = await Reviews.findAll({
        include: [
          {
            model: Reviews,
            attributes: ['name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const reviews = reviewData.map((review) => review.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('profile', { 
        reviews, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get('/review/:id', async (req, res) => {
    try {
      const reviewData = await Reviews.findByPk(req.params.id, {
        include: [
          {
            model: Reviews,
            attributes: ['name'],
          },
        ],
      });
  
      const review = reviewData.get({ plain: true });
  
      res.render('reviews', {
        ...review,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }); 



  // router.post("/reviews", async (req, res) => {
  //   try {
  //     const dbReviewData = await Reviews.create(req.body)
  //     res.json({ status: "success", payload: dbReviewData })
  //   } catch(err){
  //     res.status(500).json({ status: "error", payload: err.message })
  //   }
  // })


  router.delete('reviews/:id', async (req, res) => {
    try {
      const reviewData = await Reviews.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!reviewData) {
        res.status(404).json({ message: 'No review found with this id!' });
        return;
      }
  
      res.status(200).json(reviewData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
const { Likes } = require('../../models');
const router = require('express').Router();






//liking a review
router.post("/", async (req, res) => {
    try {
      const dbLikesData = await Likes.create(req.body)
      res.json({ status: "success", payload: dbLikesData })
    } catch(err){
      res.status(500).json({ status: "error", payload: err.message })
    }
  })


//removing that like
  router.delete("/:id", async (req, res) => {
    try {
      const dbLikesData = await Likes.destroy({ where: { id: req.params.id } })
      res.json({ status: "success", payload: dbLikesData })
    } catch(err){
      res.status(500).json({ status: "error", payload: err.message })
    }
  })

module.exports = router;
